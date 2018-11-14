import * as React from 'react';
import { View, TextInput, ScrollView, Text } from 'react-native';
const textInputProps = {
  autoCorrect: false,
  autoCapitalize: 'none',
};
const addTitle = Comp =>
  class extends React.PureComponent {
    render() {
      const { title, ...childProps } = this.props;
      return (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <Text style={styles.subText}>{title}</Text>
            <Text style={[styles.subText, { color: 'red' }]}>{'*'}</Text>
          </View>
          <TextInput {...childProps} />
        </View>
      );
    }
  };
class Template extends React.Component {
  state = {
    text: '',
    title: '',
    test: '',
  };

  _onChangeText = attribute => value => {
    console.warn(attribute,value)
    this.setState({
      [attribute]: value,
    });
  };

  render() {
    const { test } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
        <ScrollView style={{ flex: 1 }}>
          <TextInput
            {...textInputProps}
            style={styles.textInput}
            value={test}
            onChangeText={this._onChangeText('test')}
          />
          {this.renderTitle()}
          {this.renderContent()}
        </ScrollView>
      </View>
    );
  }
  renderTitle = () => {
    const { title } = this.state;
    const Enhanced = addTitle(TextInput);
    return (
      <Enhanced
        autoCorrect={false}
        autoCapitalize={'none'}
        style={styles.textInput}
        title={'title'}
        value={title}
        onChangeText={this._onChangeText('title')}
      />
    );
  };
  renderContent = () => {
    const { text } = this.state;
    const Enhanced = addTitle(TextInput);
    return (
      <Enhanced
        title={'text'}
        autoCorrect={false}
        autoCapitalize={'none'}
        style={[
          styles.textInput,
          {
            flex: 1,
            minHeight: 200,
            textAlignVertical: 'top',
            borderColor: 'red',
            borderWidth: 1,
          },
        ]}
        multiline={true}
        // value={text}
        // onChangeText={this._onChangeText('text')}
      />
    );
  };
}

const styles = {
  chooseImageWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'red',
    width: 140,
    height: 140,
    backgroundColor: 'white',
  },
  plusMark: {
    fontSize: 60,
    fontWeight: '200',
    color: '#999999',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  textInput: {
    borderRadius: 10,
    height: 40,
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 10,
    textAlignVertical: 'center',
    fontSize: 16,
  },
  subText: {
    fontSize: 14,
    color: '#999999',
  },
};
export default Template;
