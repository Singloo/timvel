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
import { randomItem } from '../../utils';
import { colorSets } from '../../../re-kits';
const generateColorsUntil = (colors = [], toNum) => {
  const _colors = colors.concat(randomItem(colorSets, toNum - colors.length));
  if (_colors.length === toNum) {
    return _colors;
  }
  return generateColorsUntil(_colors, toNum);
};
const fetchMostPopularPosts = (action$, state$, { httpClient, dispatch }) =>
  action$.pipe(
    ofType('HOME_PAGE_FETCH_POPULAR_POSTS'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const { data } = await httpClient.get('/post/popular', {
            params: {
              limit: 5,
            },
          });
          observer.next(
            dispatch('HOME_PAGE_SET_STATE', {
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

const fetchPosts = (action$, state$, { dispatch, httpClient }) =>
  action$.pipe(
    ofType('HOME_PAGE_FETCH_POSTS'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const { happenedAt, offset } = action.payload;
          observer.next(
            dispatch('HOME_PAGE_SET_STATE', {
              isHeaderLoading: true,
            }),
          );
          const { data } = await httpClient.get('/post', {
            happened_at: happenedAt,
            offset,
          });
          observer.next(dispatch('HOME_PAGE_MUTATE_POSTS', { posts: data }));
          observer.next(
            dispatch('HOME_PAGE_SET_STATE', {
              isHeaderLoading: false,
            }),
          );
        } catch (error) {
          console.warn(error.message);
          observer.next(
            dispatch('HOME_PAGE_SET_STATE', {
              isHeaderLoading: false,
            }),
          );
        } finally {
          observer.complete();
        }
      }),
    ),
  );

const fetchMorePosts = (action$, state$, { dispatch, httpClient }) =>
  action$.pipe(
    ofType('HOME_PAGE_FETCH_MORE_POSTS'),
    throttleTime(3000),
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
const pressEmoji = (action$, state$, { dispatch }) =>
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
        dispatch('HOME_PAGE_SET_STATE', {
          posts: fixedPosts,
        }),
        dispatch('HOME_PAGE_PRESS_EMOJI_SEND_REQUEST', action.payload),
      );
    }),
  );

const onPressEmojiRequest = (action$, state$, { httpClient, User }) =>
  action$.pipe(
    ofType('HOME_PAGE_PRESS_EMOJI_SEND_REQUEST'),
    throttleTime(500),
    concatMap(({ payload }) =>
      from(
        httpClient.post('/post/emoji', {
          emoji: payload.emoji,
          post_id: payload.postId,
          user_id: User.objectId(),
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
const mutatePosts = (action$, state$, { dispatch }) =>
  action$.pipe(
    ofType('HOME_PAGE_MUTATE_POSTS'),
    map(({ payload }) => {
      const { posts: nextPosts } = payload;
      const { posts, colorsSets } = state$.value.homePage;
      const next = Array.isArray(nextPosts)
        ? posts.concat(nextPosts)
        : [nextPosts].concat(posts);
      const nextColors = generateColorsUntil(colorsSets, next.length + 1);
      return dispatch('HOME_PAGE_SET_STATE', {
        colorsSets: nextColors,
        posts: next,
      });
    }),
  );

export default [
  fetchMostPopularPosts,
  fetchPosts,
  pressEmoji,
  onPressEmojiRequest,
  fetchMorePosts,
  mutatePosts,
];
