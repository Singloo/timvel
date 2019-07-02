import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
const publishProduct = (
  action$,
  state$,
  { User, httpClient, OSS, dispatch, navigation },
) =>
  action$.pipe(
    ofType('PUBLISH_PRODUCT_PUBLISH_PRODUCT'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: true,
            }),
          );
          const {
            title,
            price,
            description,
            productType,
            imagePath,
            confirmedCustomTitle,
          } = action.payload;

          if (!User.isLoggedIn) {
            observer.next(
              dispatch('SHOW_SNAKE_BAR', {
                content: '请先登录',
                type: 'ERROR',
              }),
            );
            observer.complete();
            return;
          }
          const imageUrl = await OSS.upLoadImage(imagePath);
          await httpClient.post('/product', {
            name: title,
            description: description,
            price,
            image_url: imageUrl,
            user_id: User.objectId,
            product_type: productType,
            title: confirmedCustomTitle.title,
            color: confirmedCustomTitle.color,
          });
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          navigation.back();
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content: '我们已经收到啦,需要等待审核',
            }),
          );
        } catch (error) {
          console.warn(error.message);
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content: '网络错误',
              type: 'ERROR',
            }),
          );
        } finally {
          observer.complete();
        }
      }),
    ),
  );
export default [publishProduct];
