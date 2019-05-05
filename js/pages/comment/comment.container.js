import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import {
  Button,
  NavBar,
  Assets,
  CommentBar,
  NAV_BAR_HEIGHT_FULL,
  Styles,
  curried,
} from '../../../re-kits';
import { colors, TAB_BAR_HEIGHT, I18n } from '../../utils';
import CommentCard from './components/CommentCard';
class Comment extends React.Component {
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
    return (
      <CommentCard
        comment={item}
        index={index + 1}
        onLongPress={curried(this._report)(item.commentId)}
      />
    );
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
  _report = commentId => {
    // const { posts } = this.props.state;
    const callback = () => {
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: I18n.t('reportSuccess'),
      });
      // this.props.dispatch('HOME_PAGE_SET_STATE', {
      //   posts: posts.filter(o => o.postId !== postId),
      // });
    };
    this.props.dispatch('ALERT_REPORT', {
      childId: commentId,
      type: 'comment',
      callback,
    });
  };
  render() {
    const { comments } = this.props.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={{
            flex: 1,
          }}
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
          blur={true}
          style={{ position: 'absolute', top: 0 }}
        />
        <CommentBar onPressSend={this._onPressSend} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Comment;
