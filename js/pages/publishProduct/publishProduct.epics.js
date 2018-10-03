import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import AV from 'leancloud-storage';
const publishProduct = (action$, state$, { User, httpClient, I18n, OSS }) =>
  action$.pipe(
    ofType('PUBLISH_PRODUCT_PUBLISH_PRODUCT'),
    mergeMap(action =>
      Observable.create(async observer => {
        try {
          const {
            title,
            price,
            description,
            productType,
            coverImage,
          } = action.payload;
          const imageUrl = await OSS.upLoadImage(coverImage);
          const user = await AV.User.currentAsync();
          await httpClient.post('/publish_product', {
            name: title,
            description: description,
            price,
            image_url: imageUrl,
            user_id: user.get('userId'),
            product_type: productType,
          });
        } catch (error) {
          console.warn(error.message);
        } finally {
          observer.complete();
        }
      }),
    ),
  );
export default [publishProduct];
