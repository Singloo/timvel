import { ofType } from 'redux-observable';
import { $retryDelay, $catchError } from '../../utils';
import { from } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

const sendNotification = (action$, state$, { httpClient, User, dispatch }) =>
  action$.pipe(
    ofType('NOTIFI_PAGE_SEND_NOTIFICATION'),
    switchMap(action => {
      const { content, type, relatedId, targetUserId } = action.payload;
      return from(
        httpClient.post('/add_notification', {
          content,
          type,
          related_id: relatedId,
          user_id: targetUserId,
          trigger_user_id: User.id(),
        }),
      ).pipe(
        map(() => dispatch(null)),
        $retryDelay(100),
        $catchError(dispatch(null)),
      );
    }),
  );
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

const fetchNotifications = (action$, state$, { httpClient, User, dispatch }) =>
  action$.pipe(
    ofType('NOTIFI_PAGE_READ_NOTIFICATION'),
    switchMap(action => {
      return from(
        httpClient.post('/get_notification', {
          user_id: User.id(),
        }),
      ).pipe(
        tap(({ data }) => console.warn(data)),
        map(({ data }) => {
          return dispatch('NOTIF_PAGE_SET_STATE', {
            notifications: data,
          });
        }),
        $retryDelay(100),
        $catchError(dispatch(null)),
      );
    }),
  );
export default [sendNotification, readNotification];
