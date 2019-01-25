import { from, throwError, of } from 'rxjs';
import { retryWhen, concatMap, delay, catchError } from 'rxjs/operators';
const EMPTY_FUNC = () => {};
const retryDelay = (promise, { delayTime = 1000, times = 3 } = {}) =>
  from(promise).pipe($retryWhenDelay(delayTime, times));

const $retryWhenDelay = (delayTime = 1000, times = 3) =>
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

const $catchError = (...handers) =>
  catchError(err => {
    console.warn(err.message);
    return of(...handers);
  });
export { retryDelay, $retryWhenDelay, HANDLE, $catchError };
