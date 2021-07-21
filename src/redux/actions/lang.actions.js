/**
 * Created by rf1804
 *
 * @format
 */

import {langConstants} from '../constants';
import I18n from 'i18n-js';

export const setLanguage = (lang) => {
  I18n.locale = lang;
  I18n.currentLocale();
  localStorage.setItem('lang', lang);
  return {
    type: langConstants.APP_LANG,
    lang,
  };
};
