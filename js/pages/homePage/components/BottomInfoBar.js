import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Image,
  InfiniteText,
  Text,
  Touchable,
  Assets,
  EmojiItem,
} from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles, colors } = base;

class BottomInfoBar extends React.Component {
  render() {
    const { style, onPressComment, onPressEmoji } = this.props;
    const renderEmojis = ['shock', 'angry', 'nofeeling', 'vomit', 'laugh'].map(
      (item, index) => {
        return (
          <EmojiItem
            key={index}
            source={Assets[item].source}
            onPress={() => {
              onPressEmoji(item);
            }}
            num={1000}
          />
        );
      },
    );
    return (
      <View style={[styles.container, style]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginLeft: 10,
          }}
        >
          <Image
            source={Assets.comment.source}
            tintColor={colors.white}
            size={'small'}
            onPress={onPressComment}
          />
          <Text style={styles.num}>{1000}</Text>
        </View>

        <View style={styles.emojiContainer}>{renderEmojis}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 4,
    alignItems: 'flex-end',
  },
  emojiContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    // marginHorizontal:20,
    marginHorizontal: 10,
  },
  num: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
});
export default BottomInfoBar;
