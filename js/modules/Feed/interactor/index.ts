import { IInteractor } from '../types';
import { FeedStore } from '../../../store';
import { Cache, apiClient } from '../../../utils';
class FeedInteractor implements IInteractor {
  constructor(public feed: FeedStore) {}

  fetchPosts = async (happenedAt: string, offset: number = 0) => {
    const cached = await Cache.get(Cache.CACHE_KEYS.HOME_PAGE_FEEDS);
    if (cached) this.feed.setState({ posts: cached });
    const { data } = await apiClient.get('/post', {
      params: { happened_at: happenedAt, offset },
    });
    this.feed.setState({
      posts: data,
    });
    Cache.set(Cache.CACHE_KEYS.HOME_PAGE_FEEDS, data, true);
  };
}

export { FeedInteractor };
