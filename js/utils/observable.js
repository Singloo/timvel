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
} from 'rxjs/operators';
import { get } from 'lodash';
let INTERVAL = 4000;
export const queryNew = range(1, 20).pipe(
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

export const minuteReward = interval(1000).pipe(
  tap(x => console.warn(x)),
  bufferTime(60 * 1000),
);
// interval(1000).subscribe(queryNew);
