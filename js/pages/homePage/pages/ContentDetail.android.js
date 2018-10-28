import React, { Component } from 'react';
import { StyleSheet, View, Animated, ScrollView } from 'react-native';
import {
  Button,
  Image,
  Text,
  Assets,
  WeatherInfo,
  CommentBar,
} from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import UserInfoBar from '../components/UserInfoBar';
import BottomInfoBar from '../components/BottomInfoBar';

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
class ContentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
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

  componentDidMount() {}
  componentWillUnmount() {
    // this.timer1 && clearTimeout(this.timer1);
  }

  open() {
    const { openModal, show } = this.props;
    if (show) {
      return;
    }
    openModal();
    this.animationOpen.start(() => {
      this.setState({
        animating: false,
      });
    });
  }

  close() {
    const { closeModal, show } = this.props;
    if (!show) {
      return;
    }
    this.animationOpen.stop();
    this.setState({
      animating: true,
    });
    this.animationClose.start(() => {
      this._nscrollY.setValue(0);
      closeModal();
    });
  }

  render() {
    const {
      show,
      imagePosition,
      contentPosition,
      userInfoPosition,
    } = this.props;
    const { animating } = this.state;
    if (show === false) {
      return null;
    }
    let opacity = this.animationState.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0, 0, 1],
    });
    let imageWidth = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [
        imagePosition.width,
        imagePosition.width,
        imagePosition.width,
        image_width,
      ],
    });
    let imageHeight = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [
        imagePosition.height,
        imagePosition.height,
        imagePosition.height,
        image_height,
      ],
    });
    let imageLeft = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [imagePosition.x, imagePosition.x, imagePosition.x, 0],
    });
    let imageTop = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [
        imagePosition.y,
        imagePosition.y - 20,
        imagePosition.y - 20,
        0,
      ],
    });

    let userInfoLeft = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [
        userInfoPosition.x,
        userInfoPosition.x,
        userInfoPosition.x,
        0,
      ],
    });
    let userInfoTop = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [
        userInfoPosition.y,
        userInfoPosition.y - 20,
        image_height + 10,
        // userInfoPosition.y - 20,
        image_height + 10,
      ],
    });
    let contentWidth = this.animationState.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [
        contentPosition.width,
        contentPosition.width,
        content_width,
      ],
    });
    let contentHeight = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [contentPosition.height, SCREEN_HEIGHT - image_height],
    });
    let contentLeft = this.animationState.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [contentPosition.x, contentPosition.x, 20],
    });
    let contentTop = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [
        contentPosition.y,
        contentPosition.y - 20,
        contentPosition.y - 20,
        image_height + 10 + 60 + 5,
      ],
    });
    let contentColor = this.animationState.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [
        'rgba(250,250,250,1)',
        'rgba(250,250,250,1)',
        'rgba(97,97,97,1)',
      ],
    });
    let contentNumberOfLines = this.animationState.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [5, 5, 9999],
    });
    let containerBackgroundColor = this.animationState.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [
        'rgba(250,250,250,0)',
        'rgba(250,250,250,0)',
        'rgba(250,250,250,1)',
      ],
    });
    let scale = this.animationState.interpolate({
      inputRange: [0, 0.1, 0.8, 1],
      outputRange: [1, 1, 1.1, 1],
    });
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
      <Animated.View
        style={[Styles.absolute, { backgroundColor: containerBackgroundColor }]}
      >
        <Animated.ScrollView
          style={[styles.container]}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT }}
          // stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._nscrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              minHeight: SCREEN_HEIGHT,
              minWidth: SCREEN_WIDTH,
            }}
          >
            <View
              style={{
                zIndex: animating ? 0 : 1,
              }}
            >
              <Animated.Image
                source={Assets.bk1.source}
                style={[
                  animating
                    ? {
                        position: 'absolute',
                        width: imageWidth,
                        height: imageHeight,
                        left: imageLeft,
                        top: imageTop,
                        transform: [{ scale: scale }, { perspective: 1000 }],
                      }
                    : {
                        width: image_width,
                        height: image_height,
                        transform: [
                          {
                            scale: imgScale,
                          },
                          {
                            translateY: imageY,
                          },
                          { perspective: 1000 },
                        ],
                      },
                ]}
              />
            </View>
            <Animated.View
              style={[
                animating
                  ? {
                      position: 'absolute',
                      left: userInfoLeft,
                      top: userInfoTop,
                    }
                  : {
                      zIndex: animating ? 1 : 0,
                      marginTop: 10,
                    },
              ]}
            >
              <UserInfoBar />
            </Animated.View>
            <Animated.View
              style={[
                animating
                  ? {
                      position: 'absolute',
                      width: contentWidth,
                      height: contentHeight,
                      left: contentLeft,
                      top: contentTop,
                      alignSelf: 'center',
                      // transform: [{ scale: scale }],
                    }
                  : {
                      zIndex: animating ? 1 : 0,
                      alignSelf: 'center',
                      width: content_width,
                      marginTop: 5,
                    },
              ]}
            >
              <Animated.Text
                style={[
                  styles.content,
                  {
                    zIndex: 2,
                    color: contentColor,
                  },
                ]}
                numberOfLines={animating ? 5 : 1000}
              >
                {'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.' +
                  'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.' +
                  'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.' +
                  'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.'}
              </Animated.Text>
            </Animated.View>
          </View>
        </Animated.ScrollView>
        <CommentBar
          style={{
            position: 'absolute',
            bottom: 0,
            opacity: animating ? 0 : 1,
          }}
        />
        <Animated.View
          style={{
            height: PADDING_TOP + 44,
            backgroundColor: 'rgba(33,33,33,0.4)',
            opacity: headerOpacity,
            transform: [
              {
                translateY: headerY,
              },
              { perspective: 1000 },
            ],
          }}
        />
        <Animated.View
          style={[
            styles.close,
            {
              opacity: opacity,
            },
          ]}
        >
          <Image
            source={Assets.close.source}
            onPress={() => {
              this.close();
            }}
            style={{ alignSelf: 'center' }}
            tintColor={colors.white}
          />
        </Animated.View>
        <WeatherInfo
          weather={'sunny'}
          temperature={25}
          style={{
            opacity: animating ? 0 : 1,
            position: 'absolute',
            right: 0,
            top: PADDING_TOP,
          }}
        />
      </Animated.View>
    );
  }
}
ContentDetail.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'transparent',
  },
  content: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '200',
    lineHeight: 25,
    flex: 1,
    textShadowRadius: 5,
  },
  close: {
    position: 'absolute',
    top: PADDING_TOP + 5,
    left: 15,
  },
});

export default ContentDetail;
