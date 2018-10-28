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
} from 'rxjs/operators';
const snakeBar = (action$, state$, { logic }) =>
  action$.pipe(
    ofType('SHOW_SNAKE_BAR'),
    switchMap(({ payload }) =>
      Observable.create(observer => {
        const { queue } = state$.value.snakeBar;
        const {
          type = 'NORMAL',
          content,
          duration = 3000,
          immediate = false,
          onPress = null,
        } = payload;
        //type:'NORMAL' 'ERROR' 'SUCCESS'
        let fixedQueue = queue.concat([
          {
            type,
            content,
            duration,
            onPress,
          },
        ]);
        if (immediate) {
          fixedQueue = [
            {
              type,
              content,
              duration,
              onPress,
            },
          ].concat(queue);
        }
        observer.next(
          logic('SNAKE_BAR_SET_STATE', {
            queue: fixedQueue,
          }),
        );
        observer.complete();
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
