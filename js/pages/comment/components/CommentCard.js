import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Image, InfiniteText, Assets } from '../../../../re-kits';
import { colors, I18n } from '../../../utils';
import PropTypes from 'prop-types';
class Card extends Component {
  componentWillMount() {}

  render() {
    const { index, comment } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Image
            source={{ uri: comment.avatar }}
            size={'regular'}
            isRound={true}
          />
          <InfiniteText
            text={comment.username}
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.subText}>{index}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{comment.content}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.subText}>{comment.createdAt}</Text>
        </View>
      </View>
    );
  }
}
Card.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    marginVertical: 5,
    paddingVertical: 5,
  },
  headContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  content: {
    color: colors.pureBlack,
    fontWeight: '200',
  },
  contentContainer: {
    paddingLeft: 10 + 40,
  },
  bottomContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  subText: {
    fontSize: 14,
  },
});

export default Card;
