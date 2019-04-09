/*
 * File: /Users/origami/Desktop/timvel/js/components/UserInfoBar.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Tuesday April 9th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday April 9th 2019 9:17:49 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, InfiniteText, Styles } from '../../re-kits';
import { colors } from '../utils';
class UserInfoBar extends Component {
  componentWillMount() {}

  render() {
    const { style, textStyle, onPressAvatar, username, avatar } = this.props;
    return (
      <View style={[styles.headerBar, style]}>
        <View style={[{ marginLeft: 20 }, Styles.shadow]}>
          <Image
            uri={avatar}
            resizeMode={'cover'}
            style={{ width: 60, height: 60 }}
            onPress={onPressAvatar}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <InfiniteText
            style={{}}
            text={username}
            textStyle={StyleSheet.flatten([styles.username, textStyle])}
          />
          {/* <View
            style={{
              height: 30,
              backgroundColor: 'transparent',
              alignItems: 'flex-end',
            }}
          /> */}
        </View>
      </View>
    );
  }
}
UserInfoBar.propTypes = {};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    height: 60,
  },
  username: {
    fontSize: 17,
    color: colors.depGrey,
  },
  title: {
    color: 'black',
    fontWeight: '100',
    fontSize: 22,
    letterSpacing: 1,
  },
  headerTextContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
    paddingBottom: 30,
  },
});

export default UserInfoBar;
