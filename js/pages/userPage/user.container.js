import React, { Component } from 'react';
import { Platform, StyleSheet, View, ScrollView, Animated } from 'react-native';
import { Button, NavBar, Image, InfiniteText, Text } from '../../../re-kits';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  User,
  $CENTER,
  $TYPES,
  HANDLE,
  Navigation,
  OSS,
} from '../../utils';
import UserProfile from './component/UserProfile';
import ImagePicker from 'react-native-image-crop-picker';
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.tempLocations = [];
  }
  componentWillMount() {}
  componentDidMount() {
    if (User.isLoggedIn) {
      this._initQuery();
    } else {
      this._generateRandomButtons();
      this._initUserMountListener();
    }
  }
  _initUserMountListener = () => {
    const listener = $CENTER.subscribe(
      HANDLE(({ type }) => {
        if (type === $TYPES.userMount) {
          this._initQuery();
          listener.unsubscribe();
        }
      }),
    );
  };
  _initQuery = () => {
    this.props.dispatch('USER_PAGE_FETCH_USER_POSTS');
    this.props.dispatch('USER_PAGE_FETCH_USER_TITLES');
  };
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
        this.props.dispatch('USER_SET_STATE', {
          buttonLocations: this.tempLocations,
        });
      }
    }
  };

  _onPressLogin = () => {
    this.props.navigation.navigate({
      routeName: 'login',
    });
  };
  _onPressLogout = () => {
    User.logOut();
    this.props.dispatch('USER_RESET_STATE');
    this._generateRandomButtons();
    this._initUserMountListener();
  };
  _goToPostDetail = post => {
    this.props.navigation.navigate({
      routeName: 'postDetail',
      params: {
        post,
      },
    });
  };
  _onPressAvatar = () => {
    this.props.dispatch('SHOW_ALERT', {
      choices: [
        {
          title: 'Open camera',
          onPress: this._goToCamera,
        },
        {
          title: 'Open photo album',
          onPress: this._openPhotoAlbum,
        },
      ],
      content: 'Change avatar',
      vertical: true,
    });
  };
  _goToCamera = () => {
    Navigation.navigate('camera');
  };
  _openPhotoAlbum = async () => {
    try {
      const image = await ImagePicker.openPicker({
        multiple: false,
        cropping: true,
      });
      try {
        this.props.dispatch('GLOABL_SET_STATE', {
          isLoading: true,
        });
        const imageUrl = await OSS.upLoadImage(image.path);
        await User.updateAvatar(imageUrl);
        this.forceUpdate();
        this.props.dispatch('SHOW_SNAKE_BAR', {
          content: 'Avatar changed successfully',
        });
      } catch (err) {
        this.props.dispatch('SHOW_SNAKE_BAR', {
          type: 'ERROR',
          content: 'Network error...',
        });
      } finally {
        this.props.dispatch('GLOABL_SET_STATE', {
          isLoading: false,
        });
      }
    } catch (error) {}
  };
  render() {
    const { buttonLocations, userPosts, userTitles } = this.props.state;
    const renderButton = buttonLocations.map((item, index) => {
      return (
        <View
          key={'tpm' + index}
          style={[styles.loginButton, { left: item.x, top: item.y }]}
        >
          <Button
            // buttonStyle={[styles.loginButton, { left: item.x, top: item.y }]}
            title={'tap me'}
            size={'small'}
            onPress={this._onPressLogin}
          />
        </View>
      );
    });
    if (!User.isLoggedIn) {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {renderButton}
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <UserProfile
          userPosts={userPosts}
          userTitles={userTitles}
          onPressCard={this._goToPostDetail}
          onPressAvatar={this._onPressAvatar}
        />
        <Button title={'log out'} onPress={this._onPressLogout} />
      </View>
    );
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
