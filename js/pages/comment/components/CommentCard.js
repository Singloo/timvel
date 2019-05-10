import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  Image,
  InfiniteText,
  Assets,
  Touchable,
} from '../../../../re-kits';
import { colors, I18n, DateFormatter } from '../../../utils';
class Card extends Component {
  componentWillMount() {}

  render() {
    const { index, comment, onPressReport } = this.props;
    const dateFormatter = new DateFormatter(comment.createdAt);
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
          <Image
            source={Assets.report.source}
            size={'verySmall'}
            onPress={onPressReport}
            tintColor={colors.depGrey}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{comment.content}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.subText}>{dateFormatter.yearMonthDayTime}</Text>
        </View>
      </View>
    );
  }
}

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
