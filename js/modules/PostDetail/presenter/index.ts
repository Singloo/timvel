import {} from '../../../utils';
import { IPresenter, IInteractor, IViewModel } from '../types';
import { NavigationScreenProp } from 'react-navigation';
class PostDetailPresenter implements IPresenter {
  viewModel?: IViewModel;
  constructor(
    public interactor: IInteractor,
    public navigation: NavigationScreenProp<any>,
  ) {}
  setViewModal = (viewModel: IViewModel) => {
    this.viewModel = viewModel;
  };

  componentDidMount() {}
  componentWillUnmount() {}
}
export { PostDetailPresenter };
