import { interval, from, Subject, timer, range } from 'rxjs';
import {
  bufferWhen,
  debounceTime,
  tap,
  switchMap,
  map,
  mergeMap,
  throttleTime,
  bufferTime,
  delay,
  take,
  concatMap,
  bufferCount,
} from 'rxjs/operators';
import { get } from 'lodash';
let INTERVAL = 4000;
const $queryNew = range(1, 20).pipe(
  concatMap(_ =>
    timer(INTERVAL).pipe(
      switchMap(_ =>
        from([1]).pipe(
          map(({ data }) => {
            if (get(data, 'length', 0) > 0) {
              INTERVAL = INTERVAL / 2;
              return data;
            } else {
              INTERVAL = INTERVAL * 2;
              return [];
            }
          }),
        ),
      ),
    ),
  ),
);

const $sourceSecond = interval(1000);
const $sourceTenSeconds = $sourceSecond.pipe(bufferCount(10));
const $sourceOneMinue = $sourceSecond.pipe(bufferCount(60));

const $coinTransaction = new Subject();

const $all = {
  coinTransaction: $coinTransaction,
};
const $CENTER = new Subject();

const $TYPES = {
  coinTransaction: 'coinTransaction',
  init:'init'
};
$CENTER.subscribe({
  // command = {
  //   type:one of $all keys,
  //   payload:{
  //     ...parameters
  //   }
  // }
  next: command => {
    if(command.type === $TYPES.init){
      // $all.coinTransaction.next({})
    }
    const $next = $all[command.type];
    if (!$next) {
      return;
    }
    $next.next(command.payload);
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
};
