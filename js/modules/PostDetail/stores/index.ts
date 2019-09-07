import { observable, action, configure } from 'mobx';
import { IPost } from '../../../models';

configure({
  enforceActions: 'always',
});

interface IStore {
  currentPost?: IPost;
}
class PostDetailStore {
  currentPost?: IPost;
  @action setState = (nextState: IStore) => {
    Object.assign(this, nextState);
  };
}
export { PostDetailStore };
