/*
 * File: /Users/origami/Desktop/timvel/js/utils/NetInfo.tsx
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Tuesday April 2nd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday April 2nd 2019 9:26:57 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { NetInfo } from 'react-native';
export const isWifi = async () => {
  const connectionInfo = await NetInfo.getConnectionInfo();
  return connectionInfo.type === 'wifi';
};
