import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Image,
  Touchable,
  Styles,
  SCREEN_HEIGHT,
} from '../../../../../re-kits';
import { IPost } from '../../../../models';
import { get } from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
const DEFAULT_LINEAR_COLORS = ['#52545E', '#727B87'];

const styles = StyleSheet.create({
  bkWhite: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-end',
  },
});

export function FeedCard({
  post,
  onPress,
}: {
  post: IPost;
  onPress: (post: IPost) => void;
}) {
  return (
    <Touchable onPress={() => onPress(post)}>
      <Text numberOfLines={2}>{post.content}</Text>
      <Image
        uri={get(post, 'imageUrls[0].imageUrl', '')}
        style={{ width: 200, height: 100 }}
      />
    </Touchable>
  );
}

export function FeedBackground({
  colors = DEFAULT_LINEAR_COLORS,
  stripeColor = '#FAC5D2',
}: {
  colors?: string[];
  stripeColor?: string;
}) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={colors}
      style={[{ paddingHorizontal: 30 }, Styles.absolute]}>
      <View style={styles.bkWhite}>
        <View
          style={{
            width: 25,
            backgroundColor: stripeColor,
            height: SCREEN_HEIGHT,
          }}
        />
      </View>
    </LinearGradient>
  );
}