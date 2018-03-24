import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button, NavBar, Icon, InfiniteText } from '../../../re-kits/components'
import { base } from '../../utils';

class User extends Component {
  componentWillMount() {}

  componentDidMount() {}

  _onPressLogin = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_NAVIGATE', {
      navigation,
      routeName: 'login',
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this._onPressLogin} title={'tap me'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default User;
