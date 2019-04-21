import { ofType } from 'redux-observable';
import {} from 'rxjs';
import { map } from 'rxjs/operators';
const showAlert = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofType('SHOW_ALERT'),
    map(action => {
      const { show } = state$.value.alert;

      if (show) {
        return dispatch(null);
      }
      const {
        choices,
        cancelTitle,
        type,
        onCancel,
        content,
        vertical = false,
      } = action.payload;
      return dispatch('ALERT_SET_STATE', {
        show: true,
        choices,
        cancelTitle,
        content,
        type: type || 'NORMAL',
        onCancel,
        vertical,
      });
    }),
  );

export default [showAlert];
