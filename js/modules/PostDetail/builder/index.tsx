import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '../../../../re-kits';
import { IProps, IInteractor, IPresenter, IViewModel } from '../types';
import {} from '../presenter';
import {} from '../interactor';
import ViewModal from '../viewModel/viewModel';
import { PostDetailPresenter } from '../presenter';
import { PostDetailInteractor } from '../interactor';
import rootStore from '../../../store';
class Builder extends React.Component<IProps> {
  presenter: PostDetailPresenter;
  constructor(props: IProps) {
    super(props);
    const interactor = this.buildInteractor();
    this.presenter = this.buildPresenter(interactor);
  }
  componentDidMount() {}
  buildInteractor = () => {
    const post = this.props.navigation.getParam('post');
    rootStore.postDetail.setState({
      currentPost: post,
    });
    return new PostDetailInteractor(rootStore.postDetail);
  };
  buildPresenter = (interactor: IInteractor) => {
    return new PostDetailPresenter(interactor, this.props.navigation);
  };
  buildViewModel = () => {
    return <ViewModal presenter={this.presenter} />;
  };
  render() {
    return this.buildViewModel();
  }
}

export default Builder;
