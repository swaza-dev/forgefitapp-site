/**
 * i18n System for ForgeFit Website
 * Handles language detection, routing, and translation loading
 */

const SUPPORTED_LANGUAGES = ['en', 'es', 'pt', 'de', 'fr', 'it', 'ja', 'ko', 'zh', 'ru', 'tr'];
const DEFAULT_LANGUAGE = 'en';

let currentLanguage = DEFAULT_LANGUAGE;
let translations = {};

/**
 * Get language from URL path
 * Examples: /en, /es, /pt, etc.
 */
function getLanguageFromPath() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(s => s);
  
  if (segments.length > 0 && SUPPORTED_LANGUAGES.includes(segments[0])) {
    return segments[0];
  }
  
  // Check browser language
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  if (SUPPORTED_LANGUAGES.includes(langCode)) {
    return langCode;
  }
  
  return DEFAULT_LANGUAGE;
}

/**
 * Load translation file
 */
async function loadTranslations(lang) {
  try {
    // Try with language prefix first, then fallback to root
    let response = await fetch(`/translations/${lang}.json`);
    if (!response.ok) {
      response = await fetch(`translations/${lang}.json`);
    }
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`[i18n] Failed to load ${lang}, falling back to English`);
    if (lang !== DEFAULT_LANGUAGE) {
      return await loadTranslations(DEFAULT_LANGUAGE);
    }
    throw error;
  }
}

/**
 * Initialize i18n system
 */
async function initI18n() {
  currentLanguage = getLanguageFromPath();
  
  // Update HTML lang attribute
  document.documentElement.lang = currentLanguage;
  
  // Load translations
  translations = await loadTranslations(currentLanguage);
  
  // Update page title and meta
  if (translations.meta) {
    document.title = translations.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && translations.meta.description) {
      metaDesc.content = translations.meta.description;
    }
  }
  
  // Apply translations to page
  applyTranslations();
  
  // Update all links to include language prefix
  updateLinks();
  
  console.log(`[i18n] Initialized with language: ${currentLanguage}`);
}

/**
 * Get translation by key path
 * Example: t('hero.title') -> translations.hero.title
 */
function t(key, defaultValue = '') {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return defaultValue || key;
    }
  }
  
  return typeof value === 'string' ? value : (defaultValue || key);
}

/**
 * Apply translations to elements with data-i18n attribute
 */
function applyTranslations() {
  // Find all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key);
    
    if (translation) {
      // Handle special attributes
      if (element.hasAttribute('data-i18n-html')) {
        element.innerHTML = translation;
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.value = translation;
      } else if (element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      } else if (element.hasAttribute('title')) {
        element.title = translation;
      } else if (element.hasAttribute('aria-label')) {
        element.setAttribute('aria-label', translation);
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // Handle elements with data-i18n-nl (newline support)
  const nlElements = document.querySelectorAll('[data-i18n-nl]');
  nlElements.forEach(element => {
    const key = element.getAttribute('data-i18n-nl');
    const translation = t(key);
    if (translation) {
      element.innerHTML = translation.replace(/\n/g, '<br>');
    }
  });
}

/**
 * Update all internal links to include language prefix
 */
function updateLinks() {
  const links = document.querySelectorAll('a[href^="#"], a[href^="/"]');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    
    // Skip external links and hash links
    if (href.startsWith('#') || href.startsWith('http')) {
      return;
    }
    
    // Skip if already has language prefix
    if (SUPPORTED_LANGUAGES.some(lang => href.startsWith(`/${lang}/`) || href === `/${lang}`)) {
      return;
    }
    
    // Special handling for privacy and terms
    if (href === '/privacy/' || href.startsWith('/privacy/')) {
      link.setAttribute('href', `/${currentLanguage}/privacy/`);
      return;
    }
    
    if (href === '/terms/' || href.startsWith('/terms/')) {
      link.setAttribute('href', `/${currentLanguage}/terms/`);
      return;
    }
    
    // Add language prefix for other internal links
    if (href.startsWith('/')) {
      link.setAttribute('href', `/${currentLanguage}${href}`);
    } else if (!href.startsWith('http')) {
      link.setAttribute('href', `/${currentLanguage}/${href}`);
    }
  });
}

/**
 * Change language and reload page
 */
function changeLanguage(lang) {
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.warn(`[i18n] Unsupported language: ${lang}`);
    return;
  }
  
  const currentPath = window.location.pathname;
  const segments = currentPath.split('/').filter(s => s);
  
  // Remove current language prefix if exists
  if (SUPPORTED_LANGUAGES.includes(segments[0])) {
    segments.shift();
  }
  
  // Build new path
  const newPath = segments.length > 0 
    ? `/${lang}/${segments.join('/')}`
    : `/${lang}`;
  
  // Update URL
  window.location.href = newPath + window.location.search + window.location.hash;
}

/**
 * Get current language
 */
function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Get language name for display
 */
function getLanguageName(code) {
  const names = {
    en: 'English',
    es: 'Español',
    pt: 'Português',
    de: 'Deutsch',
    fr: 'Français',
    it: 'Italiano',
    ja: '日本語',
    ko: '한국어',
    zh: '中文',
    ru: 'Русский',
    tr: 'Türkçe'
  };
  return names[code] || code;
}

// Export for use in other scripts
window.i18n = {
  init: initI18n,
  t: t,
  changeLanguage: changeLanguage,
  getCurrentLanguage: getCurrentLanguage,
  getLanguageName: getLanguageName,
  SUPPORTED_LANGUAGES: SUPPORTED_LANGUAGES
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
