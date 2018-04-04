import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import { Button, Text, InfiniteText } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import HeaderBar from './HeaderBar';
const { realSize, colors, SCREEN_WIDTH,PADDING_TOP } = base;
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetY: new Animated.Value(0),
      beginShrink: false,
      viewRef: null,
    };
  }
  componentWillMount() {}

  _handleScroll = event => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y > realSize(200 - 80 - 44)) {
      if (this.state.beginShrink == false) {
        this.setState({ beginShrink: true });
      }
    } else {
      if (this.state.beginShrink == true) {
        this.setState({ beginShrink: false });
      }
    }
  };

  render() {
    const { userInfo } = this.props;

    const { username, userCoin, userAvatar, userTitle } = userInfo && userInfo;
    return (
      <View style={styles.wrapper}>
        
        <ScrollView
          style={styles.container}
          // showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 0 }}
          onScroll={event => this._handleScroll(event)}
          scrollEventThrottle={30}
        >
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
          <UserInfo
            username={username}
            userCoin={userCoin}
            userAvatar={userAvatar}
            userTitle={userTitle}
            shrink={this.state.beginShrink}
          />
        </ScrollView>
        <HeaderBar
          username={username}
          userCoin={userCoin}
          userAvatar={userAvatar}
          userTitle={userTitle}
          shrink={this.state.beginShrink}
        />
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
