import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import Moment from 'moment';
const sendComment = (action$, state$, { User, httpClient, dispatch }) =>
  action$.pipe(
    ofType('COMMENT_COMMENT_POST'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { postId, content, callback } = action.payload;
          const { comments } = state$.value.comment;
          await httpClient.post('/post_comment', {
            post_id: postId,
            user_id: User.id(),
            content,
          });
          let comment = {
            userId: User.id(),
            username: User.username(),
            avatar: User.avatar(),
            content: content,
            createdAt: Moment().format(),
          };
          callback && callback();
          observer.next(
            dispatch('COMMENT_SET_STATE', {
              comments: [].concat(comments, comment),
            }),
          );
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              type: 'SUCCESS',
              content: 'Comment successful',
            }),
          );
        } catch (error) {
          console.warn(error);
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              type: 'ERROR',
              content: 'Network error, try again',
            }),
          );
        } finally {
          observer.complete();
        }
      }),
    ),
  );

const fetchComments = (action$, _, { httpClient, dispatch }) =>
  action$.pipe(
    ofType('COMMENT_FETCH_COMMENTS'),
    switchMap(action =>
      Observable.create(async observer => {
        try {
          const { postId, offset } = action.payload;
          const { data } = await httpClient.get('/fetch_post_comments', {
            params: {
              post_id: postId,
              offset: offset,
            },
          });
          observer.next(
            dispatch('COMMENT_SET_STATE', {
              comments: data,
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
export default [fetchComments, sendComment];
