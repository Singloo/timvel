import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, Animated } from 'react-native';
import { Button, NavBar, Image, InfiniteText, Text } from '../../../re-kits';
import { base, User } from '../../utils';
import UserProfile from './component/UserProfile';
const { SCREEN_HEIGHT, SCREEN_WIDTH } = base;
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.tempLocations = [];
  }
  componentWillMount() {
    this.props.logic('USER_PAGE_FETCH_USER_POSTS');
    this._generateRandomButtons();
    if (this.props.state.isLoggedIn === false) {
      this.props.logic('USER_PAGE_GET_USER_INFO');
    }
  }

  _generateRandomButtons = () => {
    for (var i = 0; i <= 50; i++) {
      var x = parseInt(Math.random() * SCREEN_WIDTH, 10);
      var y = parseInt(Math.random() * SCREEN_HEIGHT, 10);
      var coordinate = {
        x,
        y,
      };
      this.tempLocations.push(coordinate);

      if (i == 20) {
        this.props.logic('USER_SET_STATE', {
          buttonLocations: this.tempLocations,
        });
      }
    }
  };
  componentDidMount() {}

  _onPressLogin = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_NAVIGATE', {
      navigation,
      routeName: 'login',
    });
  };
  _onPressLogout = () => {
    User.logOut();
    this.props.logic('USER_SET_STATE', {
      userInfo: {},
      isLoggedIn: false,
    });
  };
  render() {
    const {
      buttonLocations,
      userInfo,
      isLoggedIn,
      userPosts,
    } = this.props.state;
    const renderButton = buttonLocations.map((item, index) => {
      return (
        <View
          key={index}
          style={[styles.loginButton, { left: item.x, top: item.y }]}
        >
          <Button
            key={index}
            // buttonStyle={[styles.loginButton, { left: item.x, top: item.y }]}
            title={'tap me'}
            size={'small'}
            onPress={this._onPressLogin}
          />
        </View>
      );
    });
    if (!isLoggedIn) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {renderButton}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <UserProfile userInfo={userInfo} userPosts={userPosts} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginBottom: 48,
  },
  loginButton: {
    position: 'absolute',
  },
});

export default UserPage;
