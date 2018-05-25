import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
} from '../../../re-kits';

import { base, User } from '../../utils';
import MainCard from './components/MainCard';
import ContentDetail from './components/ContentDetail';

class HomePage extends Component {
  componentWillMount() {
    // this.props.logic('INIT_APP');
  }

  componentDidMount() {
    // console.warn(User.current())
  }
  //render
  _renderItem = ({ item, index }) => {
    return <MainCard onPress={this._onPressMainCard} />;
  };

  //press
  _onPressMainCard = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      showDetail: true,
    });
  };
  _closeModal = () => {
    this.props.logic('HOME_PAGE_SET_STATE', {
      showDetail: false,
    });
  };
  render() {
    const { showDetail } = this.props.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          renderItem={this._renderItem}
          data={[1, 1, 1]}
          contentContainerStyle={{ paddingTop: 64 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={({ item, index }) => index}
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

        {showDetail && (
          <ContentDetail
            frameTop={50}
            frameLeft={20}
            closeModal={this._closeModal}
          />
        )}
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
