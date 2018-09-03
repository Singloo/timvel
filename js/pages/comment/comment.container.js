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
} from '../../../re-kits';
import { base, I18n } from '../../utils';
import CommentCard from './components/CommentCard';
const { colors, NAV_BAR_HEIGHT, TAB_BAR_HEIGHT } = base;
class Comment extends Component {
  componentWillMount() {
    this.postId = this.props.navigation.state.params.postId;
    this._fetchComments();
  }
  componentWillUnmount() {
    this.props.logic('COMMENT_RESET_STATE');
  }

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  _renderItem = ({ item, index }) => {
    return <CommentCard key={index} comment={item} index={index + 1} />;
  };

  _fetchComments = () => {
    const { comments } = this.props.state;
    this.props.logic('COMMENT_FETCH_COMMENTS', {
      postId: this.postId,
      offset: comments.length,
    });
  };
  _onPressSend = (value, callback) => {
    this.props.logic('COMMENT_COMMENT_POST', {
      content: value,
      postId: this.postId,
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
            paddingTop: NAV_BAR_HEIGHT,
            paddingBottom: TAB_BAR_HEIGHT,
          }}
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
