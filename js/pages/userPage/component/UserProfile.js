import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { Button, Text, InfiniteText } from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import HeaderBar from './HeaderBar';
const { realSize, colors, SCREEN_WIDTH, PADDING_TOP } = base;
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this._scrollY = new Animated.Value(0);
    this._nscrollY = new Animated.Value(0);
    this._nscrollY.addListener(
      Animated.event([{ value: this._scrollY }], { useNativeDriver: false }),
    );
  }
  componentWillMount() {}

  render() {
    const { userInfo } = this.props;

    const { username, userCoin, userAvatar, userTitle } = userInfo && userInfo;
    return (
      <View style={styles.wrapper}>
        <Animated.ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 0 }}
          scrollEventThrottle={16}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this._nscrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            nScrollY={this._nscrollY}
            scrollY={this._scrollY}
          />
        </Animated.ScrollView>
      </View>
    );
  }
}
UserProfile.propTypes = {};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default UserProfile;
