import { interval, from, Subject, timer, range } from 'rxjs';
import { switchMap, map, concatMap, bufferCount } from 'rxjs/operators';
import { get } from 'lodash';
import { $retryDelay, HANDLE } from './$helper';
// import coinTransaction from '../components/CoinTransactionAnimation';
let INTERVAL = 4000;
const $queryNew = range(1, 20).pipe(
  concatMap(_ => timer(INTERVAL)),
  switchMap(_ => from([1])),
  map(({ data }) => {
    if (get(data, 'length', 0) > 0) {
      INTERVAL = INTERVAL / 2;
      return data;
    } else {
      INTERVAL = INTERVAL * 2;
      return [];
    }
  }),
);

const $sourceSecond = interval(1000);
const $sourceTenSeconds = $sourceSecond.pipe(bufferCount(10));
const $sourceOneMinue = $sourceSecond.pipe(bufferCount(60));

//{transaction:number}
//show transaction animation
const $coinTransaction = new Subject();

const $all = {
  coinTransaction: $coinTransaction,
};
const $CENTER = new Subject();

const $TYPES = {
  coinTransaction: 'coinTransaction',
  userMount: 'userMount',
};
$CENTER.subscribe({
  // command = {
  //   type:',
  //   payload:{
  //     ...parameters
  //   }
  // }
  next: ({ type, payload }) => {
    const $next = $all[type];
    if (!$next) {
      return;
    }
    $next.next(payload);
  },
});

const dispatch = (type, payload = {}) => ({ type, payload });

const showCoinIncreaseAnimation = transaction =>
  $CENTER.next({
    type: $TYPES.coinTransaction,
    payload: {
      transaction,
    },
  });
export {
  $queryNew,
  $CENTER,
  $coinTransaction,
  $sourceOneMinue,
  $sourceSecond,
  $sourceTenSeconds,
  $TYPES,
  dispatch,
  HANDLE,
  showCoinIncreaseAnimation,
};
