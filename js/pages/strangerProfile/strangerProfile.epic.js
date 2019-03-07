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
import { base } from '../../utils';
const { filterPostsByTag } = base;
const fetchUserPosts = (action$, state, { httpClient, dispatch, User }) =>
  action$.pipe(
    ofType('STRANGER_PROFILE_FETCH_POSTS'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { userId } = action.payload;
          const { data } = await httpClient.get('/fetch_post_with_condition', {
            params: { user_id: userId },
          });
          const postsByTag = filterPostsByTag(data);
          observer.next(
            dispatch('STRANGER_PROFILE_SET_STATE', {
              postsByTag,
            }),
          );
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
        httpClient.post('/send_gift', {
          sender: User.id(),
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
