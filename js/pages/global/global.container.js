import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../re-kits/components';
import { base } from '../../utils';
const { Styles } = base;
import SnakeBar from './components/SnakeBar';
class Global extends Component {
  componentWillMount() {}

  snakeBarCallback = () => {
    this.props.logic('GLOBAL_SET_STATE', {
      snakeBarInfo: '',
      snakeBarType: 'normal',
      snakeBarDuration: 3000,
    });
  };
  render() {
    const { snakeBarInfo, snakeBarType, snakeBarDuration } = this.props.state;
    if (snakeBarInfo.length > 0) {
      return (
        <View style={styles.snakeBar}>
          <SnakeBar
            type={snakeBarType}
            info={snakeBarInfo}
            duration={snakeBarDuration}
            callback={this.snakeBarCallback}
          />
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  snakeBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'transparent',
  },
});

export default Global;
