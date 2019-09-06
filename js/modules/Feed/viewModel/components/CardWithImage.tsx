import React from 'react';
import { View, StyleSheet } from 'react-native';
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
class CardWithImage extends React.PureComponent<IProps> {
  render() {
    const { post } = this.props;
    return (
      <View style={{ marginVertical: 20 }}>
        {this.renderColorBkAndTag()}
        {this.renderAvatarImageText()}
        {this.renderCornerWhiteBk()}
      </View>
    );
  }

  renderColorBkAndTag = () => {
    const { post } = this.props;
    return (
      <View style={styles.colorBkAndTagContainer}>
        <Text fontSize={23} bold style={{ marginBottom: -3, marginLeft: 14 }}>
          {post.tag}
        </Text>
        <View style={[styles.colorBk, { backgroundColor: post.tintColor }]}>
          <View style={styles.whiteInColor} />
        </View>
      </View>
    );
  };
  renderAvatarImageText = () => {
    const { post } = this.props;
    return (
      <View style={styles.contentContainer}>
        <Image
          size={60}
          uri={post.avatar}
          style={{ top: 50, left: -10, zIndex: 4 }}
        />
        <Image
          style={styles.coverImage}
          uri={get(post, 'imageUrls[0].imageUrl')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            // backgroundColor: 'blue',
            opacity: 0.7,
            marginTop: 10,
          }}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} fontSize={15}>
              {post.content}
            </Text>
          </View>
          <Image
            source={Assets.arrow_right.source}
            size={20}
            resizeMode={'contain'}
          />
        </View>
      </View>
    );
  };
  renderCornerWhiteBk = () => {
    return <View style={[styles.conerWhiteBk, Styles.shadowLight]} />;
  };
}
// 1.5 grey bar, half pink bar
const COLOR_WIDTH = SCREEN_WIDTH - 45 - 12.5;
const COLOR_HEIGHT = COLOR_WIDTH * 0.55;
// 2 grey bar, marin left 25(1 pink bar)
const IMAGE_WIDTH = SCREEN_WIDTH - 60 - 25;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.55;
const styles = StyleSheet.create({
  colorBk: {
    width: COLOR_WIDTH,
    height: COLOR_HEIGHT,
    // constraint the white bk inside,
    padding: 12.5,
    paddingTop: 20,
  },
  whiteInColor: {
    flex: 1,
    backgroundColor: colors.pureWhite,
  },
  conerWhiteBk: {
    zIndex: 0,
    width: COLOR_WIDTH,
    height: COLOR_HEIGHT,
    position: 'absolute',
    // half grey bar
    right: 15,
    bottom: 0,
    backgroundColor: colors.pureWhite,
  },
  colorBkAndTagContainer: {
    position: 'absolute',
    top: 0,
    // half grey bar
    left: 15,
    zIndex: 1,
  },
  coverImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    // goes a lit bit right, 2.5
    marginLeft: 2.5,
  },
  contentContainer: {
    zIndex: 3,
    // grey bar, and pink bar
    marginLeft: 30 + 25,
    // to white
    marginRight: 15,
    // to white
    marginTop: 5,
    // to corner
    marginBottom: 5,
  },
});
export default CardWithImage;
