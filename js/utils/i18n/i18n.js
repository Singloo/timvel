import I18n from 'react-native-i18n';
import zh from './locales/zh';
import en from './locales/en';
I18n.fallbacks = true;
I18n.translations = {
  zh,
  en,
};
export default I18n;
