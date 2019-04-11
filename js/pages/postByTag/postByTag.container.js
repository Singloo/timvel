import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  RFlatList,
} from '../../../re-kits';
import { I18n } from '../../utils';
import { connect2 } from '../../utils/Setup';
import { get } from 'lodash';
import Card from './components/Card';
@connect2('postByTag')
class Sample extends Component {
  componentWillMount() {
    this.tag = this.props.navigation.getParam('tag', {});
    this.props.dispatch('POST_BY_TAG_FETCH_POSTS_BY_TAG', {
      tagId: get(this.tag, 'tagId', 1),
    });
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { data } = this.props.state;
    return (
      <View style={styles.container}>
        <NavBar
          title={get(this.tag, 'tag', '')}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <RFlatList data={data} renderItem={this._renderItem} />
      </View>
    );
  }
  _renderItem = ({ item, index }) => {
    return <Card key={'pbt' + index} post={item} />;
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
