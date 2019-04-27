import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { I18n } from '../../utils';
const snakeBar = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofType('SHOW_SNAKE_BAR'),
    // tap(action => {
    //   console.warn(action);
    // }),
    concatMap(({ payload }) =>
      Observable.create(observer => {
        let {
          type = 'NORMAL',
          content,
          duration = 2000,
          immediate = false,
          onPress = null,
        } = payload;
        if (type === 'ERROR') content = content || I18n.t('networkError');
        observer.next(
          dispatch('SNAKE_BAR_SET_STATE', {
            ...payload,
          }),
        );
        setTimeout(() => {
          observer.next(dispatch('SNAKE_BAR_RESET_STATE'));
          observer.complete();
        }, duration + 300);
      }),
    ),
  );

export default [snakeBar];
