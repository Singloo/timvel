import React, { Component } from 'react';
import { StyleSheet, View, Animated, ScrollView, Easing } from 'react-native';
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
import { SharedElement } from 'react-native-motion';
import { AnimatedWrapper } from '../../../../re-kits/animationEasy';
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
      animating: false,
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
  componentWillReceiveProps(nextProps) {
    // if (nextProps.currentPost !== null && this.props.currentPost === null) {
    //   this.sharedElement.moveToDestination();
    // }
  }
  componentDidUpdate(prevProps, prevState) {}
  componentDidMount() {}
  componentWillUnmount() {
    // this.timer1 && clearTimeout(this.timer1);
  }

  open() {
    const { modalController, show } = this.props;
    if (show) {
      return;
    }
    modalController(true)();
    // this.animationOpen.start(() => {
    //   this.setState({
    //     animating: false,
    //   });
    // });
  }

  close() {
    const { modalController, show } = this.props;
    if (!show) {
      return;
    }
    // this.animationOpen.stop();
    // this.setState({
    //   animating: true,
    // });
    // this.animationClose.start(() => {
    //   this._nscrollY.setValue(0);
    modalController(false)();
    // });
  }

  _onStart = () => {
    this.setState({
      animating: true,
    });
  };
  _onEnd = () => {
    this.setState({
      animating: false,
    });
  };

  render() {
    const { show, currentPost } = this.props;
    const { animating } = this.state;
    if (!show) {
      return null;
    }
    return (
      <Animated.View
        style={[Styles.absolute, { backgroundColor: 'transparent' }]}
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
          {this.renderImage()}
          {/* <UserInfoBar />
          {this.renderContent()} */}
        </Animated.ScrollView>
        <CommentBar
          style={{
            position: 'absolute',
            bottom: 0,
            opacity: animating ? 0 : 1,
          }}
        />
        {this.renderHeader()}
      </Animated.View>
    );
  }

  renderImage = () => {
    const { cardId, onSharedElementMovedToSource } = this.props;
    const { animating } = this.state;
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
    return (
      <AnimatedWrapper
        id={`maincard${cardId}`}
        type={AnimatedWrapper.types.to}
        onStart={this._onStart}
        onEnd={this._onEnd}
      >
        <View>
          <Animated.Image
            source={Assets.bk1.source}
            style={[
              {
                width: image_width,
                height: image_height,
                zIndex: 2,
                opacity: animating ? 0 : 1,
                transform: [
                  {
                    scale: imgScale,
                  },
                  {
                    translateY: imageY,
                  },
                ],
              },
            ]}
          />
        </View>
      </AnimatedWrapper>
    );
  };

  renderContent = () => {
    return (
      <Animated.Text
        style={[
          styles.content,
          {
            zIndex: 2,
            color: 'black',
            // color: contentColor,
          },
        ]}
        // numberOfLines={animating ? 5 : 1000}
      >
        {'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.' +
          'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.' +
          'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.' +
          'Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light,\n\nThough wise men at their end know dark is right,\nBecause their words had forked no lightning they\nDo not go gentle into that good night.'}
      </Animated.Text>
    );
  };

  renderHeader = () => {
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
      <View
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
          onPress={() => {
            this.close();
          }}
          style={{ marginLeft: 20 }}
          tintColor={colors.white}
          size={'small'}
        />
        <WeatherInfo
          weather={'sunny'}
          temperature={25}
          style={
            {
              // opacity: animating ? 0 : 1,
            }
          }
        />
      </View>
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
    color: colors.white,
    fontWeight: '200',
    lineHeight: 25,
    flex: 1,
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
