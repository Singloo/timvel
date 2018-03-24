import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, findNodeHandle } from 'react-native';
import { Button, Icon, InfiniteText } from '../../../components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import { BlurView } from 'react-native-blur';

import UserInfoBar from './UserInfoBar'
import TimeBar from './TimeBar'
const cardWidth = base.SCREEN_WIDTH - 20;
const cardHeight = base.SCREEN_WIDTH * 0.618;
class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  componentWillMount() {}

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    const { imgUri } = this.props;
    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.container, base.shadow]}>
          <Image
            ref={r => {
              this.backgroundImage = r;
            }}
            source={{ uri: 'bk1' }}
            style={styles.absoluteBK}
            onLoadEnd={this.imageLoaded.bind(this)}
          />
          <BlurView
            viewRef={this.state.viewRef}
            blurType={'light'}
            style={styles.absoluteBK}
            blurAmount={2}
          />
        </View>
          <UserInfoBar
          style={styles.headerBar}
          />

        <TimeBar
        style={styles.bottomBar}
        />
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
    right: 10,
    marginTop: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
});

export default MainCard;
