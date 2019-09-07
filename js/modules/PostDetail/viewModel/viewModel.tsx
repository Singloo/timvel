import React from 'react';
import { View } from 'react-native';
import { Text, Button, Image, SCREEN_WIDTH } from '../../../../re-kits';
import { IViewModel, IPresenter } from '../types';
import { PostDetailPresenter } from '../presenter';
import { PostDetailStore } from '../../../store';
import { observer, inject } from 'mobx-react';
import { get } from 'lodash';

interface IProps {
  presenter: PostDetailPresenter;
  postDetail?: PostDetailStore;
}

// @inject('store')
@observer
class PostDetailViewModel extends React.Component<IProps, any>
  implements IViewModel {
  presenter: PostDetailPresenter;
  constructor(props: IProps) {
    super(props);
    this.presenter = this.props.presenter;
    this.presenter.setViewModal(this);
  }
  render() {
    const { currentPost } = this.props.postDetail!;
    return (
      <View style={{ flex: 1 }}>
        <Image
          uri={get(currentPost!.imageUrls[0], 'imageUrl')}
          style={{ width: SCREEN_WIDTH, height: 200 }}
        />
      </View>
    );
  }
}

export default inject('postDetail')(PostDetailViewModel);
