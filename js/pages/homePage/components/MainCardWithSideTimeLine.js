import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Image,
  InfiniteText,
  Text,
  Touchable,
  Assets,
  WeatherInfo,
  ImageSwiper,
} from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles, colors, DateFormatter } = base;
import UserInfoBar from './UserInfoBar';
import BottomInfoBar from './BottomInfoBar';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedWrapper } from '../../../../re-kits/animationEasy';
import * as Animatable from 'react-native-animatable';
const AnimatableBottomInfo = Animatable.createAnimatableComponent(
  BottomInfoBar,
);
const AnimatableWeacherInfo = Animatable.createAnimatableComponent(WeatherInfo);
const cardWidth = base.SCREEN_WIDTH - 20 - 20;
const cardHeight = cardWidth - 40;
const TIME_BAR_HEIGHT = 40;
const GRADIENT_BAR_WIDTH = 10 + 10 + 3;
class MainCard extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     hidden: false,
  //   };
  // }
  _onPressItem = () => {
    const { onPress } = this.props;
    onPress();
    this.moveTo();
  };

  moveTo = () => {
    this._animatedWrapper && this._animatedWrapper.moveTo();
  };
  componentDidUpdate = prevProps => {
    if (!prevProps.hidden && this.props.hidden) {
      // this.setState({
      //   hidden:true
      // })
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
          {this.renderWeather()}
          {this.renderUserInfoBar()}
        </View>
        {this.renderTimeBar()}
      </View>
    );
  }

  renderChildren = () => {
    const { cardId, hidden, post } = this.props;
    return (
      <View style={[{ backgroundColor: 'white' }, Styles.shadow]}>
        <View style={[styles.container, { opacity: hidden ? 0 : 1 }]}>
          <AnimatedWrapper
            id={`maincard${cardId}`}
            type={AnimatedWrapper.types.from}
            ref={r => (this._animatedWrapper = r)}
          >
            <ImageSwiper
              imageUrls={post.imageUrls}
              style={{ width: cardWidth, height: cardHeight }}
              imageStyle={{ width: cardWidth, height: cardHeight }}
            />
          </AnimatedWrapper>
          {this.renderBottomBar()}
        </View>

        <Touchable
          onPress={this._onPressItem}
          style={{
            // backgroundColor: 'red',
            paddingVertical: 5,
            paddingHorizontal: 10,
            height: 50,
          }}
        >
          <Text numberOfLines={2}>{post.content}</Text>
        </Touchable>
      </View>
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
        style={{ position: 'absolute', right: 0, top: 30 }}
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
          weatherInfo={post.weatherInfo}
        />
      </Animatable.View>
    );
  };

  renderBottomBar = () => {
    const { onPressComment, onPressEmoji, post } = this.props;
    return (
      <AnimatableBottomInfo
        useNativeDriver={true}
        ref={r => (this._bottomInfo = r)}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}
        onPressComment={onPressComment(post.postId)}
        onPressEmoji={onPressEmoji(post.postId)}
        nums={{
          numOfComments: post.numOfComments,
          shock: post.shock,
          laugh: post.laugh,
          angry: post.angry,
          vomit: post.vomit,
          nofeeling: post.nofeeling,
        }}
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
        style={{
          position: 'absolute',
          height: TIME_BAR_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          // backgroundColor: 'red',
          marginLeft: GRADIENT_BAR_WIDTH / 2 - 7.5,
          alignItems: 'center',
        }}
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
MainCard.propTypes = {};

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
    right: 0,
    marginHorizontal: 0,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  content: {
    fontSize: 18,
    color: colors.white,
    fontWeight: '200',
    lineHeight: 25,
    textShadowColor: colors.lightGrey,
    textShadowOffset: {
      width: 1.5,
      height: 0,
    },
    textShadowRadius: 5,
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
});

export default MainCard;
