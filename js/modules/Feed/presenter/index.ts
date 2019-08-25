import {} from '../../../utils';
import { IPresenter, IInteractor, IViewModel } from '../types';
import Moment from 'moment';
import { IPost } from '../../../models';
class FeedPresenter implements IPresenter {
  viewModel?: IViewModel;
  constructor(public interactor: IInteractor) {}
  setViewModal = (viewModel: IViewModel) => {
    this.viewModel = viewModel;
  };

  componentDidMount() {
    this.fetchPosts();
  }
  fetchPosts = () => {
    this.interactor
      .fetchPosts(Moment().format())
      .catch(err => console.warn(err.message));
  };
  onPressPost = (post: IPost) => {
    console.warn(post.postId);
  };
  componentWillUnmount() {}
}
export { FeedPresenter };
