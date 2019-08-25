import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '../../../../re-kits';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import {} from '../presenter';
import {} from '../interactor';
import ViewModal from '../viewModel/viewModel';
import { TemplatePresenter } from '../presenter';
import { TemplateInteractor } from '../interactor';
import RootStore from '../../../store';
class Builder extends React.Component<IProps> {
  presenter: TemplatePresenter;
  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    this.presenter = this.buildPresenter(interactor);
  }
  componentDidMount() {}
  buildInteractor = () => {
    return new TemplateInteractor();
  };
  buildPresenter = (interactor: IInteractor) => {
    return new TemplatePresenter(interactor);
  };
  buildViewModel = () => {
    return <ViewModal presenter={this.presenter} />;
  };
  render() {
    return this.buildViewModel();
  }
}

export default Builder;
