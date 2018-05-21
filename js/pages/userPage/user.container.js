import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  Button,
  NavBar,
  Icon,
  InfiniteText,
  Text,
} from '../../../re-kits/components';
import { base, User } from '../../utils';
import UserProfile from './component/UserProfile';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.tempLocations = [];
  }
  componentWillMount() {
    for (var i = 0; i <= 50; i++) {
      var x = parseInt(Math.random() * base.SCREEN_WIDTH);
      var y = parseInt(Math.random() * base.SCREEN_HEIGHT);
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

    this.props.logic('USER_GET_USER_STATUS');
  }

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
    });
  };
  render() {
    const { buttonLocations, userInfo } = this.props.state;
    const renderButton = buttonLocations.map((item, index) => {
      return (
        <Button
          key={index}
          buttonStyle={[styles.loginButton, { left: item.x, top: item.y }]}
          title={'tap me'}
          onPress={this._onPressLogin}
        />
      );
    });
    if (!User.isLoggedIn()) {
      return <View style={{ flex: 1 }}>{renderButton}</View>;
    } else {
      return (
        <View style={styles.container}>
          <UserProfile userInfo={userInfo} />
          <Button onPress={this._onPressLogout} title={'log out'} />
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
