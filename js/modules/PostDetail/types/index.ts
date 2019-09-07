import {} from '../../../models';
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
}
export interface IInteractor {}
