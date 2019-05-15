import zh from './locales/zh';
import en from './locales/en';
import * as RNLocalize from 'react-native-localize';
import { get } from 'lodash';
const firstLocale = RNLocalize.getLocales()[0];
const languageCode =
  get(firstLocale, 'languageCode', 'en') === 'zh' ? 'zh' : 'en';

const sentenceSet = () => {
  switch (languageCode) {
    case 'zh':
      return zh;
    default:
      return en;
  }
};
const t = (key: string) => get(sentenceSet(), key, key);
const I18n = {
  t,
};
export default I18n;
