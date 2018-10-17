import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import AV from 'leancloud-storage';
const publishProduct = (
  action$,
  state$,
  { User, httpClient, I18n, OSS, logic },
) =>
  action$.pipe(
    ofType('PUBLISH_PRODUCT_PUBLISH_PRODUCT'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          observer.next(
            logic('GLOBAL_SET_STATE', {
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
          const user = await AV.User.currentAsync();
          if (user === null) {
            observer.next(
              logic('SHOW_SNAKE_BAR', {
                content: 'Please log in first',
                type: 'ERROR',
              }),
            );
            observer.complete();
            return;
          }
          const imageUrl = await OSS.upLoadImage(coverImage);
          await httpClient.post('/publish_product', {
            name: title,
            description: description,
            price,
            image_url: imageUrl,
            user_id: user.get('userId'),
            product_type: productType,
            title: confirmedCustomTitle.title,
            color: confirmedCustomTitle.color,
          });
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(logic('NAVIGATION_BACK'));
          observer.next(
            logic('SHOW_SNAKE_BAR', {
              content: 'Sent success, waiting for review',
            }),
          );
        } catch (error) {
          console.warn(error.message);
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            logic('SHOW_SNAKE_BAR', {
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
