import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import { localStorageKeys } from '@/constants/localStorageKeys';
import { languages, defaultLanguage } from './languages';

let savedLanguage = localStorage.getItem(localStorageKeys.language);

const supportedLngs = languages.map(lang => lang.value);

if (savedLanguage && !supportedLngs.includes(savedLanguage)) {
  localStorage.removeItem(localStorageKeys.language);
  savedLanguage = defaultLanguage;
}

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: savedLanguage || defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs,
    ns: [],
    defaultNS: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

export default i18n;
