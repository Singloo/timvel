import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { InfiniteText, PADDING_TOP_FULL, Styles } from '../../../../re-kits';
import { SCREEN_WIDTH, colors } from '../../../utils';
import Title from '../../../components/Title';
const width = SCREEN_WIDTH;
const height = 200;
const avatarSize = 80;
const avatarSizeSmall = 30;
const scroll_height = 200 - 44 - PADDING_TOP_FULL;
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }

  render() {
    const translateY = this.props.nScrollY.interpolate({
      inputRange: [0, scroll_height],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });
    const translateX = this.props.nScrollY.interpolate({
      inputRange: [0, scroll_height, 200],
      outputRange: [0, 60, 80],
      extrapolate: 'clamp',
    });

    let containerY = this.props.nScrollY.interpolate({
      inputRange: [-25, 0, scroll_height],
      outputRange: [-18, 0, -(scroll_height - 40)],
      extrapolateRight: 'clamp',
    });
    const transform = [{ translateY }, { translateX }];
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: containerY }],
          },
        ]}
      >
        {this._renderBkImage()}
        {this._renderNavBk()}
        <Animated.View style={[styles.infoContainer, { transform }]}>
          {this._renderAvatar()}
          {this._renderTitleAndUsername()}
        </Animated.View>
      </Animated.View>
    );
  }

  _renderBkImage = () => {
    const { userAvatar } = this.props;
    const scale = this.props.nScrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });
    const transform = [{ scale }];
    return (
      <Animated.Image
        source={{ uri: userAvatar }}
        style={[styles.bkImage, { transform }]}
        resizeMode={'cover'}
      />
    );
  };
  _renderNavBk = () => {
    const backgroundColor = this.props.scrollY.interpolate({
      inputRange: [0, scroll_height - 1, scroll_height],
      outputRange: [
        'rgba(33,33,33,0)',
        'rgba(33,33,33,0)',
        'rgba(33,33,33,0.1)',
      ],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        style={[
          Styles.absolute,
          {
            bottom: 40,
            backgroundColor,
          },
        ]}
      />
    );
  };

  _renderAvatar = () => {
    const { userAvatar } = this.props;
    const size = this.props.scrollY.interpolate({
      inputRange: [0, scroll_height],
      outputRange: [avatarSize, avatarSizeSmall],
      extrapolate: 'clamp',
    });
    const borderRadius = this.props.scrollY.interpolate({
      inputRange: [0, scroll_height],
      outputRange: [avatarSize / 2, avatarSizeSmall / 2],
      extrapolate: 'clamp',
    });
    return (
      <Animated.Image
        source={{ uri: userAvatar }}
        style={[
          styles.avatarNormal,
          {
            width: size,
            height: size,
            borderRadius,
          },
        ]}
      />
    );
  };
  _renderTitleAndUsername = () => {
    const { username, userCoin, userTitles } = this.props;
    return (
      <View style={styles.textContainer}>
        <InfiniteText
          text={username + '  ' + userCoin}
          style={{}}
          textStyle={{ color: colors.depGrey }}
        >
          {userTitles.map((item, index) => (
            <Title
              key={'ut' + index}
              title={item.title}
              customStyle={{ borderColor: item.color, color: item.color }}
            />
          ))}
          <View
            style={{
              width: 1,
              height: 18,
              backgroundColor: colors.white,
              marginRight: 4,
              alignSelf: 'center',
            }}
          />
        </InfiniteText>
      </View>
    );
  };
}
UserInfo.propTypes = {};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: width,
    height: height,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: avatarSize / 2,
    right: 0,
  },
  bkImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: avatarSize / 2,
    right: 0,
    width: width,
    height: height - avatarSize / 2,
  },
  infoContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    marginLeft: 20,
    zIndex: 5,
  },
  textContainer: {
    height: 30,
    alignItems: 'center',
    // alignSelf:'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  avatarNormal: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: 0,
  },
});

export default UserInfo;
