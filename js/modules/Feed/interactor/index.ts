import { IInteractor } from '../types';
import { FeedStore } from '../../../store';
import { Cache, apiClient, randomItem } from '../../../utils';
import { IPost, PostCardType } from '../../../models';
import { lightColorSet } from '../../../../re-kits/utils/colors';
import { get } from 'lodash';
const calCardType = (post: IPost): PostCardType => {
  if (get(post.imageUrls, 'length', 0) === 0)
    return PostCardType.MORE_TEXT_WITHOUT_IMAGE;
  if (get(post.imageUrls, 'length') === 1)
    return PostCardType.IMAGE_WIDTH_MEDIUM_TEXT;
  return PostCardType.MULTIPLE_IMAGES_LESS_TEXT;
};
class FeedInteractor implements IInteractor {
  constructor(public feed: FeedStore) {}

  fetchPosts = async (happenedAt: string, offset: number = 0) => {
    const cached = await Cache.get(Cache.CACHE_KEYS.HOME_PAGE_FEEDS);
    if (cached) this.feed.setState({ posts: cached });
    const { data } = await apiClient.get('/post', {
      params: { happened_at: happenedAt, offset },
    });
    const _data = (data as IPost[]).map(post => {
      return {
        ...post,
        tintColor: randomItem(lightColorSet),
        cardType: calCardType(post),
      };
    });
    this.feed.setState({
      posts: _data,
    });
    Cache.set(Cache.CACHE_KEYS.HOME_PAGE_FEEDS, data, true);
  };
}

export { FeedInteractor };
