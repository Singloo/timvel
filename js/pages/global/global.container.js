import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../re-kits';
import { Styles, isAndroid } from '../../utils';
import LoadingView from './components/LoadingView';
class Global extends Component {
  componentWillMount() {}
  render() {
    const { isLoading } = this.props.state;
    let showLoading = isLoading;

    if (showLoading) {
      return <LoadingView />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  // snakeBar: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: snake_bar_height,
  //   backgroundColor: 'transparent',
  // },
});

export default Global;
