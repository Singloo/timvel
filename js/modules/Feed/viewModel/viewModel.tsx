import React from 'react';
import { View } from 'react-native';
import { Text, Button, NavBar, RFlatList } from '../../../../re-kits';
import { IViewModel, IPresenter } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../../../store';
import { observer, inject } from 'mobx-react';
import { IPost } from '../../../models';
import { FeedCard } from './components/functional';
interface IProps {
  presenter: FeedPresenter;
  feed?: FeedStore;
}

// @inject('store')
@observer
class FeedViewModel extends React.Component<IProps, any> implements IViewModel {
  presenter: FeedPresenter;
  constructor(props: IProps) {
    super(props);
    this.presenter = this.props.presenter;
    this.presenter.setViewModal(this);
  }
  componentDidMount() {
    this.presenter.componentDidMount();
  }
  render() {
    const { posts } = this.props.feed!;
    return (
      <View>
        <NavBar title={'Feed'} />
        <RFlatList
          data={posts}
          renderItem={this._renderCard}
          keyExtractor={item => 'p' + item.postId}
        />
      </View>
    );
  }
  _renderCard = ({ item }: { item: IPost; index: number }) => {
    return <FeedCard post={item} onPress={this.presenter.onPressPost} />;
  };
}

export default inject('feed')(FeedViewModel);
