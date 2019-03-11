import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from '../../../../re-kits';
import { base } from '../../../utils';
const { colors } = base;
class Card extends Component {
  componentWillMount() {}

  render() {
    return (
      <View style={styles.container}>
        {this._renderInfo()}
        {this._renderContent()}
      </View>
    );
  }

  _renderInfo = () => {
    const { item } = this.props;
    return (
      <View style={[styles.rowCenter, { paddingLeft: 15 }]}>
        <Image uri={item.senderAvatar} style={styles.avatar} />
        <View style={[styles.rowCenter, styles.usernameCreatedAtContainer]}>
          <Text style={styles.username}>{item.senderUsername}</Text>
          <Text style={styles.createdAt}>{item.createdAt}</Text>
        </View>
      </View>
    );
  };
  _renderContent = () => {
    const { item } = this.props;
    return (
      <View style={styles.contentContainer}>
        <Text style={{ fontSize: 18 }}>{item.content}</Text>
      </View>
    );
  };
}
Card.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 2,
    paddingVertical: 5,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  username: { fontSize: 14, color: colors.midGrey, marginLeft: 15 },
  contentContainer: {
    marginLeft: 15 + 40 + 15,
    paddingTop: 10,
    paddingVertical: 10,
    paddingRight: 10,
    borderTopWidth: 1,
    borderColor: colors.midGrey,
  },
  createdAt: { fontSize: 12, color: colors.midGrey },
  usernameCreatedAtContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: 10,
  },
});

export default Card;
