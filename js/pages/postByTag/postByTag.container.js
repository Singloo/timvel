import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  RFlatList,
} from '../../../re-kits';
import { I18n, curried } from '../../utils';
import { connect2 } from '../../utils/Setup';
import { get } from 'lodash';
import Card from './components/Card';
import GradientSideBar from './components/GradientSideBar';
@connect2('postByTag')
class Sample extends Component {
  componentWillMount() {
    this.tag = this.props.navigation.getParam('tag', {});
    this.props.dispatch('POST_BY_TAG_FETCH_POSTS_BY_TAG', {
      tagId: get(this.tag, 'tagId', 1),
    });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };
  _onPressComment = () => {};
  _onPressEmoji = postId => emoji => {
    const { data } = this.props.state;
    const fixedPosts = data.map(o => {
      if (o.postId === postId) {
        return {
          ...o,
          [emoji]: o[emoji] + 1,
        };
      }
      return o;
    });
    this.props.dispatch('POST_BY_TAG_SET_STATE', {
      data: fixedPosts,
    });
    this.props.dispatch('HOME_PAGE_PRESS_EMOJI', {
      emoji,
      postId,
    });
  };
  _onPressPost = post => {
    this.props.navigation.navigate({
      routeName: 'postDetail',
      params: {
        post,
      },
    });
  };
  render() {
    const { data } = this.props.state;
    return (
      <View style={styles.container}>
        <NavBar
          title={get(this.tag, 'tag', '')}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexDirection: 'row' }}
        >
          <GradientSideBar
            style={{ marginHorizontal: 10, marginVertical: -300 }}
          />
          <View style={{}}>
            {/* <Text style={{}}>{'我在未来等你'.split('').join('\n')}</Text> */}
            {data.map(this._renderItem)}
          </View>
        </ScrollView>
      </View>
    );
  }
  _renderItem = (item, index) => {
    return (
      <Card
        key={'pbt' + index}
        post={item}
        onPressComment={this._onPressComment}
        onPressEmoji={this._onPressEmoji(item.postId)}
        onPressPost={curried(this._onPressPost)(item)}
      />
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
