import { from, throwError, of, empty } from 'rxjs';
import {
  retryWhen,
  concatMap,
  delay,
  catchError,
  mapTo,
  switchMap,
  startWith,
} from 'rxjs/operators';
import { IAction } from '../models';
const EMPTY_FUNC = () => {};
const retry3 = (promise: Promise<any>, { delayTime = 500, times = 3 } = {}) =>
  from(promise).pipe($retryDelay(delayTime, times));

const $retryDelay = (delayTime = 500, times = 3) =>
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

const $catchError = (...values: any[]) =>
  catchError(err => {
    console.warn(err.message);
    return of(...values);
  });
export { retry3, $retryDelay, HANDLE, $catchError };
