import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  CommentBar,
  NAV_BAR_HEIGHT_FULL
} from '../../../re-kits';
import { base, I18n } from '../../utils';
import CommentCard from './components/CommentCard';
const { colors, TAB_BAR_HEIGHT } = base;
class Comment extends Component {
  componentWillMount() {
    this.post = this.props.navigation.getParam('post', {});
    this._fetchComments();
  }
  componentWillUnmount() {
    this.props.dispatch('COMMENT_RESET_STATE');
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };

  _renderItem = ({ item, index }) => {
    return <CommentCard comment={item} index={index + 1} />;
  };

  _fetchComments = () => {
    const { comments } = this.props.state;
    this.props.dispatch('COMMENT_FETCH_COMMENTS', {
      postId: this.post.postId,
      offset: comments.length,
    });
  };
  _onPressSend = (value, callback) => {
    this.props.dispatch('COMMENT_COMMENT_POST', {
      content: value,
      post: this.post,
      callback: callback,
    });
  };
  render() {
    const { comments } = this.props.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={comments}
          renderItem={this._renderItem}
          contentContainerStyle={{
            paddingTop: NAV_BAR_HEIGHT_FULL,
            paddingBottom: TAB_BAR_HEIGHT,
          }}
          keyExtractor={(_, index) => 'cmc' + index}
        />
        <NavBar
          title={'comments'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          style={{ position: 'absolute', top: 0 }}
        />
        <CommentBar onPressSend={this._onPressSend} />
      </View>
    );
  }
}
Comment.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Comment;
