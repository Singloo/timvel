import { interval, from, Subject, timer, range } from 'rxjs';
import { switchMap, map, concatMap, bufferCount } from 'rxjs/operators';
import { get } from 'lodash';
import { IAction } from '../models';
import { Image } from 'react-native-image-crop-picker';
let INTERVAL = 4000;
const $queryNew = range(1, 20).pipe(
  concatMap(_ => timer(INTERVAL)),
  switchMap(_ => from([{ data: [] }])),
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
const $all: { [key: string]: Subject<any> } = {
  coinTransaction: $coinTransaction,
};
const $CENTER = new Subject<IAction>();

const $TYPES = {
  coinTransaction: 'coinTransaction',
  userMount: 'userMount',
  userUnmount: 'userUnmount',
};
$CENTER.subscribe({
  next: ({ type, payload }) => {
    const $next = $all[type];
    if (!$next) {
      return;
    }
    $next.next(payload);
  },
});

const showCoinIncreaseAnimation = (transaction: number) =>
  $CENTER.next({
    type: $TYPES.coinTransaction,
    payload: {
      transaction,
    },
  });

const $UPLOAD_IMAGES: Subject<Image> = new Subject();
export {
  $queryNew,
  $CENTER,
  $coinTransaction,
  $sourceOneMinue,
  $sourceSecond,
  $sourceTenSeconds,
  $TYPES,
  showCoinIncreaseAnimation,
  $UPLOAD_IMAGES,
};
