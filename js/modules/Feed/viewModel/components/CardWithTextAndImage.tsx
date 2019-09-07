import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Image, Styles, Touchable } from '../../../../../re-kits';
import { IPost } from '../../../../models';
import { get } from 'lodash';
interface IProps {
  post: IPost;
  onPressPost: () => void;
}
class CardWithTextAndImage extends React.PureComponent<IProps> {
  render() {
    return (
      <View style={styles.container}>
        {this.renderImage()}
        {this.renderContent()}
      </View>
    );
  }

  renderImage = () => {
    const { post, onPressPost } = this.props;
    return (
      <Image
        onPress={onPressPost}
        style={styles.img}
        uri={get(post, 'imageUrls[0].imageUrl')}
      />
    );
  };
  renderContent = () => {
    const { post, onPressPost } = this.props;
    return (
      <Touchable onPress={onPressPost} style={styles.contentWrapper}>
        <View style={styles.avatarTagContainer}>
          <Text fontSize={23} bold style={{ top: 3, textAlign: 'right' }}>
            {post.tag}
          </Text>
        </View>
        <View style={[Styles.shadowLight, styles.contentContainer]}>
          <Text fontSize={15} style={{ lineHeight: 20 }} numberOfLines={5}>
            {post.content}
          </Text>
          <Image uri={post.avatar} size={60} style={styles.avatar} />
        </View>
      </Touchable>
    );
  };
}
const IMAGE_WIDTH = 155;
const IMAGE_HEIGHT = 1.6 * IMAGE_WIDTH;

const CONTENT_HEIGHT = 150;
const CONTENT_WIDTH = CONTENT_HEIGHT * 1.6;

const CENTER_IMAGE = (IMAGE_HEIGHT - CONTENT_HEIGHT) / 2;
const styles = StyleSheet.create({
  img: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 25,
    // 20 , avatar , 15 margin
    paddingTop: 20 + 15,
    height: CONTENT_HEIGHT,
    width: CONTENT_WIDTH,
  },
  avatarTagContainer: {
    // top: 20,
    flexDirection: 'row',
    alignItems: 'center',
    // zIndex: 1,
    justifyContent: 'flex-end',
    // 10 left to content, 60  avatar width, marginLeft 10
    paddingLeft: 10 + 60 + 10,
    // half image width
    paddingRight: IMAGE_WIDTH / 2 - 3,
  },
  contentWrapper: {
    position: 'absolute',
    // 1 grey + 10
    left: 30 + 10,
    // center of image
    bottom: CENTER_IMAGE,
  },
  avatar: {
    position: 'absolute',
    // left 10
    left: 10,
    // top 20 in content
    marginTop: -40,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // image, right 10
    paddingRight: 10,
    marginVertical: 20,
  },
});

export default CardWithTextAndImage;
