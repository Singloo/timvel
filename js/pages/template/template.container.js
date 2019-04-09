import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
} from '../../../re-kits';
import { I18n } from '../../utils';
import { connect2 } from '../../utils/Setup';

@connect2('sample')
class Sample extends Component {
  componentWillMount() {}

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={'welcome'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <Text>{'welcome'}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
