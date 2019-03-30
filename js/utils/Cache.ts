/*
 * File: /Users/origami/Desktop/timvel/js/utils/Cache.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday March 24th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 30th 2019 9:09:29 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import AsyncStorage from '@react-native-community/async-storage';
interface ICacheKey {
  key: string;
  type: 'array' | 'object' | 'float' | 'number' | 'string';
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
};
const USER_POSTS_CACHE_KEYS = (userId: string): ICacheKey => ({
  key: `userPosts${userId}`,
  type: 'array',
});
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
const set = (key: ICacheKey, value: any) => {
  if (!value) {
    throw new Error('value cannot be empty');
  }
  if (key.type === 'object' || key.type === 'array') {
    value = JSON.stringify(value);
  }
  if (key.type === 'number' || key.type === 'float') {
    value = value.toString();
  }
  return AsyncStorage.setItem(key.key, value);
};

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
};
