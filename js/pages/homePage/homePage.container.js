import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  ActionButton,
} from '../../../re-kits';

import { base, User } from '../../utils';
import MainCard from './components/MainCard';
import ContentDetail from './components/ContentDetail';
const { PADDING_BOTTOM, colors } = base;
class HomePage extends Component {
  componentWillMount() {}

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
          sourceLeft={Assets.eu_flamingo.source}
          sourceRight={Assets.eu_deer.source}
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
        <ActionButton buttonSource={Assets.add.source}>
          <ActionButton.Icon
            title={1}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.comment.source}
            onPress={() => {}}
          />
          <ActionButton.Icon
            title={2}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.comment.source}
            onPress={() => {}}
          />
          <ActionButton.Icon
            title={3}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.bk1.source}
            onPress={() => {}}
          />
          <ActionButton.Icon
            title={4}
            iconStyle={{ backgroundColor: colors.main }}
            source={Assets.comment.source}
            onPress={() => {}}
          />
        </ActionButton>
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
