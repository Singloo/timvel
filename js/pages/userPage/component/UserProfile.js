import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from '../../../../re-kits/components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo'
class UserProfile extends Component {
  componentWillMount() {}

  render() {
    const {userInfo}=this.props
    const{ username,userCoin,userAvatar,userTitle} = userInfo&&userInfo
    return (
      <View style={styles.container}>
        <UserInfo 
        username={username}
        userCoin={userCoin}
        userAvatar={userAvatar}
        userTitle={userTitle}
        />
      </View>
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
