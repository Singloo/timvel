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
const { Styles, colors } = base;
import UserInfoBar from './UserInfoBar';
import TimeBar from './TimeBar';
import BottomInfoBar from './BottomInfoBar';
const cardWidth = base.SCREEN_WIDTH - 20;
const cardHeight = base.SCREEN_WIDTH * 0.618;
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

    // this._content.measure((x, y, width, height, pageX, pageY) => {
    //     contentPosition = {
    //       width,
    //       height,
    //       x: pageX,
    //       y: pageY,
    //     };
    //   });
  };

  render() {
    const {
      onPress,
      hidden,
      onPressComment,
      onPressAvatar,
      onPressEmoji,
      post,
    } = this.props;
    let coverImageUrl = post.imageUrls[0];
    return (
      <View style={[styles.wrapper]}>
        <TimeBar />
        <View
          style={{
            paddingTop: 30,
            alignItems: 'center',
            justifyContent: 'flex-end',
            opacity: hidden ? 0 : 1,
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
            style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
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
      </View>
    );
  }
}
MainCard.propTypes = {};

const styles = StyleSheet.create({
  wrapper: {
    // width: cardWidth,
    // height: cardHeight + 30,
    marginVertical: 10,
    marginHorizontal: 10,
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
});

export default MainCard;