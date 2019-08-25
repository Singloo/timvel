import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '../../../../re-kits';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import {} from '../presenter';
import {} from '../interactor';
import ViewModal from '../viewModel/viewModel';
import { FeedPresenter } from '../presenter';
import { FeedInteractor } from '../interactor';
import RootStore from '../../../store';
class Builder extends React.Component<IProps> {
  presenter: FeedPresenter;
  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    this.presenter = this.buildPresenter(interactor);
  }
  componentDidMount() {}
  buildInteractor = () => {
    return new FeedInteractor(RootStore.feed);
  };
  buildPresenter = (interactor: IInteractor) => {
    return new FeedPresenter(interactor);
  };
  buildViewModel = () => {
    return <ViewModal presenter={this.presenter} />;
  };
  render() {
    return this.buildViewModel();
  }
}

export default Builder;
