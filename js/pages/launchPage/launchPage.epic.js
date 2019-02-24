import {} from 'rxjs';
import { map, delay, startWith } from 'rxjs/operators';
import { ofType } from 'redux-observable';
const WAIT_TIME = 300 * 1.5;
const initApp = (action$, _, { navigation, dispatch }) =>
  action$.pipe(
    ofType('INIT_APP'),
    delay(WAIT_TIME),
    map(_ => {
      navigation.reset('Main');
      return dispatch(null);
    }),
    startWith({
      type: 'UPDATE_USERINFO',
      payload: {},
    }),
  );

export default [initApp];
