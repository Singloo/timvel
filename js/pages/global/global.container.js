import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../re-kits';
import { base } from '../../utils';
const { Styles } = base;
import SnakeBar from './components/SnakeBar';
import LoadingView from './components/LoadingView';
class Global extends Component {
  componentWillMount() {}

  snakeBarCallback = () => {
    this.props.logic('GLOBAL_SET_STATE', {
      snakeBarInfo: '',
      snakeBarType: 'normal',
      snakeBarDuration: 3000,
      onPressSnakeBar: null,
    });
  };
  render() {
    const {
      snakeBarInfo,
      snakeBarType,
      snakeBarDuration,
      isLoading,
      onPressSnakeBar,
    } = this.props.state;
    let showLoading = isLoading;
    let showSnakeBar = snakeBarInfo.length > 0;

    if (showLoading && showSnakeBar) {
      return (
        <LoadingView>
          <View style={styles.snakeBar}>
            <SnakeBar
              type={snakeBarType}
              info={snakeBarInfo}
              duration={snakeBarDuration}
              callback={this.snakeBarCallback}
            />
          </View>
        </LoadingView>
      );
    }

    if (showLoading) {
      return <LoadingView />;
    }
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
    height: 68,
    backgroundColor: 'transparent',
  },
});

export default Global;
