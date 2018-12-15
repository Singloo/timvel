import { from, throwError, of } from 'rxjs';
import { map, retryWhen, concatMap, delay } from 'rxjs/operators';

const retryDelay = (promise, { delayTime = 100, times = 3 }) =>
  from(promise).pipe(retryWhenDelay(delayTime, times));

const retryWhenDelay = (delayTime = 100, times = 3) =>
  retryWhen(err =>
    err.pipe(
      delay(delayTime),
      concatMap((error, index) =>
        index < times ? of(null) : throwError(error),
      ),
    ),
  );

export { retryDelay, retryWhenDelay };
