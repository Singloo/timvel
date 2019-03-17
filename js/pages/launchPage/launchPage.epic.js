import {} from 'rxjs';
import { map, delay, startWith } from 'rxjs/operators';
import { ofType } from 'redux-observable';
const WAIT_TIME = __DEV__ ? 300 * 1.5 : 3000 * 1;
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
