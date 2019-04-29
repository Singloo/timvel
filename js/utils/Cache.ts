/*
 * File: /Users/origami/Desktop/timvel/js/utils/Cache.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday March 24th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday April 28th 2019 6:51:13 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import AsyncStorage from '@react-native-community/async-storage';
type TCacheType = 'array' | 'object' | 'float' | 'number' | 'string';
interface ICacheKey {
  key: string;
  type: TCacheType;
}
const CACHE_KEYS: { [key: string]: ICacheKey } = {
  HOME_PAGE_FEEDS: {
    key: 'homePageFeeds',
    type: 'array',
  },
  HOME_PAGE_POPULAR: {
    key: 'homePagePopular',
    type: 'array',
  },
  PRODUCTS: {
    key: 'products',
    type: 'array',
  },
  NOTIFICATION_COMMENT: {
    key: 'notificationComment',
    type: 'array',
  },
  USER_USED_TAGS: {
    key: 'userUsedTags',
    type: 'array',
  },
};
const generateCommonKeys = (keyName: string, type: TCacheType = 'array') => (
  id: any,
): ICacheKey => ({
  key: `${keyName}${id}`,
  type,
});
const USER_POSTS_CACHE_KEYS = generateCommonKeys('userPosts');
const POSTS_BY_TAG_KEYS = generateCommonKeys('postsByTag', 'array');
const VERSION_CHECK_KEYS = generateCommonKeys('appVersion', 'string');
const _switchCacheResult = (result: null | string, key: ICacheKey) => {
  if (result === null) {
    return result;
  }
  if (key.type === 'array' || key.type === 'object') {
    return JSON.parse(result);
  }
  if (key.type === 'number') {
    return parseInt(result);
  }
  if (key.type === 'float') {
    return parseFloat(result);
  }
  return result;
};
function set(key: ICacheKey, value: any): Promise<any>;
function set(key: ICacheKey, value: any, noReturn: boolean): void;
function set(key: ICacheKey, value: any, noReturn?: boolean) {
  if (!value) {
    throw new Error('value cannot be empty');
  }
  if (key.type === 'object' || key.type === 'array') {
    value = JSON.stringify(value);
  }
  if (key.type === 'number' || key.type === 'float') {
    value = value.toString();
  }
  if (noReturn === true) {
    AsyncStorage.setItem(key.key, value)
      .then(() => {})
      .catch(() => {});
  }
  return AsyncStorage.setItem(key.key, value);
}

const get = async (key: ICacheKey) => {
  const result = await AsyncStorage.getItem(key.key);
  return _switchCacheResult(result, key);
};

const clearCache = async () => {
  const keys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(keys);
};

export default {
  set,
  get,
  clearCache,
  CACHE_KEYS,
  USER_POSTS_CACHE_KEYS,
  POSTS_BY_TAG_KEYS,
  VERSION_CHECK_KEYS,
};
