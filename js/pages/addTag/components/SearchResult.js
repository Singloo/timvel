import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Tag } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { Styles } = base;
class SearchResult extends Component {
  componentWillMount() {}

  render() {
    const {
      results,
      isEmpty,
      onPressTag,
      onPressAddTag,
      showAddButton,
    } = this.props;
    const renderTags = results.map((item, index) => {
      return (
        <Tag
          title={item.tag}
          popularity={item.popularity}
          onPress={() => {
            onPressTag(item);
          }}
          key={index}
          style={{
            marginHorizontal: 4,
            marginVertical: 4,
          }}
        />
      );
    });
    return (
      <View style={[styles.container, Styles.absolute]}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
        >
          {renderTags}
        </ScrollView>
        {isEmpty && (
          <View
            style={[
              Styles.absolute,
              {
                alignItems: 'center',
              },
            ]}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 50,
              }}
            >
              <Text>{'空空如也....'}</Text>
              {showAddButton && (
                <Button
                  title={'Add'}
                  onPress={onPressAddTag}
                  buttonStyle={{
                    width: 60,
                    height: 30,
                    paddingHorizontal: 0,
                    marginLeft: 10,
                  }}
                  textStyle={{ fontSize: 14 }}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}
SearchResult.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default SearchResult;
