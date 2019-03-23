import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, TextInput } from 'react-native';
import { Button, Text, Selectors } from '../../../../re-kits';
import { realSize, colors, I18n } from '../../../utils';
import PropTypes from 'prop-types';
class ChooseWeather extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}

  render() {
    const {
      weatherInfo,
      onChangeWeather,
      // onChangeTemperature,
      onPressAutoGetWeather,
      isLoading,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{'Weather:'}</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{ alignSelf: 'center', marginHorizontal: 10, fontSize: 15 }}
          >
            {(weatherInfo.temperature || 23) + ' ℃'}
          </Text>
          <Selectors
            value={weatherInfo.weather}
            onChangeValue={onChangeWeather}
          />
        </View>
        <View style={{ marginRight: 10, flexDirection: 'row' }}>
          {isLoading ? (
            <ActivityIndicator style={{ marginRight: 5 }} />
          ) : (
            <View style={{ width: 25 }} />
          )}
          <Button
            title={'AUTO'}
            onPress={onPressAutoGetWeather}
            type={'mainBlank'}
            buttonStyle={{
              paddingVertical: 5,
              paddingHorizontal: 0,
              width: 68,
            }}
            size={'verySmall'}
          />
        </View>
      </View>
    );
  }
}
ChooseWeather.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    letterSpacing: 1,
  },
});

export default ChooseWeather;
