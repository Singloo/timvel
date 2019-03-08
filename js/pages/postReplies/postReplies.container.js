import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  Text,
  Assets,
  RFlatList,
} from '../../../re-kits';
import { base, I18n } from '../../utils';
import { connect2 } from '../../utils/Setup';
import Card from './components/Card';
const { colors } = base;
@connect2('postReplies', {
  stateMapper: ({ postReplies, notifPage, global }) => ({
    state: postReplies,
    notifPage,
    global,
  }),
})
class Sample extends Component {
  componentWillMount() {}

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { comments } = this.props.notifPage;
    return (
      <View style={styles.container}>
        <NavBar
          title={'Replies'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <RFlatList
          data={comments}
          style={{ backgroundColor: colors.lightGrey }}
          renderItem={this._renderItem}
          keyExtractor={(_, index) => 'psr' + index}
        />
      </View>
    );
  }
  _renderItem = ({ item, index }) => {
    return <Card item={item} />;
  };
}
Sample.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
