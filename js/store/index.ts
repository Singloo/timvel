import { FeedStore } from '../modules/Feed/stores';
class RootStore {
  feed: FeedStore;
  constructor() {
    this.feed = new FeedStore();
  }
}
const rootStore = new RootStore();
export default rootStore;
export { RootStore, FeedStore };
