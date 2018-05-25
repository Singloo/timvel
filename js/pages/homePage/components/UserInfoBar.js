import React, { Component } from 'react';
import { StyleSheet, View, Image as Image2 } from 'react-native';
import { Button, Image, InfiniteText, Text, Assets } from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles } = base;
class UserInfoBar extends Component {
  componentWillMount() {}

  render() {
    const { style } = this.props;
    return (
      <View style={[styles.headerBar, style]}>
        <Image
          source={Assets.bk2.source}
          resizeMode={'cover'}
          style={{ width: 60, height: 60, ...Styles.shadow }}
        />
        <View style={styles.headerTextContainer}>
          <InfiniteText
            style={{}}
            text={'Lilith'}
            textStyle={styles.username}
          />
          <InfiniteText
            style={{}}
            text={'welcome back,how are you today,'}
            textStyle={styles.title}
          />
        </View>
        {/* <View style={{ justifyContent: 'flex-end' }}>
          <Image
            source={Assets.add.source}
            tintColor={'white'}
            size={'small'}
            style={{
              alignSelf: 'flex-end',
              marginRight: 2,
              width: 24,
              height: 24,
            }}
          />
        </View> */}
      </View>
    );
  }
}
UserInfoBar.propTypes = {};

const styles = StyleSheet.create({
  headerBar: {
    paddingLeft: 15,
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default UserInfoBar;
