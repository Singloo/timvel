import zh from './locales/zh';
import en from './locales/en';
import * as RNLocalize from 'react-native-localize';
import { get } from 'lodash';
const firstLocale = RNLocalize.getLocales()[0];
const languageCode = firstLocale
  ? get(firstLocale, 'languageCode', 'en')
  : 'en';

const sentenceSet = () => {
  switch (languageCode) {
    case 'zh':
      return zh;
    default:
      return en;
  }
};
const t = (key: string) => get(sentenceSet(), key, '');
const I18n = {
  t,
};
export default I18n;