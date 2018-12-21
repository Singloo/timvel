import { from, throwError, of } from 'rxjs';
import { retryWhen, concatMap, delay } from 'rxjs/operators';
const EMPTY_FUNC = () => {};
const retryDelay = (promise, { delayTime = 1000, times = 3 } = {}) =>
  from(promise).pipe(retryWhenDelay(delayTime, times));

const retryWhenDelay = (delayTime = 1000, times = 3) =>
  retryWhen(err =>
    err.pipe(
      delay(delayTime),
      concatMap((error, index) =>
        index < times ? of(null) : throwError(error),
      ),
    ),
  );
const HANDLE = (next = EMPTY_FUNC, error = EMPTY_FUNC) => ({
  next,
  error,
});
export { retryDelay, retryWhenDelay, HANDLE };
