import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../re-kits';
import { base } from '../../utils';
const { Styles, PADDING_TOP, isAndroid } = base;
import SnakeBar from './components/SnakeBar';
const snake_bar_height = 48 + PADDING_TOP + (isAndroid ? 20 : 0);
class Global extends Component {
  componentWillMount() {}

  snakeBarCallback = () => {
    this.props.logic('SNAKE_BAR_SET_STATE', {
      snakeBarInfo: '',
      snakeBarType: 'NORMAL',
      snakeBarDuration: 3000,
      onPressSnakeBar: null,
    });
  };
  render() {
    const {
      snakeBarInfo,
      snakeBarType,
      snakeBarDuration,
      onPressSnakeBar,
    } = this.props.state;
    let showSnakeBar = snakeBarInfo.length > 0;
    if (showSnakeBar) {
      return (
        <View style={styles.snakeBar}>
          <SnakeBar
            type={snakeBarType}
            info={snakeBarInfo}
            duration={snakeBarDuration}
            callback={this.snakeBarCallback}
            onPress={onPressSnakeBar}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  snakeBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: snake_bar_height,
    backgroundColor: 'transparent',
  },
});

export default Global;
