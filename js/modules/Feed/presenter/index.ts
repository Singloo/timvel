import {} from '../../../utils';
import { IPresenter, IInteractor, IViewModel } from '../types';
import Moment from 'moment';
import { IPost } from '../../../models';
import { NavigationScreenProp } from 'react-navigation';
class FeedPresenter implements IPresenter {
  viewModel?: IViewModel;
  constructor(
    public interactor: IInteractor,
    public navigation: NavigationScreenProp<any>,
  ) {}
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
    this.navigation.navigate('postDetail', {
      post,
    });
  };
  componentWillUnmount() {}
}
export { FeedPresenter };
