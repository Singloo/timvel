/*
 * File: /Users/origami/Desktop/timvel/js/utils/Vibration.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday March 23rd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 23rd 2019 11:48:17 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { Vibration } from 'react-native';
import { isIOS } from './base';
const PATTERN = [0, 100, 50, 100, 50, 100];
export const vibrate = () => {
  if (isIOS) {
    return;
  }
  Vibration.vibrate(PATTERN);
};
