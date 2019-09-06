import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Button,
  NavBar,
  RFlatList,
  PADDING_TOP,
} from '../../../../re-kits';
import { IViewModel, IPresenter } from '../types';
import { FeedPresenter } from '../presenter';
import {} from '../interactor';
import { FeedStore } from '../../../store';
import { observer, inject } from 'mobx-react';
import { IPost } from '../../../models';
import { FeedCard, FeedBackground } from './components/functional';
import CardWithImage from './components/CardWithImage';
import CardWithPureText from './components/CardWithPureText';
import CardWithTextAndImage from './components/CardWithTextAndImage';
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
      <View style={{ flex: 1 }}>
        <FeedBackground />
        <RFlatList
          data={posts}
          renderItem={this._renderCard}
          keyExtractor={item => 'p' + item.postId}
          contentContainerStyle={{ paddingTop: PADDING_TOP + 20 }}
        />
      </View>
    );
  }
  _renderCard = ({ item, index }: { item: IPost; index: number }) => {
    // return <CardWithTextAndImage post={item} />;
    if (index % 3 === 0) {
      return <CardWithImage post={item} />;
    }
    if (index % 3 === 1) {
      return <CardWithTextAndImage post={item} />;
    }
    return <CardWithPureText post={item} />;
  };
}

export default inject('feed')(FeedViewModel);
