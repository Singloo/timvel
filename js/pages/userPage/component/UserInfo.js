import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {
  Button,
  Text,
  Image,
  InfiniteText,
  PADDING_TOP_FULL,
} from '../../../../re-kits';
import { base } from '../../../utils';
import Title from '../../../components/Title';
const { SCREEN_WIDTH, colors, Styles } = base;
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
  componentWillMount() {}

  render() {
    const {
      username,
      userCoin,
      userAvatar,
      userTitles,
      nScrollY,
      scrollY,
    } = this.props;
    let imgScale = nScrollY.interpolate({
      inputRange: [-25, 0],
      outputRange: [1.1, 1],
      extrapolateRight: 'clamp',
    });

    let animatedAvatarSize = scrollY.interpolate({
      inputRange: [0, scroll_height],
      outputRange: [avatarSize, avatarSizeSmall],
      extrapolate: 'clamp',
    });
    let animatedAavatarBorderRadius = scrollY.interpolate({
      inputRange: [0, scroll_height],
      outputRange: [avatarSize / 2, avatarSizeSmall / 2],
      extrapolate: 'clamp',
    });
    let viewY = nScrollY.interpolate({
      inputRange: [0, scroll_height],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });
    let viewX = nScrollY.interpolate({
      inputRange: [0, scroll_height, 200],
      outputRange: [0, 60, 80],
      extrapolate: 'clamp',
    });

    let containerY = nScrollY.interpolate({
      inputRange: [-25, 0, scroll_height],
      outputRange: [-18, 0, -(scroll_height - 40)],
      extrapolateRight: 'clamp',
    });
    let bkColor = scrollY.interpolate({
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
          styles.container,
          {
            transform: [{ translateY: containerY }],
          },
        ]}
      >
        <Animated.Image
          source={{ uri: userAvatar }}
          style={[
            styles.bkImage,
            {
              transform: [
                {
                  scale: imgScale,
                },
              ],
            },
          ]}
          resizeMode={'cover'}
        />
        <Animated.View
          style={[
            Styles.absolute,
            {
              bottom: 40,
              backgroundColor: bkColor,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.infoContainer,
            {
              zIndex: 5,
            },
            {
              transform: [
                {
                  translateY: viewY,
                },
                {
                  translateX: viewX,
                },
              ],
            },
          ]}
        >
          <Animated.Image
            source={{ uri: userAvatar }}
            style={[
              styles.avatarNormal,
              {
                width: animatedAvatarSize,
                height: animatedAvatarSize,
                borderRadius: animatedAavatarBorderRadius,
              },
            ]}
          />
          <View style={styles.textContainer}>
            <InfiniteText
              text={username + '  ' + userCoin}
              style={{}}
              textStyle={{ color: colors.depGrey }}
            >
              {userTitles.map(item => (
                <Title title={item.title} />
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
        </Animated.View>
      </Animated.View>
    );
  }
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
    zIndex: 2,
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
