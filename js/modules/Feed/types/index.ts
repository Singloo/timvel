import { IPost } from '../../../models';
import { NavigationScreenProps } from 'react-navigation';

export interface IProps extends NavigationScreenProps {}
export interface IState {}
export interface IViewModel {
  presenter: IPresenter;
}
export interface IPresenter {
  viewModel?: IViewModel;
  setViewModal: (viewModel: IViewModel) => void;
  interactor: IInteractor;
  onPressPost: (post: IPost) => void;
}
export interface IInteractor {
  fetchPosts: (happenedAt: string, offset?: number) => Promise<void>;
}
