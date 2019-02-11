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
@connect2('postReplies')
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
        <NavBar
          title={'Replies'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <RFlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8]}
          style={{ backgroundColor: colors.lightGrey }}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
  _renderItem = (item, index) => {
    return <Card key={index} />;
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
