import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, Animated } from 'react-native';
import { Button, Text } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
const { realSize } = base;
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offsetY: new Animated.Value(0),
      beginShrink: false,
    };
  }
  componentWillMount() {}

  _handleScroll = event => {
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y > realSize(200 - 80)) {
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
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        onScroll={event => this._handleScroll(event)}
        scrollEventThrottle={100}
      >
        <UserInfo
          username={username}
          userCoin={userCoin}
          userAvatar={userAvatar}
          userTitle={userTitle}
          shrink={this.state.beginShrink}
        />
      </ScrollView>
    );
  }
}
UserProfile.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default UserProfile;
