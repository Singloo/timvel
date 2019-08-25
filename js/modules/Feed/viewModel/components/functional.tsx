import React from 'react';
import { View } from 'react-native';
import { Text, Button, Image, Touchable } from '../../../../../re-kits';
import { IPost } from '../../../../models';
import { get } from 'lodash';

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
