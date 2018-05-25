import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  findNodeHandle,
  Animated,
  LayoutAnimation,
} from 'react-native';
import {
  Button,
  Text,
  Image,
  InfiniteText,
} from '../../../../re-kits';
import { base } from '../../../utils';
import { BlurView } from 'react-native-blur';
import PropTypes from 'prop-types';
const { SCREEN_WIDTH, colors, renderTitle, realSize } = base;
const width = SCREEN_WIDTH;
const height = realSize(200);
const avatarSize = realSize(80);
class UserInfo extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}

  render() {
    const { username, userCoin, userAvatar, userTitle, shrink } = this.props;

    if (shrink) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity,
        ),
      );
    } else {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity,
        ),
      );
    }
    return (
      <View style={styles.container}>
        <Image
          uri={userAvatar}
          style={styles.bkImage}
          resizeMode={'cover'}
          blur={true}
        />
        <Animated.View
          style={shrink ? styles.infoContainerAfter : styles.infoContainer}
        >
          <Animated.Image
            source={{ uri: userAvatar }}
            style={shrink ? styles.avatarAfter : styles.avatarNormal}
          />
          <View style={styles.textContainer}>
            <InfiniteText
              text={username + userCoin}
              style={{}}
              textStyle={{ color: colors.white }}
            >
              {renderTitle(userTitle)}
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
      </View>
    );
  }
}
UserInfo.propTypes = {};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    width: width,
    height: height,
    // justifyContent: 'center',
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
  },
  infoContainerAfter: {
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 20,
    left: SCREEN_WIDTH / 4,
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
  avatarAfter: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default UserInfo;
