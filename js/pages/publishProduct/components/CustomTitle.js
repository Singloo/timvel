import React, { Component } from 'react';
import { StyleSheet, View, LayoutAnimation } from 'react-native';
import { Button, Text, BaseTextInput } from '../../../../re-kits';
import { colors, SCREEN_WIDTH, lenOfText, I18n } from '../../../utils';
import Slider from '@react-native-community/slider';
const showLayoutAnimation = () => {
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      400,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.scaleXY,
    ),
  );
};
class CustomTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      r: 29,
      g: 233,
      b: 182,
      isEditing: true,
    };
  }
  componentWillMount() {}

  _onSliderChange = key => value => {
    this.setState({
      [key]: value,
    });
  };

  _onPressConfirm = () => {
    const { onPressConfirm, value } = this.props;
    const { r, g, b, isEditing } = this.state;
    if (value.length === 0) {
      return;
    }
    if (!isEditing) {
      showLayoutAnimation();
      this.setState({
        isEditing: true,
      });
      return;
    }
    if (lenOfText(value) > 8) {
      return;
    }
    showLayoutAnimation();
    this.setState({
      isEditing: false,
    });
    onPressConfirm({
      title: value,
      color: `rgb(${r},${g},${b})`,
    });
  };
  render() {
    const { onChangeText, textInputProps, value } = this.props;
    const { r, g, b, isEditing } = this.state;
    const showColorEditor = value.length > 0;
    const dynamicColor = `rgb(${r},${g},${b})`;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
          }}
        >
          {isEditing && (
            <BaseTextInput
              onChangeText={onChangeText}
              style={styles.textInput}
              value={value}
              {...textInputProps}
            />
          )}
          <Text
            style={[
              styles.titleStyle,
              {
                color: dynamicColor,
                borderColor: dynamicColor,
              },
            ]}
          >
            {value}
          </Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Button
              title={isEditing ? 'Confirm' : 'Edit'}
              onPress={this._onPressConfirm}
              buttonStyle={styles.confirmButton}
            />
          </View>
        </View>

        {showColorEditor && isEditing && (
          <View style={{ paddingHorizontal: 20 }}>
            {this._renderSlider({
              value: r,
              minimumTrackTintColor: `rgb(${r},0,0)`,
              onValueChange: this._onSliderChange('r'),
            })}
            {this._renderSlider({
              value: g,
              minimumTrackTintColor: `rgb(0,${g},0)`,
              onValueChange: this._onSliderChange('g'),
            })}
            {this._renderSlider({
              value: b,
              minimumTrackTintColor: `rgb(0,0,${b})`,
              onValueChange: this._onSliderChange('b'),
            })}
          </View>
        )}
      </View>
    );
  }
  _renderSlider = ({ value, minimumTrackTintColor, onValueChange }) => {
    return (
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={255}
        step={1}
        minimumTrackTintColor={minimumTrackTintColor}
        // maximumTrackTintColor={`rgb(0,0,${255 - b})`}
        onValueChange={onValueChange}
        // onSlidingComplete={() => {}}
      />
    );
  };
}
CustomTitle.propTypes = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    marginVertical: 5,
  },
  textInput: {
    backgroundColor: colors.lightGrey,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    width: SCREEN_WIDTH / 2,
  },
  sliderContainer: {
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    minWidth: 30,
    height: 30,
    marginVertical: 5,
    paddingTop: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    marginLeft: 10,
  },
  confirmButton: {
    width: 70,
    height: 35,
    paddingHorizontal: 0,
    marginRight: 15,
  },
});

export default CustomTitle;
