/*
 * File: /Users/origami/Desktop/timvel/js/components/UserInfoBar.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Tuesday April 9th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday April 15th 2019 10:23:41 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, InfiniteText, Styles } from '../../re-kits';
import { colors } from '../utils';
import Title from './Title';
class UserInfoBar extends Component {
  render() {
    const { style, textStyle, username } = this.props;
    return (
      <View style={[styles.headerBar, style]}>
        {this._renderAvatar()}
        <View style={styles.headerTextContainer}>
          <InfiniteText
            style={{}}
            text={username}
            textStyle={StyleSheet.flatten(styles.username, textStyle)}
          >
            {this._renderUserTitle()}
          </InfiniteText>
        </View>
      </View>
    );
  }
  _renderAvatar = () => {
    const { onPressAvatar, avatar, avatarStyle, shadow = true } = this.props;
    const avatarComp = (
      <Image
        uri={avatar}
        resizeMode={'cover'}
        style={[{ width: 60, height: 60 }, avatarStyle]}
        onPress={onPressAvatar}
      />
    );
    if (shadow) return <View style={Styles.shadow}>{avatarComp}</View>;
    return avatarComp;
  };
  _renderUserTitle = () => {
    const { userTitles } = this.props;
    if (!userTitles) {
      return null;
    }
    return userTitles.map((item, index) => (
      <Title
        key={'ut' + index}
        title={item.title}
        customStyle={{ borderColor: item.color, color: item.color }}
      />
    ));
  };
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    height: 60,
    paddingLeft: 20,
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
