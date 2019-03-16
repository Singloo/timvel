/*
 * File: /Users/origami/Desktop/timvel/js/services/CoinTransactionRecords.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday March 16th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday March 16th 2019 4:33:12 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { Network, User, HANDLE, $retryDelay } from '../utils';
import { from } from 'rxjs';
import {} from 'rxjs/operators';

const insertNewTransactionRecord = ({ type, amount }) => {
  from(
    Network.apiClient.post('/transaction_records', {
      user_id: User.id(),
      type,
      amount,
    }),
  )
    .pipe($retryDelay())
    .subscribe(HANDLE());
};

export { insertNewTransactionRecord };
