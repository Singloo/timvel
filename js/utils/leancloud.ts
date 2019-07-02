/*
 * File: /Users/origami/Desktop/timvel/js/utils/leancloud.ts
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Tuesday July 2nd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday July 2nd 2019 10:15:25 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import AV from 'leancloud-storage';
import { LC_APP_ID, LC_APP_KEY } from '../constants';
AV.init({
  appId: LC_APP_ID,
  appKey: LC_APP_KEY,
});

export { AV };
