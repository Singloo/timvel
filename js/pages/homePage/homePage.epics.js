import { ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import {
  mergeMap,
  throttleTime,
  concatMap,
  catchError,
  tap,
  map,
  switchMap,
  startWith,
  delay,
} from 'rxjs/operators';

const fetchMostPopularPosts = (action$, state$, { httpClient, logic }) =>
  action$.pipe(
    ofType('HOME_PAGE_FETCH_POPULAR_POSTS'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const { data } = await httpClient.get('/fetch_popular_posts', {
            params: {
              limit: 5,
            },
          });
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              popularPosts: data,
            }),
          );
        } catch (error) {
          console.warn(error.message);
        } finally {
          observer.complete();
        }
      }),
    ),
  );

const fetchPosts = (action$, state$, { logic, httpClient }) =>
  action$.pipe(
    ofType('HOME_PAGE_FETCH_POSTS'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const { happenedAt, offset } = action.payload;
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              isHeaderLoading: true,
            }),
          );
          const { data } = await httpClient.get('/fetch_posts', {
            happened_at: happenedAt,
            offset,
          });
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              posts: data,
              isHeaderLoading: false,
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

const fetchMorePosts = (action$, state$, { dispatch, httpClient }) =>
  action$.pipe(
    ofType('HOME_PAGE_FETCH_MORE_POSTS'),
    switchMap(({ payload }) =>
      from([1]).pipe(
        map(_ => {
          return dispatch('HOME_PAGE_SET_STATE', {
            isFooterLoading: false,
          });
        }),
        delay(3000),
        startWith({
          type: 'HOME_PAGE_SET_STATE',
          payload: {
            isFooterLoading: true,
          },
        }),
      ),
    ),
  );
const pressEmoji = (action$, state$, { logic }) =>
  action$.pipe(
    ofType('HOME_PAGE_PRESS_EMOJI'),
    concatMap(action => {
      const { emoji, postId } = action.payload;
      const { posts } = state$.value.homePage;
      const fixedPosts = posts.map(o => {
        if (o.postId === postId) {
          return {
            ...o,
            [emoji]: o[emoji] + 1,
          };
        }
        return o;
      });
      return of(
        logic('HOME_PAGE_SET_STATE', {
          posts: fixedPosts,
        }),
        logic('HOME_PAGE_PRESS_EMOJI_SEND_REQUEST', action.payload),
      );
    }),
  );

export const onPressEmojiRequest = (action$, state$, { httpClient }) =>
  action$.pipe(
    ofType('HOME_PAGE_PRESS_EMOJI_SEND_REQUEST'),
    throttleTime(500),
    concatMap(({ payload }) =>
      from(
        httpClient.post('/post_emojis', {
          emoji: payload.emoji,
          post_id: payload.postId,
        }),
      ).pipe(
        tap(_ => console.warn('success')),
        map(_ => ({ type: 'null' })),
        catchError(err => {
          console.warn(err.message);
          return of(null);
        }),
      ),
    ),
  );

export default [
  fetchMostPopularPosts,
  fetchPosts,
  pressEmoji,
  onPressEmojiRequest,
  fetchMorePosts,
];
