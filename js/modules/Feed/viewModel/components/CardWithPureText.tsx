import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Text,
  Image,
  Touchable,
  Styles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  colors,
  Assets,
} from '../../../../../re-kits';
import { IPost } from '../../../../models';
import { get } from 'lodash';
interface IProps {
  post: IPost;
  onPressPost: () => void;
}
class CardWithPureText extends React.PureComponent<IProps> {
  render() {
    return (
      <View style={{ marginVertical: 20 }}>
        {this.renderColorBk()}
        {this.renderTagContainer()}
        {this.renderContent()}
      </View>
    );
  }
  renderColorBk = () => {
    return (
      <View
        style={[styles.colorBk, { backgroundColor: this.props.post.tintColor }]}
      />
    );
  };
  renderTagContainer = () => {
    return (
      <View style={[styles.tagContainer, styles.tagShadow]}>
        <View style={styles.tagWrapper}>
          <Text fontSize={23} bold>
            {this.props.post.tag}
          </Text>
        </View>
      </View>
    );
  };
  renderContent = () => {
    const { post, onPressPost } = this.props;
    return (
      <Touchable onPress={onPressPost} style={styles.contentContainer}>
        <Image size={60} uri={post.avatar} style={styles.avatar} />
        {this.renderText()}
      </Touchable>
    );
  };
  renderText = () => {
    const { post } = this.props;
    return (
      <View style={[styles.textContainer, Styles.shadowLight]}>
        <View style={{ flex: 1 }}>
          <Text fontSize={15} style={{ lineHeight: 20 }} numberOfLines={11}>
            {post.content}
          </Text>
        </View>
      </View>
    );
  };
}
// 2 grey bar width
const COLORBK_WIDTH = SCREEN_WIDTH - 30 - 30;
const COLORBK_HEIGHT = COLORBK_WIDTH * 0.6;
// 1 grey bar, 30+25, margin to white, 30+12.5, grey bar, half pink bar
const TEXT_CONTAINER_WIDTH = SCREEN_WIDTH - 30 - 30 - 25 - 30 - 12.54;
const TEXT_CONTAINER_HEIGHT = 1.2 * TEXT_CONTAINER_WIDTH;
const styles = StyleSheet.create({
  colorBk: {
    width: COLORBK_WIDTH,
    height: COLORBK_HEIGHT,
    position: 'absolute',
    top: 0,
    // to border
    right: 15,
  },
  textContainer: {
    width: TEXT_CONTAINER_WIDTH,
    height: TEXT_CONTAINER_HEIGHT,
    padding: 20,
    // avatar + 20
    paddingTop: 60,
    backgroundColor: 'white',
  },
  tagContainer: {
    position: 'absolute',
    // to color bk
    top: 40,
    // 2 grey bar
    left: 60,
    // fixed
    height: 180,
    // widh 25, 3 for tag
    width: 25 + 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  tagShadow: Platform.select({
    ios: {
      shadowOpacity: 0.3,
      shadowRadius: 30,
      shadowOffset: {
        height: 8,
        width: -5,
      },
      shadowColor: 'rgb(0,0,0)',
      backgroundColor: 'white',
    },
    android: { elevation: 1, backgroundColor: 'white' },
  }),
  tagWrapper: {
    // 2 grey bar
    left: 60 + 18,
    top: 5,
    transform: [{ rotate: '-90deg' }],
    width: 180,
    alignItems: 'center',
  },
  contentContainer: {
    // 2 grey bar, 25 tag container width
    marginLeft: 30 + 30 + 25,
    //
    marginTop: -40,
  },
  avatar: {
    // 50 in content
    top: 50,
    // 10 to content
    left: -10,
    zIndex: 4,
  },
});
export default CardWithPureText;
