import { Observable, from, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { $catchError, ApiNotifications, retry3, HANDLE } from '../../utils';
import Moment from 'moment';
const sendComment = (action$, state$, { User, httpClient, dispatch }) =>
  action$.pipe(
    ofType('COMMENT_COMMENT_POST'),
    switchMap(action => {
      const { post, content, callback, associatedCommentId } = action.payload;
      return from(
        httpClient.post('/post/comments', {
          post_id: post.postId,
          user_id: User.id(),
          receiver_user_id: post.userId,
          content,
          associated_comment_id: associatedCommentId,
        }),
      ).pipe(
        map(({ data }) => data.commentId),
        tap(commentId => {
          callback && callback();
        }),
        map(_ => ({
          userId: User.id(),
          username: User.username(),
          avatar: User.avatar(),
          content: content,
          createdAt: Moment().format(),
        })),
      );
    }),
    switchMap(comment => {
      const { comments } = state$.value.comment;
      return of(
        dispatch('COMMENT_SET_STATE', {
          comments: [].concat(comments, comment),
        }),
        dispatch('SHOW_SNAKE_BAR', {
          type: 'SUCCESS',
          content: 'Comment successful',
        }),
      );
    }),
    $catchError(
      dispatch('SHOW_SNAKE_BAR', {
        type: 'ERROR',
        content: 'Network error, try again',
      }),
    ),

    // switchMap(action =>
    //   Observable.create(async observer => {
    //     try {
    //       const { postId, content, callback } = action.payload;
    //       const { comments } = state$.value.comment;
    //       await httpClient.post('/post_comment', {
    //         post_id: postId,
    //         user_id: User.id(),
    //         content,
    //       });
    //       let comment = {
    //         userId: User.id(),
    //         username: User.username(),
    //         avatar: User.avatar(),
    //         content: content,
    //         createdAt: Moment().format(),
    //       };
    //       callback && callback();
    //       observer.next(
    //         dispatch('COMMENT_SET_STATE', {
    //           comments: [].concat(comments, comment),
    //         }),
    //       );
    //       observer.next(
    //         dispatch('SHOW_SNAKE_BAR', {
    //           type: 'SUCCESS',
    //           content: 'Comment successful',
    //         }),
    //       );
    //     } catch (error) {
    //       console.warn(error);
    //       observer.next(
    //         dispatch('SHOW_SNAKE_BAR', {
    //           type: 'ERROR',
    //           content: 'Network error, try again',
    //         }),
    //       );
    //     } finally {
    //       observer.complete();
    //     }
    //   }),
    // ),
  );

const fetchComments = (action$, _, { httpClient, dispatch }) =>
  action$.pipe(
    ofType('COMMENT_FETCH_COMMENTS'),
    switchMap(action => {
      const { postId, offset } = action.payload;
      return from(
        httpClient.get('/post/comments', {
          params: {
            post_id: postId,
            offset: offset,
          },
        }),
      ).pipe(map(({ data }) => data));
    }),
    map(data =>
      dispatch('COMMENT_SET_STATE', {
        comments: data,
      }),
    ),
  );
export default [fetchComments, sendComment];
