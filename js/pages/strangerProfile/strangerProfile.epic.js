import { ofType } from 'redux-observable';
import { Observable, pipe, from, of } from 'rxjs';
import {
  map,
  mergeMap,
  switchMap,
  exhaustMap,
  retryWhen,
  delay,
  catchError,
  concatMap,
  tap,
} from 'rxjs/operators';
import { filterPostsByTag, Cache } from '../../utils';
const fetchUserPosts = (action$, state, { httpClient, dispatch, User }) =>
  action$.pipe(
    ofType('STRANGER_PROFILE_FETCH_POSTS'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { userId } = action.payload;
          const cahced = await Cache.get(Cache.USER_POSTS_CACHE_KEYS(userId));
          if (cahced) {
            const postsByTag = filterPostsByTag(cahced);
            observer.next(
              dispatch('USER_SET_STATE', {
                userPosts: postsByTag,
              }),
            );
          }
          const { data } = await httpClient.get('/post/condition', {
            params: { user_id: userId },
          });
          const postsByTag = filterPostsByTag(data);
          observer.next(
            dispatch('STRANGER_PROFILE_SET_STATE', {
              postsByTag,
            }),
          );
          Cache.set(Cache.USER_POSTS_CACHE_KEYS(userId), data)
            .then(() => {})
            .catch(() => {});
        } catch (error) {
          console.warn(error);
        } finally {
          observer.complete();
        }
      }),
    ),
  );

const sendGift = (action$, state, { httpClient, User, $retryDelay }) =>
  action$.pipe(
    ofType('STRANGER_PROFILE_SEND_GIFT'),
    exhaustMap(({ payload }) =>
      from(
        httpClient.post('/gift/send', {
          sender: User.objectId,
          receiver: payload.receiver,
          gift_type: payload.giftType,
        }),
      ).pipe(
        map(_ => {
          return {
            type: 'SHOW_SNAKE_BAR',
            payload: { content: 'Sent gift' },
          };
        }),
        $retryDelay(1000, 3),
        catchError(error => {
          console.warn(error.message);
          return of({
            type: 'SHOW_SNAKE_BAR',
            payload: { type: 'ERROR', content: '' },
          });
        }),
      ),
    ),
  );

const fetchUserInfos = (
  action$,
  state$,
  { httpClient, dispatch, Network, $retryDelay },
) =>
  action$.pipe(
    ofType('STRANGER_PROFILE_FETCH_USER_INFOS'),
    switchMap(({ payload }) =>
      from(Network.getUserInfo(payload.userId)).pipe(
        map(({ data }) => {
          const { callback } = payload;
          callback(data.flowers, data.shits);
          return {
            type: 'STRANGER_PROFILE_SET_STATE',
            payload: {
              userInfo: data,
            },
          };
        }),
        $retryDelay(1000, 3),
        catchError(error => {
          console.warn(error.message);
          return of({
            type: 'SHOW_SNAKE_BAR',
            payload: { type: 'ERROR', content: 'Network error' },
          });
        }),
      ),
    ),
  );

export default [fetchUserPosts, sendGift, fetchUserInfos];
