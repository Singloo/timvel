import { observable, action, configure } from 'mobx';
import { IPost } from '../../../models';
configure({
  enforceActions: 'always',
});

interface IStore {
  posts?: IPost[];
}
class FeedStore {
  @observable posts: IPost[] = [];
  @action setState = (nextState: IStore) => {
    Object.assign(this, nextState);
  };
}
export { FeedStore };
