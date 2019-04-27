import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavBar, Assets, RFlatList, BasicView } from '../../../re-kits';
import {
  colors,
  I18n,
  Navigation,
  curried,
  ApiNotifications,
} from '../../utils';
import { connect2 } from '../../utils/Setup';
import Card from './components/Card';

const readNotification = (comments, notificationId) => {
  return comments.map(o => {
    if (!notificationId) {
      return {
        ...o,
        isRead: true,
      };
    }
    if (o.notificationId === notificationId) {
      return {
        ...o,
        isRead: true,
      };
    }
    return o;
  });
};
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

  _goToComment = item => {
    Navigation.navigate('comment', {
      post: {
        postId: item.postId,
        userId: item.postUserId,
      },
      commentId: item.associatedCommentId || item.commentId,
    });
    if (!item.isRead) {
      this._readNotification(item.notificationId);
    }
  };
  _readNotification = notificationId => {
    const { comments } = this.props.notifPage;
    this.props.dispatch('NOTIF_PAGE_SET_STATE', {
      comments: readNotification(comments, notificationId),
    });
    const param = notificationId
      ? [notificationId]
      : comments.filter(o => !o.isRead).map(o => o.notificationId);
    ApiNotifications.readNotification(...param);
  };
  render() {
    const { comments } = this.props.notifPage;
    const showReadAll = comments.filter(o => !o.isRead).length > 0;
    return (
      <View style={styles.container}>
        <NavBar
          title={I18n.t('replies')}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          rightTitle={showReadAll ? I18n.t('readAll') : undefined}
          onPressRight={curried(this._readNotification)(undefined)}
        />
        <BasicView
          style={{ flex: 1 }}
          isEmpty={comments.length === 0}
          emptyMessage={I18n.t('noReplies')}
        >
          <RFlatList
            data={comments}
            style={{ backgroundColor: colors.lightGrey }}
            renderItem={this._renderItem}
            keyExtractor={(_, index) => 'psr' + index}
          />
        </BasicView>
      </View>
    );
  }
  _renderItem = ({ item }) => {
    return <Card item={item} onPress={curried(this._goToComment)(item)} />;
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Sample;
