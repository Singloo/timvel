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
  PriceTag,
} from '../../../re-kits';
import { base, I18n } from '../../utils';

class Sample extends Component {
  componentWillMount() {}

  _goBack = () => {
    this.props.navigation.goBack();
  };
  _onPress = amount => () => {
    this._priceTag.toValue(amount, 17);
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={'welcome'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <PriceTag ref={r => (this._priceTag = r)} price={100} />
        <View>
          <Button title={'add'} onPress={this._onPress(1000)} />
          <Button title={'minus'} onPress={this._onPress(0)} />
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
