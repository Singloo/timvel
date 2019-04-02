import { ofType } from 'redux-observable';
import { $retryDelay, $catchError, ApiNotifications, Cache } from '../../utils';
import { from, merge, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { get } from 'lodash';
const readNotification = (action$, state$, { httpClient, User, dispatch }) =>
  action$.pipe(
    ofType('NOTIFI_PAGE_READ_NOTIFICATION'),
    switchMap(action => {
      if (!User.isLoggedIn) {
        return of(dispatch(null));
      }
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
      if (!User.isLoggedIn) {
        return of(dispatch(null));
      }
      const arr = [];
      arr.push(
        from(Cache.get(Cache.CACHE_KEYS.NOTIFICATION_COMMENT)).pipe(
          map(data =>
            data
              ? dispatch('NOTIF_PAGE_SET_STATE', {
                  comments: get(data, 'data', []),
                })
              : dispatch(null),
          ),
        ),
      );
      arr.push(
        from(ApiNotifications.getNotification(User.objectId, 'comment')).pipe(
          tap(({ data }) => {
            if (data.data.length === 0) {
              return;
            }
            Cache.set(Cache.CACHE_KEYS.NOTIFICATION_COMMENT, data.data)
              .then(() => {})
              .catch(() => {});
          }),
          map(({ data }) =>
            dispatch('NOTIF_PAGE_SET_STATE', {
              comments: get(data, 'data', []),
            }),
          ),
        ),
      );
      return merge(...arr).pipe(
        $retryDelay(100),
        $catchError(dispatch(null)),
      );
    }),
  );
export default [readNotification, fetchComments];
