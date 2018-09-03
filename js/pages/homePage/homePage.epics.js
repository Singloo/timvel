import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
          console.warn(error);
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
          const { emoji, postId, enablePostEmoji } = action.payload;
          let { posts } = state$().value.homePage;
          posts.forEach(item => {
            if (item.postId === postId) {
              item[emoji] = item[emoji] + 1;
            }
          });
          if (enablePostEmoji === false) {
            observer.complete();
            return;
          }
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              enablePostEmoji: false,
            }),
          );
          const data = await httpClient.post('/post_emojis', {
            emoji,
            post_id: postId,
          });
          // await new Promise((resolve, reject) => {
          //   setTimeout(resolve, 500);
          // });
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              enablePostEmoji: true,
            }),
          );
          console.warn('success');
        } catch (error) {
          console.warn(error);
          observer.next(
            logic('HOME_PAGE_SET_STATE', {
              enablePostEmoji: true,
            }),
          );
        } finally {
          observer.complete();
        }
      }),
    ),
  );

export default [fetchMostPopularPosts, fetchPosts, pressEmoji];
