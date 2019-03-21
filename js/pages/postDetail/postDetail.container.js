import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  CommentBar,
} from '../../../re-kits';
import { I18n } from '../../utils';

class Sample extends Component {
  constructor(props) {
    super(props);
    this.post = this.props.navigation.getParam('post', {});
  }
  componentWillMount() {}
  componentDidMount() {}
  _goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar
          title={'welcome'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          style={{ backgroundColor: 'transparent' }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <Text>{this.post.content}</Text>
          </View>
        </ScrollView>
        <CommentBar />
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
