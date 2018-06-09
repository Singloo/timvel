import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Image,
  InfiniteText,
  Text,
  Touchable,
  Assets,
} from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles } = base;
import UserInfoBar from './UserInfoBar';
import TimeBar from './TimeBar';
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
    // this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    const { imgUri, onPress } = this.props;
    return (
      <View style={[styles.wrapper]}>
        <Touchable onPress={onPress && onPress}>
          <View style={[styles.container, Styles.shadow]}>
            <Image
              source={Assets.bk1.source}
              style={{ width: cardWidth, height: cardHeight }}
              blur={true}
              // onLoadEnd={this.imageLoaded.bind(this)}
            />
          </View>
        </Touchable>
        <UserInfoBar style={styles.headerBar} />

        <TimeBar style={styles.bottomBar} />
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
