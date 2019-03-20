import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
  Text,
  Touchable,
  WeatherInfo,
  ImageSwiper,
  flattenStyles,
} from '../../../../re-kits';
import { base, curried } from '../../../utils';
const { Styles, colors, DateFormatter } = base;
import UserInfoBar from './UserInfoBar';
import BottomInfoBar from './BottomInfoBar';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedWrapper } from '../../../../re-kits/animationEasy';
import * as Animatable from 'react-native-animatable';
import { get } from 'lodash';
const AnimatableBottomInfo = Animatable.createAnimatableComponent(
  BottomInfoBar,
);
const AnimatableWeacherInfo = Animatable.createAnimatableComponent(WeatherInfo);
const cardWidth = base.SCREEN_WIDTH - 20 - 20;
const cardHeight = cardWidth - 60;
const TIME_BAR_HEIGHT = 40;
const GRADIENT_BAR_WIDTH = 10 + 10 + 3;
const extractEmojiNums = post => ({
  numOfComments: post.numOfComments,
  shock: post.shock,
  laugh: post.laugh,
  angry: post.angry,
  vomit: post.vomit,
  nofeeling: post.nofeeling,
});
const diffEmojiChange = (currentPost, nextPost) => {
  const current = extractEmojiNums(currentPost);
  const next = extractEmojiNums(nextPost);
  return !!Object.keys(current).find(key => current[key] !== next[key]);
};
const diffHidden = (currentProps, nextProps) => {
  return currentProps.hidden !== nextProps.hidden;
};
class MainCard extends React.Component {
  constructor(props) {
    super(props);
    this.currentIndex = 0;
  }
  _onPressItem = () => {
    const { onPress } = this.props;
    onPress(this.moveTo);
    // setTimeout(this.moveTo, 0);
  };
  shouldComponentUpdate(nextProps) {
    return (
      diffHidden(this.props, nextProps) ||
      diffEmojiChange(this.props.post, nextProps.post)
    );
  }
  // _onIndexChange = index => (this.currentIndex = index);
  moveTo = () => {
    this._animatedWrapper && this._animatedWrapper.moveTo();
  };
  componentDidUpdate = prevProps => {
    if (!prevProps.hidden && this.props.hidden) {
      this.fadeOut();
    }
    if (prevProps.hidden && !this.props.hidden) {
      this.fadeIn();
    }
  };
  fadeIn = () => {
    this._userInfo.animate('fadeInLeft', 500, 0);
    this._weatherInfo.animate('fadeInRight', 500, 50);
    this._bottomInfo.animate('fadeInRight', 500, 100);
    this._timebar.animate('fadeInLeft', 500, 100);
  };
  fadeOut = () => {
    this._userInfo.animate('fadeOutLeft', 500, 0);
    this._weatherInfo.animate('fadeOutRight', 500, 50);
    this._bottomInfo.animate('fadeOutRight', 500, 100);
    this._timebar.animate('fadeOutLeft', 500, 100);
  };

  render() {
    return (
      <View style={[styles.wrapper]}>
        {this.renderSideLinearBar()}
        <View
          style={{
            paddingTop: 30,
            paddingBottom: TIME_BAR_HEIGHT,
            marginVertical: 10,
          }}
        >
          {this.renderChildren()}
          {this.renderUserInfoBar()}
        </View>
        {this.renderTimeBar()}
      </View>
    );
  }

  renderChildren = () => {
    const { post, hidden } = this.props;
    return (
      <View
        style={[
          {
            backgroundColor: hidden ? 'transparent' : 'white',
          },
          hidden ? undefined : Styles.shadow,
        ]}
      >
        <View style={[styles.container, { opacity: hidden ? 0 : 1 }]}>
          <AnimatedWrapper
            id={`maincard${get(post, 'postId', null)}`}
            type={AnimatedWrapper.types.from}
            ref={r => (this._animatedWrapper = r)}
            renderClonedElement={this._renderClonedElement}
          >
            <View style={[styles.container, { overflow: 'hidden' }]}>
              <ImageSwiper
                imageUrls={post.imageUrls.map(o => o.imageUrl)}
                imageStyle={{ width: cardWidth, height: cardHeight }}
                showsPagination={!hidden}
                onIndexChanged={this._onIndexChange}
              />
            </View>
          </AnimatedWrapper>
        </View>
        {this._renderBottomBar()}
        {this._renderText()}
        {this.renderWeather()}
      </View>
    );
  };
  _renderText = () => {
    const { post } = this.props;
    if (post.content.length <= 0) {
      return null;
    }
    return (
      <Touchable
        onPress={this._onPressItem}
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          height: 60,
        }}
      >
        <Text numberOfLines={2}>{post.content}</Text>
      </Touchable>
    );
  };
  _renderClonedElement = style => {
    const { post } = this.props;
    const uri = get(post, `imageUrls[${this.currentIndex}].imageUrl`, '');
    return (
      <Animated.Image
        style={flattenStyles(styles.container, style)}
        source={{ uri }}
      />
    );
  };
  renderWeather = () => {
    const { post } = this.props;
    return (
      <AnimatableWeacherInfo
        useNativeDriver={true}
        ref={r => (this._weatherInfo = r)}
        weather={post.weatherInfo.weather}
        temperature={post.weatherInfo.temperature}
        style={{ position: 'absolute', right: 0, top: 0 }}
      />
    );
  };
  renderSideLinearBar = () => {
    const { gradientColors } = this.props;
    return (
      <View style={{ marginHorizontal: 10 }}>
        <LinearGradient style={{ width: 3, flex: 1 }} colors={gradientColors} />
      </View>
    );
  };
  renderUserInfoBar = () => {
    const { onPressAvatar, post } = this.props;
    return (
      <Animatable.View
        style={styles.headerBar}
        ref={r => (this._userInfo = r)}
        useNativeDriver={true}
      >
        <UserInfoBar
          onPressAvatar={onPressAvatar}
          username={post.username}
          avatar={post.avatar}
        />
      </Animatable.View>
    );
  };

  _renderBottomBar = () => {
    const { onPressComment, onPressEmoji, post } = this.props;
    return (
      <AnimatableBottomInfo
        useNativeDriver={true}
        ref={r => (this._bottomInfo = r)}
        onPressComment={onPressComment}
        onPressEmoji={onPressEmoji}
        nums={extractEmojiNums(post)}
      />
    );
  };

  renderTimeBar = () => {
    const { post } = this.props;
    const happenedAt = new DateFormatter(post.happenedAt);
    return (
      <Animatable.View
        useNativeDriver={true}
        ref={r => (this._timebar = r)}
        style={styles.timeBarContainer}
      >
        {this.renderTimeBarDot()}
        <Text style={styles.dateTime}>{happenedAt.yearMonthDayTime()}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>
          {happenedAt.fromNow()}
        </Text>
      </Animatable.View>
    );
  };
  renderTimeBarDot = () => {
    return (
      <View style={styles.dotWrapper}>
        <View style={styles.dotKernel} />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 10,
    flexDirection: 'row',
  },
  container: {
    width: cardWidth,
    height: cardHeight,
  },
  headerBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    elevation: 2,
    backgroundColor: 'transparent',
  },
  dateTime: {
    fontSize: 18,
    marginLeft: 12,
  },
  dotWrapper: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotKernel: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  timeBarContainer: {
    position: 'absolute',
    height: TIME_BAR_HEIGHT,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    marginLeft: GRADIENT_BAR_WIDTH / 2 - 7.5,
    alignItems: 'center',
  },
});

export default MainCard;
