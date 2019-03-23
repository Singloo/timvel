import * as React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  Easing,
  LayoutAnimation,
} from 'react-native';
import {
  Button,
  Image,
  Text,
  Assets,
  WeatherInfo,
  CommentBar,
  ImageSwiper,
  NAV_BAR_HEIGHT_FULL,
  PADDING_TOP_FULL,
  flattenStyles,
} from '../../../../re-kits';
import {
  SCREEN_WIDTH,
  colors,
  Styles,
  TAB_BAR_HEIGHT,
  curried,
  extractUserFromPost,
} from '../../../utils';
import UserInfoBar from '../components/UserInfoBar';
import BottomInfoBar from '../components/BottomInfoBar';
import { AnimatedWrapper } from '../../../../re-kits/animationEasy';
import * as Animatable from 'react-native-animatable';
import { get } from 'lodash';
const AnimatableUserInfoBar = Animatable.createAnimatableComponent(UserInfoBar);
const AnimatableCommentBar = Animatable.createAnimatableComponent(CommentBar);
const AnimatedImageSwiper = Animated.createAnimatedComponent(ImageSwiper);
let image_height = SCREEN_WIDTH * 0.6;
let image_width = SCREEN_WIDTH;
let content_width = SCREEN_WIDTH - 40;
let scrollY = image_height - PADDING_TOP_FULL - 44;
const goingToOpen = (prev, curr) => {
  return !prev.show && curr.show;
};
const goingToClose = (prev, curr) => {
  return prev.show && !curr.show;
};
const sleep = duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

class ContentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentPost: {},
      currentCardId: null,
      nscrollY: new Animated.Value(0),
      isAnimating: true,
    };
    this.goingToShow = true;
    this._content = React.createRef();
    this._commentBar = React.createRef();
    this._userInfo = React.createRef();
    this._header = React.createRef();
    this.subscriptions;
    this.currentIndex = 0;
  }
  // componentWillMount() {}
  componentDidUpdate(prevProps) {
    if (goingToOpen(prevProps, this.props)) {
      const { currentPost } = this.props;
      this._subscribeToAnimatedWrapperEvent(currentPost);
      this.setState({
        show: true,
        currentPost,
      });
    }
    if (goingToClose(prevProps, this.props)) {
      //do something
      this.setState({
        show: false,
        currentPost: {},
      });
      this._clearSubscriptions();
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}
  _subscribeToAnimatedWrapperEvent = currentPost => {
    this.subscriptions = AnimatedWrapper.subscribe(
      {
        id: `maincard${get(currentPost, 'postId', null)}`,
      },
      {
        onMove: curried(this._setIsAnimating)(true),
        onEnd: curried(this._setIsAnimating)(false),
      },
    );
  };
  _onPressAvatar = user => {
    this.props.navigation.navigate({
      routeName: 'strangerProfile',
      params: {
        user: user,
      },
    });
  };
  _onIndexChange = index => (this.currentIndex = index);
  _clearSubscriptions = () => {
    if (typeof this.subscriptions === 'object') {
      Object.keys(this.subscriptions).forEach(key => {
        this.subscriptions[key] &&
          this.subscriptions[key].unsubscribe &&
          this.subscriptions[key].unsubscribe();
      });
      this.subscriptions = undefined;
    }
  };
  _setIsAnimating = bool => {
    if (bool === this.state.isAnimating) {
      return;
    }
    this.setState({
      isAnimating: bool,
    });
  };
  _onPressClose = async () => {
    const { modalController, onStart } = this.props;
    this._fadeAnimation();
    await sleep(350);
    onStart();
    this._anmiatedWrapper.moveBack(curried(modalController)(false));
  };
  _onStart = () => {
    const { onStart } = this.props;
    onStart();
  };

  _onEnd = () => {
    const { onEnd } = this.props;
    onEnd();
  };
  _fadeAnimation = () => {
    this._commentBar.current.animate('fadeOutDown', 500, 0);
    this._header.current.animate('fadeOutUp', 500, 0);
    this._content.current.animate('fadeOutDown', 500, 50);
    this._userInfo.current.animate('fadeOutDown', 500, 100);
  };

  render() {
    const {} = this.props;
    const { show, isAnimating } = this.state;
    if (!show) {
      return null;
    }
    return (
      <Animated.View
        style={[
          Styles.absolute,
          { backgroundColor: isAnimating ? 'transparent' : 'white' },
        ]}
      >
        <Animated.ScrollView
          style={styles.container}
          scrollEventThrottle={8}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.nscrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <View style={{ zIndex: 2 }}>{this.renderImage()}</View>
          <View style={{ zIndex: 1 }}>
            {this.renderUserInfo()}
            {this.renderContent()}
          </View>
        </Animated.ScrollView>
        {this.renderCommentBar()}
        {this.renderHeader()}
      </Animated.View>
    );
  }

  renderImage = () => {
    const { currentPost, isAnimating } = this.state;
    const {} = this.props;
    //after animation
    const scale = this.state.nscrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    const translateY = this.state.nscrollY.interpolate({
      inputRange: [-25, 0, scrollY / 0.4],
      outputRange: [-13, 0, scrollY],
      // extrapolateLeft: 'clamp',
    });
    const transform = [{ scale }, { translateY }];
    const opacity = isAnimating ? 0 : 1;
    const ImageComp =
      currentPost.imageUrls.length <= 1 ? Animated.Image : AnimatedImageSwiper;
    const imageProps =
      currentPost.imageUrls.length <= 1
        ? {
            source: { uri: get(currentPost, 'imageUrls[0].imageUrl', '') },
            style: {
              width: image_width,
              height: image_height,
              opacity,
              transform,
            },
          }
        : {
            imageUrls: get(currentPost, 'imageUrls', []).map(o => o.imageUrl),
            imageStyle: { width: SCREEN_WIDTH, height: 200 },
            style: {
              opacity,
              width: image_width,
              height: image_height,
              transform,
            },
            onIndexChange: this._onIndexChange,
          };
    return (
      <AnimatedWrapper
        ref={r => (this._anmiatedWrapper = r)}
        id={`maincard${get(currentPost, 'postId', null)}`}
        type={AnimatedWrapper.types.to}
        // onStart={this._onStart}
        // onEnd={this._onEnd}
        renderClonedElement={this._renderClonedElement}
        animationProps={{
          easing: Easing.back(),
        }}
      >
        <View style={{ opacity }}>
          <ImageComp {...imageProps} />
        </View>
      </AnimatedWrapper>
    );
  };
  _renderClonedElement = style => {
    const { currentPost } = this.props;
    const uri = get(
      currentPost,
      `imageUrls[${this.currentIndex}].imageUrl`,
      '',
    );
    return (
      <Animated.Image
        style={flattenStyles(
          { width: image_width, height: image_height },
          style,
        )}
        source={{ uri }}
      />
    );
  };
  renderUserInfo = () => {
    const { currentPost } = this.props;
    if (!currentPost) {
      return null;
    }
    return (
      <AnimatableUserInfoBar
        ref={this._userInfo}
        animation={'fadeInUp'}
        delay={300}
        useNativeDriver={true}
        onPressAvatar={curried(this._onPressAvatar)(
          extractUserFromPost(currentPost),
        )}
        username={currentPost.username}
        avatar={currentPost.avatar}
        // style={{ zIndex: 1 }}
      />
    );
  };
  renderContent = () => {
    const { currentPost } = this.state;
    return (
      <Animatable.Text
        ref={this._content}
        animation={'fadeInUp'}
        // useNativeDriver={true}
        delay={350}
        style={[styles.content]}
      >
        {currentPost.content}
      </Animatable.Text>
    );
  };

  renderCommentBar = () => {
    return (
      <AnimatableCommentBar
        ref={this._commentBar}
        animation={'fadeInUp'}
        useNativeDriver={true}
        delay={400}
        style={{
          position: 'absolute',
          bottom: 0,
        }}
      />
    );
  };

  renderHeader = () => {
    const { currentPost } = this.state;
    let translateY = this.state.nscrollY.interpolate({
      inputRange: [0, scrollY, scrollY + NAV_BAR_HEIGHT_FULL],
      outputRange: [-NAV_BAR_HEIGHT_FULL, -NAV_BAR_HEIGHT_FULL, 0],
      extrapolate: 'clamp',
    });
    let opacity = this.state.nscrollY.interpolate({
      inputRange: [0, scrollY, scrollY + NAV_BAR_HEIGHT_FULL],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    const transform = [{ translateY }];
    return (
      <Animatable.View
        animation={'fadeInDown'}
        ref={this._header}
        useNativeDriver={true}
        delay={100}
        style={styles.headerBarContainer}
      >
        <Animated.View
          style={[
            styles.headrBarBK,
            {
              opacity,
              transform,
            },
          ]}
        />
        <Image
          source={Assets.close.source}
          onPress={this._onPressClose}
          style={{ marginLeft: 20 }}
          tintColor={colors.white}
          size={'small'}
        />
        <WeatherInfo
          weather={currentPost.weatherInfo.weather}
          temperature={currentPost.weatherInfo.temperature}
        />
      </Animatable.View>
    );
  };
}
ContentDetail.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent',
  },
  content: {
    fontSize: 18,
    color: colors.depGrey,
    fontWeight: '200',
    lineHeight: 25,
    marginTop: 10,
    textShadowRadius: 5,
    marginHorizontal: 10,
  },
  close: {
    position: 'absolute',
    top: PADDING_TOP_FULL + 5,
    left: 15,
  },
  headerBarContainer: {
    height: NAV_BAR_HEIGHT_FULL,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: PADDING_TOP_FULL,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headrBarBK: {
    height: NAV_BAR_HEIGHT_FULL,
    backgroundColor: 'rgba(33,33,33,0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

export default ContentDetail;
