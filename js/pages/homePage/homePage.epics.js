import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap, throttleTime } from 'rxjs/operators';

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
          const { data } = await httpClient.get('/fetch_posts', {
            happened_at: happenedAt,
            offset,
          });
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              posts: data,
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

const pressEmoji = (action$, state$, { logic, httpClient }) =>
  action$.pipe(
    ofType('HOME_PAGE_PRESS_EMOJI'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
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
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              posts: fixedPosts,
            }),
          );
          const data = await httpClient.post('/post_emojis', {
            emoji,
            post_id: postId,
          });
          console.warn('success');
        } catch (error) {
          console.warn(error.message);
        } finally {
          observer.complete();
        }
      }),
    ),
  );

export default [fetchMostPopularPosts, fetchPosts, pressEmoji];
