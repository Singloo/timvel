import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, BaseTextInput } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { colors } = base;
class InputWithTitle extends Component {
  componentWillMount() {}

  render() {
    const {
      onChangeText,
      title,
      textInputProps,
      value,
      errorMessage,
      errorHandler,
    } = this.props;
    let isError = false;
    if (typeof errorHandler === 'function' && value.length > 0) {
      isError = errorHandler(value);
    }
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.text}>{title}</Text>
          {isError && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
        <BaseTextInput
          onChangeText={value => {
            onChangeText(title, value);
          }}
          style={styles.textInput}
          value={value}
          {...textInputProps}
        />
      </View>
    );
  }
}
InputWithTitle.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: colors.lightGrey,
    height: 35,
    marginTop: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  text: {
    color: colors.depGrey,
    fontSize: 18,
    fontWeight: '200',
    marginLeft: 15,
  },
  errorMessage: {
    color: colors.red,
    fontSize: 14,
    fontWeight: '200',
    marginLeft: 10,
  },
});

export default InputWithTitle;
