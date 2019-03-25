import { ofType } from 'redux-observable';
import { $retryDelay, $catchError, ApiNotifications } from '../../utils';
import { from } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { get } from 'lodash';
const readNotification = (action$, state$, { httpClient, User, dispatch }) =>
  action$.pipe(
    ofType('NOTIFI_PAGE_READ_NOTIFICATION'),
    switchMap(action => {
      const { notificationId } = action.payload;
      return from(
        httpClient.post('/read_notification', {
          notification_id: notificationId,
        }),
      ).pipe(
        map(() => dispatch(null)),
        $retryDelay(100),
        $catchError(dispatch(null)),
      );
    }),
  );

const fetchComments = (action$, state$, { httpClient, User, dispatch }) =>
  action$.pipe(
    ofType('NOTIFI_PAGE_FETCH_COMMENTS'),
    switchMap(_ => {
      return from(ApiNotifications.getNotification(User.id, 'comment')).pipe(
        map(({ data }) =>
          dispatch('NOTIF_PAGE_SET_STATE', {
            comments: get(data, 'data', []),
          }),
        ),
      );
    }),
    $retryDelay(100),
    $catchError(dispatch(null)),
  );
export default [readNotification, fetchComments];
