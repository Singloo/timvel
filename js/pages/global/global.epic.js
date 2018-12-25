import { ofType } from 'redux-observable';
import {} from 'rxjs';
import { map } from 'rxjs/operators';
import { $CENTER, $TYPES } from '../../utils/$observable';

const coinTransaction = (action$, state$, { User, dispatch }) =>
  action$.pipe(
    ofType('COIN_TRANSACTION'),
    map(({ payload }) => {
      const { transaction } = payload;
      $CENTER.next({
        type: $TYPES.coinTransaction,
        payload: {
          transaction,
        },
      });
      User.increaseCoin(parseInt(transaction, 10));
      return dispatch(null);
    }),
  );

export default [coinTransaction];
