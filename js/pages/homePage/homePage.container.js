import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Button, NavBar, Icon,InfiniteText } from '../../components';
import { base } from '../../utils';
import MainCard from './components/MainCard'
// import store from './homePage.reducer'

class HomePage extends Component {
  componentWillMount() {}

  _add = () => {};

  render() {
    const { count } = this.props.state;

    return (
      <View style={styles.container}>
        <NavBar
          title={'hello there'}
          uriLeft={'eu_flamingo'}
          uriRight={'nintendo_switch'}
        />
        {/* <FlatList
        style={styles.list}
        /> */}
        <MainCard/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: base.colors.lightGrey,
  },
  list:{
    flex:1
  }
});

export default HomePage;
