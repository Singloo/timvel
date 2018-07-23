import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Image, Assets, Tag, Text } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { colors } = base;
class ChooseTags extends React.Component {
  render() {
    const { tags, onPressAddTag } = this.props;
    const renderTags = tags.map((item, index) => {
      return <Tag title={item} key={index.toString()} />;
    });
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
          {renderTags}
        </ScrollView>
        <Button
          title={I18n.t('add')}
          onPress={onPressAddTag}
          buttonStyle={{
            paddingVertical: 5,
            paddingHorizontal: 0,
            width: 68,
            marginRight: 10,
          }}
          textStyle={{ color: colors.white }}
          size={'verySmall'}
        />
      </View>
    );
  }
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
});

export default ChooseTags;
