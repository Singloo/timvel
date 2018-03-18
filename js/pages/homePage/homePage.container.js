import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Button, NavBar, Icon } from '../../components';
import { base } from '../../utils';
// import store from './homePage.reducer'

class HomePage extends Component {
  componentWillMount() {}

  _add = () => {};

  render() {
    const { count } = this.props.state;

    return (
      <View style={styles.container}>
        <NavBar
          title={'hello'}
          uriLeft={'nintendo_switch'}
          uriRight={'nintendo_switch'}
        />
        <FlatList
        style={styles.list}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  list:{
    flex:1
  }
});

export default HomePage;
