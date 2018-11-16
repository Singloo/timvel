import { ofType } from 'redux-observable';
import { Observable, timer, interval, from, of } from 'rxjs';
import {
  delayWhen,
  mergeMap,
  delay,
  map,
  mapTo,
  bufferWhen,
  switchMap,
  tap,
  concatMap,
} from 'rxjs/operators';
const snakeBar = (action$, state$, { logic }) =>
  action$.pipe(
    ofType('SHOW_SNAKE_BAR'),
    tap(action => {
      console.warn(action);
    }),
    concatMap(({ payload }) =>
      Observable.create(observer => {
        const {
          type = 'NORMAL',
          content,
          duration = 2000,
          immediate = false,
          onPress = null,
        } = payload;
        observer.next(
          logic('SNAKE_BAR_SET_STATE', {
            ...payload,
          }),
        );
        setTimeout(() => {
          observer.next(logic('SNAKE_BAR_RESET_STATE'));
          observer.complete();
        }, duration + 300);
      }),
    ),
  );

export default [snakeBar];
