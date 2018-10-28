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
} from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles, colors, DateFormatter } = base;
import UserInfoBar from './UserInfoBar';
import TimeBar from './TimeBar';
import BottomInfoBar from './BottomInfoBar';
import LinearGradient from 'react-native-linear-gradient';
const cardWidth = base.SCREEN_WIDTH - 20 - 20;
const cardHeight = base.SCREEN_WIDTH * 0.618;
const TIME_BAR_HEIGHT = 40;
const GRADIENT_BAR_WIDTH = 10 + 10 + 3;
class MainCard extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}

  _onPressItem = () => {
    const { onPress, cardId } = this.props;
    let imagePosition = {};
    let contentPosition = {};
    let userInfoPosition = {};
    this._image.measure((x, y, width, height, pageX, pageY) => {
      imagePosition = {
        width: width,
        height: height,
        x: pageX,
        y: pageY,
      };
      this._content.measure((x2, y2, width2, height2, pageX2, pageY2) => {
        contentPosition = {
          width: width2,
          height: height2,
          x: pageX2,
          y: pageY2,
        };

        this._userInfoBar.measure((x3, y3, width3, height3, pageX3, pageY3) => {
          userInfoPosition = {
            width: width3,
            height: height3,
            x: pageX3,
            y: pageY3,
          };
          onPress(imagePosition, contentPosition, userInfoPosition, cardId);
        });
      });
    });
  };

  render() {
    const {
      onPress,
      hidden,
      onPressComment,
      onPressAvatar,
      onPressEmoji,
      post,
      gradientColors,
    } = this.props;
    let coverImageUrl = post.imageUrls[0];
    const happenedAt = new DateFormatter(post.happenedAt);
    return (
      <View style={[styles.wrapper]}>
        <View style={{ marginHorizontal: 10 }}>
          <LinearGradient
            style={{ width: 3, flex: 1 }}
            colors={gradientColors}
          />
        </View>
        <View
          style={{
            paddingTop: 30,
            paddingBottom: TIME_BAR_HEIGHT,
            marginVertical: 10,
            alignItems: 'center',
            justifyContent: 'flex-end',
            opacity: hidden ? 0 : 1,
            // backgroundColor: 'yellow',
          }}
        >
          <Touchable onPress={this._onPressItem}>
            <View
              ref={r => (this._image = r)}
              style={[styles.container, Styles.shadow]}
            >
              <Image
                source={{ uri: coverImageUrl }}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                }}
                blur={true}
              />
              <WeatherInfo
                weather={post.weatherInfo.weather}
                temperature={post.weatherInfo.temperature}
                style={{ position: 'absolute', right: 0, top: 0 }}
              />
              <View
                style={[
                  Styles.absolute,
                  {
                    marginTop: 0,
                    justifyContent: 'center',
                    marginLeft: 20,
                    marginRight: 10,
                    // backgroundColor:'red'
                  },
                ]}
              >
                <View ref={r => (this._content = r)}>
                  <Text
                    style={[
                      styles.content,
                      !coverImageUrl && { color: colors.pureBlack },
                    ]}
                    numberOfLines={5}
                  >
                    {post.content}
                  </Text>
                </View>
              </View>
            </View>
          </Touchable>
          <BottomInfoBar
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: TIME_BAR_HEIGHT,
            }}
            onPressComment={() => {
              onPressComment(post.postId);
            }}
            onPressEmoji={emoji => onPressEmoji(emoji, post.postId)}
            nums={{
              numOfComments: post.numOfComments,
              shock: post.shock,
              laugh: post.laugh,
              angry: post.angry,
              vomit: post.vomit,
              nofeeling: post.nofeeling,
            }}
          />
          <View
            ref={r => {
              this._userInfoBar = r;
            }}
            style={styles.headerBar}
          >
            <UserInfoBar
              onPressAvatar={onPressAvatar}
              username={post.username}
              avatar={post.avatar}
              // style={  styles.headerBar}
            />
          </View>
        </View>
        <View
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
        </View>
      </View>
    );
  }
  renderTimeBarDot = () => {
    return (
      <View
        style={{
          width: 15,
          height: 15,
          borderRadius: 7.5,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: 'white',
          }}
        />
      </View>
    );
  };
}
MainCard.propTypes = {};

const styles = StyleSheet.create({
  wrapper: {
    // width: cardWidth,
    // height: cardHeight + 30,
    // marginVertical: 10,
    marginRight: 10,
    flexDirection: 'row',
  },
  container: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: 'white',
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
});

export default MainCard;
