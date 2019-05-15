import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  ImageSwiper,
  SCREEN_WIDTH,
  Touchable,
  colors,
  colorSets,
} from '../../../../re-kits';
import { I18n, DateFormatter, randomItem } from '../../../utils';
import BottomInfoBar from '../../homePage/components/BottomInfoBar';
import { get } from 'lodash';
const extractEmojiNums = post => ({
  numOfComments: post.numOfComments,
  shock: post.shock,
  laugh: post.laugh,
  angry: post.angry,
  vomit: post.vomit,
  nofeeling: post.nofeeling,
});
const cardWidth = SCREEN_WIDTH - 20 - 20;
const cardHeight = cardWidth - 60;
const diffEmojiChange = (currentPost, nextPost) => {
  if (currentPost.postId !== nextPost.postId) return true;
  const current = extractEmojiNums(currentPost);
  const next = extractEmojiNums(nextPost);
  return !!Object.keys(current).find(key => current[key] !== next[key]);
};
class Card extends Component {
  constructor(props) {
    super(props);
    this.dateFormatter = new DateFormatter(
      get(props, 'post.happenedAt', Date.now()),
    );
    this.tintColor = randomItem(colorSets);
  }
  shouldComponentUpdate(nextProps) {
    return diffEmojiChange(this.props.post, nextProps.post);
  }
  render() {
    return (
      <View style={styles.container}>
        {this._renderImage()}
        {this._renderBottomInfo()}
        {this._renderContent()}
      </View>
    );
  }
  _renderImage = () => {
    const { post } = this.props;
    return (
      <ImageSwiper
        imageUrls={post.imageUrls.map(o => o.imageUrl)}
        imageStyle={{ width: cardWidth, height: cardHeight }}
        width={cardWidth}
        height={cardHeight}
        showsPagination={true}
      />
    );
  };
  _renderBottomInfo = () => {
    const { post, onPressComment, onPressEmoji } = this.props;
    return (
      <BottomInfoBar
        onPressComment={onPressComment}
        onPressEmoji={onPressEmoji}
        nums={extractEmojiNums(post)}
      />
    );
  };
  _renderContent = () => {
    const { post, onPressPost } = this.props;
    // if (post.content.length === 0) {
    //   return null;
    // }
    return (
      <Touchable
        style={{ paddingLeft: 10, marginBottom: 10 }}
        onPress={onPressPost}
      >
        {post.content.length !== 0 && (
          <Text style={{ marginBottom: 10 }} numberOfLines={2}>
            {post.content}
          </Text>
        )}
        {this._renderTime()}
      </Touchable>
    );
  };
  _renderTime = () => {
    const { post } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 10,
          borderBottomWidth: 2,
          borderColor: this.tintColor,
        }}
      >
        <Text style={styles.dateTime}>
          {this.dateFormatter.getHappenedAt(post.precision)}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>
          {this.dateFormatter.fromNow(post.precision)}
        </Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dateTime: {
    fontSize: 18,
  },
});

export default Card;
