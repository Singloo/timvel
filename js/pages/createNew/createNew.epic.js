import { from, Observable } from 'rxjs';
import { ofType } from 'redux-observable';
import { exhaustMap } from 'rxjs/operators';
const createPost = (action$, state$, { logic, httpClient, OSS, User }) =>
  action$.pipe(
    ofType('CREATE_NEW_SEND_POST'),
    exhaustMap(({ payload }) =>
      Observable.create(async observer => {
        try {
          const { images, content, weatherInfo, tag, date } = payload;
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: true,
            }),
          );
          let imageUrls = [];
          for (let image of images) {
            if (image.type === 'unsplash') {
              imageUrls.push({ ...image });
            } else {
              const imageUrl = await OSS.upLoadImage(image);
              imageUrls.push({
                imageUrl,
                type: 'local',
                width: image.width,
                height: image.height,
                mime: image.mime,
                size: image.size,
                exif: image.exif,
              });
            }
          }
          await httpClient.post('/create_post', {
            content: content,
            image_urls: imageUrls,
            user_id: User.id(),
            weather_info: weatherInfo,
            post_type: 'normal',
            tag: tag,
            happened_at: date,
          });
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(logic('NAVIGATION_BACK'));
          observer.next(
            logic('SHOW_SNAKE_BAR', {
              content: '发布成功!',
              type: 'SUCCESS',
            }),
          );
        } catch (error) {
          console.warn(error);
          observer.next(
            logic('GLOBAL_SET_STATE', {
              isLoading: false,
            }),
          );
          observer.next(
            logic('SHOW_SNAKE_BAR', {
              content: '网络错误..!',
              type: 'ERROR',
            }),
          );
        } finally {
          observer.complete();
        }
      }),
    ),
  );

export default [createPost];
