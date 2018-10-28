import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
} from '../../../re-kits';
import { base, I18n } from '../../utils';

class Sample extends Component {
  time = 0;
  componentWillMount() {}

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };
  _onPressShowSnakeBar = () => {
    // const arr = [1];
    // arr.splice(0, 1);
    // console.warn(arr);
    this.props.logic('SHOW_SNAKE_BAR', {
      content: 'asd' + this.time,
    });
    this.time = this.time + 1;
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={'welcome'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <View>
          <Button
            title={'show snake bar'}
            onPress={this._onPressShowSnakeBar}
          />
        </View>
      </View>
    );
  }
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
