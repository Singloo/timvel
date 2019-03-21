import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Image, Assets, Tag, Text } from '../../../../re-kits';
import { colors, I18n } from '../../../utils';
class ChooseTags extends React.Component {
  render() {
    const { tags, onPressAddTag } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={Assets.tag.source}
          style={{ marginLeft: 10 }}
          size={'verySmall'}
          onPress={onPressAddTag}
        />
        <Text style={styles.addTag}>{I18n.t('tags')}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {tags.map(this._renderTag)}
        </ScrollView>
        <Button
          title={I18n.t('add')}
          onPress={onPressAddTag}
          buttonStyle={styles.button}
          textStyle={{ color: colors.white }}
          size={'verySmall'}
        />
      </View>
    );
  }
  _renderTag = (item, index) => {
    const { currentTag } = this.props;
    return (
      <Tag
        title={item.tag}
        key={index.toString()}
        isSelected={currentTag.tag === item.tag}
        selectedStyle={styles.selectedStyle}
        selectedTextStyle={styles.selectedTextStyle}
      />
    );
  };
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addTag: {
    fontSize: 16,
    marginRight: 10,
    marginLeft: 5,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 0,
    width: 68,
    marginRight: 10,
  },
  selectedStyle: { backgroundColor: colors.main, borderColor: 'transparent' },
  selectedTextStyle: {
    color: 'white',
  },
});

export default ChooseTags;
