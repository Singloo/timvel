import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Icon,
  InfiniteText,
  Text,
} from '../../../re-kits/components';
import { base } from '../../utils';

class Sample extends Component {
  componentWillMount() {}

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar title={'welcome'} />
        <Text>{'welcome'}</Text>
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
