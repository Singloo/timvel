import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import AV from 'leancloud-storage';
const publishProduct = (
  action$,
  state$,
  { User, httpClient, OSS, dispatch ,navigation},
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
            coverImage,
            confirmedCustomTitle,
          } = action.payload;

          if (!User.isLoggedIn()) {
            observer.next(
              dispatch('SHOW_SNAKE_BAR', {
                content: 'Please log in first',
                type: 'ERROR',
              }),
            );
            observer.complete();
            return;
          }
          const imageUrl = await OSS.upLoadImage(coverImage);
          await httpClient.post('/product', {
            name: title,
            description: description,
            price,
            image_url: imageUrl,
            user_id: User.id(),
            product_type: productType,
            title: confirmedCustomTitle.title,
            color: confirmedCustomTitle.color,
          });
          observer.next(
            dispatch('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          navigation.back()
          observer.next(
            dispatch('SHOW_SNAKE_BAR', {
              content: 'Sent success, waiting for review',
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
              content: 'Network error',
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
