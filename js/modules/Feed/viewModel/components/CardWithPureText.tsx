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
      <View style={[styles.colorBk, { backgroundColor: colors.lightGreen }]} />
    );
  };
  renderTagContainer = () => {
    return (
      <View style={[styles.tagContainer, styles.tagShadow]}>
        <View style={{ left: 60 + 18, top: 5 }}>
          <Text
            fontSize={23}
            bold
            style={{
              transform: [{ rotate: '-90deg' }],
              width: 180,
              // backgroundColor: 'red',
              textAlign: 'center',
            }}>
            {this.props.post.tag}
          </Text>
        </View>
      </View>
    );
  };
  renderContent = () => {
    const { post } = this.props;
    return (
      <View
        style={{
          // backgroundColor: 'red',
          marginLeft: 30 + 30 + 25,
          marginTop: -40,
        }}>
        <Image
          size={60}
          uri={post.avatar}
          style={{ top: 50, left: -10, zIndex: 4 }}
        />
        {this.renderText()}
      </View>
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
    right: 15,
  },
  textContainer: {
    width: TEXT_CONTAINER_WIDTH,
    height: TEXT_CONTAINER_HEIGHT,
    padding: 20,
    paddingTop: 60,
    backgroundColor: 'white',
  },
  tagContainer: {
    position: 'absolute',
    top: 40,
    left: 60,
    height: 180,
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
});
export default CardWithPureText;
