import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Button, NavBar, Icon, InfiniteText } from '../../components';
import { base } from '../../utils';
import MainCard from './components/MainCard';
// import store from './homePage.reducer'

class HomePage extends Component {
  componentWillMount() {}

  _add = () => {};

  _renderItem = ({ item, index }) => {
    return <MainCard />;
  };

  render() {
    const { count } = this.props.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          renderItem={this._renderItem}
          data={[1, 1, 1]}
          contentContainerStyle={{ paddingTop: 64 }}
          showsVerticalScrollIndicator={false}
        />

        <NavBar
          title={'hello there'}
          uriLeft={'eu_flamingo'}
          uriRight={'nintendo_switch'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
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
  list: {
    flex: 1,
  },
});

export default HomePage;
