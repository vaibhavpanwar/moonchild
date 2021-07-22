import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ar from './ar.json';
const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    keySeparator: false,
    resources,
    // react: {
    //   useSuspense: false, //   <---- this will do the magic
    // },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
