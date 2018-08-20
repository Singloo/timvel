import React, { Component } from 'react';
import { StyleSheet, View, Image as Image2 } from 'react-native';
import { Button, Image, InfiniteText, Text, Assets } from '../../../../re-kits';
import { base } from '../../../utils';
import TimeBar from './TimeBar';
const { Styles } = base;
class UserInfoBar extends Component {
  componentWillMount() {}

  render() {
    const { style, textStyle, onPressAvatar } = this.props;
    return (
      <View style={[styles.headerBar, style]}>
        <View style={Styles.shadow}>
          <Image
            source={Assets.bk2.source}
            resizeMode={'cover'}
            style={{ width: 60, height: 60, marginLeft: 20 }}
            onPress={onPressAvatar}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <InfiniteText
            style={{}}
            text={'Lilith'}
            textStyle={StyleSheet.flatten([styles.username, textStyle])}
          />
          <View style={{ height: 30, backgroundColor: 'transparent' }} />
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
    color: base.colors.depGrey,
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
  },
});

export default UserInfoBar;
