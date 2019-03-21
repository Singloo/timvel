import React, { Component, cloneElement } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button, NAV_BAR_HEIGHT_FULL } from '../../../re-kits';
import {} from '../../utils';
import SnakeBar from './components/SnakeBar';
const snake_bar_height = NAV_BAR_HEIGHT_FULL;
class Global extends Component {
  componentWillMount() {}

  componentDidUpdate() {}
  snakeBarCallback = () => {};
  render() {
    const { content, type, duration, onPress } = this.props.state;
    let showSnakeBar = content.length > 0;
    if (showSnakeBar) {
      return (
        <View style={styles.snakeBar}>
          <SnakeBar
            type={type}
            info={content}
            duration={duration}
            // callback={this.snakeBarCallback}
            onPress={onPress}
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
