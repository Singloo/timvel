import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { Button, Icon, InfiniteText } from '../../../components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import { BlurView } from 'react-native-blur';

const cardWidth = base.SCREEN_WIDTH - 20;
const cardHeight = base.SCREEN_WIDTH * 0.618;
class MainCard extends Component {
  componentWillMount() {}

  render() {
    const { imgUri } = this.props;
    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.container, base.shadow]}>
          <Image source={{ uri: 'bk1' }} style={styles.absoluteBK} />
          <BlurView
            blurType={'light'}
            style={styles.absoluteBK}
            blurAmount={2}
          />
        </View>
        <View style={styles.headerBar}>
          <Icon
            uri={'bk2'}
            size={60}
            // isRound={true}
            resizeMode={'cover'}
            style={[{}, base.shadow]}
          />
          <InfiniteText 
          style={{marginLeft:10}}
          text={'Liliasdasdjsahfaskldfjsadfjsadfhshdfsdfsjafdhskadfth'} textStyle={styles.username} />
        </View>
      </View>
    );
  }
}
MainCard.propTypes = {};

const styles = StyleSheet.create({
  wrapper: {
    width: cardWidth + 20,
    height: cardHeight + 20 + 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    paddingBottom: 10,
  },
  container: {
    width: cardWidth,
    height: cardHeight,
  },
  absoluteBK: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headerBar: {
    position: 'absolute',
    top: 0,
    left: 10,
    paddingLeft: 15,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems:'flex-start'
  },
  username: {
    fontSize: 17,
    color: base.colors.depGrey,
    // marginLeft: 10,
  },
});

export default MainCard;
