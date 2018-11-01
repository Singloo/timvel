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
        const { queue } = state$.value.snakeBar;
        const {
          type = 'NORMAL',
          content,
          duration = 2000,
          immediate = false,
          onPress = null,
        } = payload;
        // console.warn(content, duration);
        observer.next(
          logic('SNAKE_BAR_SET_STATE', {
            ...payload,
          }),
        );
        setTimeout(() => {
          observer.next(logic('SNAKE_BAR_RESET_STATE'));
          observer.complete();
        }, duration + 300);
        //type:'NORMAL' 'ERROR' 'SUCCESS'
        // let fixedQueue = queue.concat([
        //   {
        //     type,
        //     content,
        //     duration,
        //     onPress,
        //   },
        // ]);
        // if (immediate) {
        //   fixedQueue = [
        //     {
        //       type,
        //       content,
        //       duration,
        //       onPress,
        //     },
        //   ].concat(queue);
        // }
        // observer.next(
        //   logic('SNAKE_BAR_SET_STATE', {
        //     queue: fixedQueue,
        //   }),
        // );
        // observer.complete();
      }),
    ),
  );

// return logic('SNAKE_BAR_SET_STATE', {
//   // show: true,
//   snakeBarInfo: content,
//   snakeBarType: type || 'NORMAL',
//   snakeBarDuration: duration || 3000,
// });

// mergeMap(({ payload }) =>
//   Observable.create(observer => {
//     console.warn('receive');
//     const { content, type, duration } = payload;
//     //type:'NORMAL' 'ERROR' 'SUCCESS'
//     // const { show } = getState().snakebar;
//     observer.next(
//       logic('SNAKE_BAR_SET_STATE', {
//         // show: true,
//         snakeBarInfo: content,
//         snakeBarType: type || 'NORMAL',
//         snakeBarDuration: duration || 3000,
//       }),
//     );
//     observer.complete();
//   }),
// ),

export default [snakeBar];
