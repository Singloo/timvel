import { IPost } from '../../../models';

export interface IProps {}
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
