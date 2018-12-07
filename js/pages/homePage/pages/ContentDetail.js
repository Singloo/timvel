import React, { Component } from 'react';
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
} from '../../../../re-kits';
import { base } from '../../../utils';
import UserInfoBar from '../components/UserInfoBar';
import BottomInfoBar from '../components/BottomInfoBar';
import { AnimatedWrapper } from '../../../../re-kits/animationEasy';
import * as Animatable from 'react-native-animatable';
const AnimatableUserInfoBar = Animatable.createAnimatableComponent(UserInfoBar);
const AnimatableCommentBar = Animatable.createAnimatableComponent(CommentBar);
const AnimatedImageSwiper = Animated.createAnimatedComponent(ImageSwiper);
const {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  colors,
  Styles,
  PADDING_TOP,
  isIOS,
  TAB_BAR_HEIGHT,
} = base;
let image_height = SCREEN_WIDTH * 0.6;
let image_width = SCREEN_WIDTH;
let content_width = SCREEN_WIDTH - 40;
let scrollY = image_height - PADDING_TOP - 44;
const goingToOpen = (prev, curr) => {
  return !prev.show && curr.show;
};
const goingToClose = (prev, curr) => {
  return prev.show && !curr.show;
};
const sleep = duration => {
  return new Promise(resolve => setTimeout(resolve, duration));
};
class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currentPost: {},
      cardId: null,
    };
    this.goingToShow = true;
    this.animationState = new Animated.Value(0);
    this.animationOpen = Animated.timing(this.animationState, {
      toValue: 1,
      duration: 600,
    });
    this.animationClose = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 400,
    });
    this._nscrollY = new Animated.Value(0);
  }
  componentWillMount() {}
  componentDidUpdate(prevProps, prevState) {
    if (goingToOpen(prevProps, this.props)) {
      const { currentPost, cardId } = this.props;
      this.setState({
        show: true,
        currentPost,
        cardId,
      });
    }
    if (goingToClose(prevProps, this.props)) {
      //do something
      this.setState({
        show: false,
        cardId: null,
        currentPost: {},
      });
    }
  }
  componentDidMount() {}
  componentWillUnmount() {}

  _onPressClose = async () => {
    const { modalController, onStart } = this.props;
    this._fadeAnimation();
    await sleep(350);
    onStart();
    this._anmiatedWrapper.moveBack(() => {
      modalController(false)();
    });
  };
  _onStart = () => {
    // if (!this.goingToShow) {
    //   this.goingToShow = true;
    // }
    const { onStart } = this.props;
    onStart();
  };

  _onEnd = () => {
    // if (!this.goingToShow) {
    //   return;
    // }
    const { onEnd } = this.props;
    // this.goingToShow = false;
    onEnd();
  };
  _fadeAnimation = () => {
    this._commentBar.animate('fadeOutDown', 500, 0);
    this._header.animate('fadeOutUp', 500, 0);
    this._content.animate('fadeOutDown', 500, 50);
    this._userInfo.animate('fadeOutDown', 500, 100);
  };

  render() {
    const { isAnimating } = this.props;
    const { show } = this.state;
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
          style={[styles.container]}
          scrollEventThrottle={8}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._nscrollY } } }],
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
    const { cardId, currentPost } = this.state;
    const { isAnimating, onEnd } = this.props;
    //after animation
    let imgScale = this._nscrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    let imageY = this._nscrollY.interpolate({
      inputRange: [-25, 0, scrollY / 0.4],
      outputRange: [-13, 0, scrollY],
      // extrapolateLeft: 'clamp',
    });
    const ImageComp =
      currentPost.imageUrls.length <= 1 ? Animated.Image : AnimatedImageSwiper;
    const imageProps =
      currentPost.imageUrls.length <= 1
        ? {
            source: { uri: currentPost.imageUrls[0] },
            style: [
              {
                width: image_width,
                height: image_height,
                opacity: isAnimating ? 0 : 1,
                transform: [
                  {
                    scale: imgScale,
                  },
                  {
                    translateY: imageY,
                  },
                ],
              },
            ],
          }
        : {
            imageUrls: currentPost.imageUrls,
            imageStyle: { width: SCREEN_WIDTH, height: 200 },
            style: [
              {
                opacity: isAnimating ? 0 : 1,
                transform: [
                  {
                    scale: imgScale,
                  },
                  {
                    translateY: imageY,
                  },
                ],
              },
            ],
          };
    return (
      <AnimatedWrapper
        ref={r => (this._anmiatedWrapper = r)}
        id={`maincard${cardId}`}
        type={AnimatedWrapper.types.to}
        onStart={this._onStart}
        onEnd={this._onEnd}
        animationProps={{
          easing: Easing.back(),
        }}
      >
        <ImageComp {...imageProps} />
      </AnimatedWrapper>
    );
  };

  renderUserInfo = () => {
    return (
      <AnimatableUserInfoBar
        ref={r => (this._userInfo = r)}
        animation={'fadeInUp'}
        delay={300}
        useNativeDriver={true}
        // style={{ zIndex: 1 }}
      />
    );
  };
  renderContent = () => {
    const { currentPost } = this.state;
    return (
      <Animatable.Text
        ref={r => (this._content = r)}
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
        ref={r => (this._commentBar = r)}
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
    let headerY = this._nscrollY.interpolate({
      inputRange: [0, scrollY, scrollY + (PADDING_TOP + 44)],
      outputRange: [-(PADDING_TOP + 44), -(PADDING_TOP + 44), 0],
      extrapolate: 'clamp',
    });
    let headerOpacity = this._nscrollY.interpolate({
      inputRange: [0, scrollY, scrollY + (PADDING_TOP + 44)],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <Animatable.View
        animation={'fadeInDown'}
        ref={r => (this._header = r)}
        useNativeDriver={true}
        delay={100}
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          },
          {
            height: PADDING_TOP + 44,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: PADDING_TOP,
            justifyContent: 'space-between',
          },
        ]}
      >
        <Animated.View
          style={{
            height: PADDING_TOP + 44,
            backgroundColor: 'rgba(33,33,33,0.4)',
            opacity: headerOpacity,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform: [
              {
                translateY: headerY,
              },
            ],
          }}
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
    // flex: 1,
    textShadowRadius: 5,
    marginHorizontal: 10,
  },
  close: {
    position: 'absolute',
    top: PADDING_TOP + 5,
    left: 15,
  },
});

export default ContentDetail;
