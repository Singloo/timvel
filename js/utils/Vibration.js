/*
 * File: /Users/origami/Desktop/timvel/js/utils/Vibration.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday March 23rd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday March 24th 2019 11:21:24 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { Vibration } from 'react-native';
import { isIOS } from './base';
const PATTERN = [0, 80];
export const vibrate = num => {
  if (isIOS) {
    return;
  }
  Vibration.vibrate(num || PATTERN);
};
