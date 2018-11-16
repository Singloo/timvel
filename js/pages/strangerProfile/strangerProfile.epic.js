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
const fetchUserPosts = (action$, state, { httpClient, logic, User }) =>
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
          const user = await User.getUserByObjectId('5a005c211579a3004584970b');
          let userInfo = {
            username: user.get('username'),
            avatar: user.get('avatar'),
            userCoin: user.get('userCoin'),
          };
          observer.next(
            logic('STRANGER_PROFILE_SET_STATE', {
              postsByTag,
              userInfo,
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

const sendGift = (action$, state, { httpClient, logic, User, retryTimes }) =>
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
            payload: { content: 'Success' },
          };
        }),
        retryWhen(error => error.pipe(delay(1000), concatMap(retryTimes(2)))),
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

export default [fetchUserPosts, sendGift];
