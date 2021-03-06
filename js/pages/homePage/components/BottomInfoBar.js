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
import { Styles, colors, curried } from '../../../utils';

class BottomInfoBar extends React.Component {
  render() {
    const { style, onPressComment, onPressEmoji, nums } = this.props;
    const renderEmojis = ['shock', 'angry', 'nofeeling', 'vomit', 'laugh'].map(
      (item, index) => (
        <EmojiItem
          key={index}
          source={Assets[item].source}
          onPress={curried(onPressEmoji)(item)}
          num={nums[item]}
          textStyle={{
            color: colors.depGrey,
          }}
        />
      ),
    );
    return (
      <View style={[styles.container, style]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            marginLeft: 10,
            marginBottom: 5,
          }}
        >
          <Image
            source={Assets.comment.source}
            tintColor={colors.depGrey}
            size={'small'}
            onPress={onPressComment}
            resizeMode={'contain'}
          />
          <Text style={styles.num}>{nums.numOfComments}</Text>
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
    color: colors.depGrey,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 2,
  },
});
export default BottomInfoBar;
