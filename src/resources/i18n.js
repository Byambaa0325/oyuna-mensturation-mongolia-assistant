// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from '../locales/en/translation.json';
import mnTranslation from '../locales/mn/translation.json';

const resources = {
    en: { translation: enTranslation },
    mn: { translation: mnTranslation },
};
console.log("Locale: ", localStorage.getItem('locale') || 'mn')
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('locale') || 'mn',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
