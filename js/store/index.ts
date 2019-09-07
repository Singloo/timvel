import { FeedStore } from '../modules/Feed/stores';
import { PostDetailStore } from '../modules/PostDetail/stores';
class RootStore {
  feed: FeedStore;
  postDetail: PostDetailStore;
  constructor() {
    this.feed = new FeedStore();
    this.postDetail = new PostDetailStore();
  }
}
const rootStore = new RootStore();
export default rootStore;
export { RootStore, FeedStore, PostDetailStore };
