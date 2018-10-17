import React, { Component } from 'react';
import { StyleSheet, View, Slider, LayoutAnimation } from 'react-native';
import { Button, Text, BaseTextInput } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import PropTypes from 'prop-types';
const { colors, SCREEN_WIDTH, lenOfText } = base;
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

  _onSliderChange = (value, key) => {
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
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          400,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.scaleXY,
        ),
      );
      this.setState({
        isEditing: true,
      });
      return;
    }
    if (lenOfText(value) > 8) {
      return;
    }
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        400,
        LayoutAnimation.Types.linear,
        LayoutAnimation.Properties.scaleXY,
      ),
    );
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
    let showColorEditor = value.length > 0;
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
              onChangeText={v => {
                onChangeText('customTitle', v, 8);
              }}
              style={styles.textInput}
              value={value}
              {...textInputProps}
            />
          )}
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              textAlignVertical: 'center',
              minWidth: 30,
              height: 30,
              marginVertical: 5,
              paddingTop: 5,
              paddingHorizontal: 5,
              color: `rgb(${r},${g},${b})`,
              borderWidth: 1,
              borderColor: `rgb(${r},${g},${b})`,
              marginLeft: 10,
            }}
          >
            {value}
          </Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Button
              title={isEditing ? 'Confirm' : 'Edit'}
              onPress={this._onPressConfirm}
              buttonStyle={{
                width: 70,
                height: 35,
                paddingHorizontal: 0,
                marginRight: 15,
              }}
            />
          </View>
        </View>

        {showColorEditor &&
          isEditing && (
            <View>
              <View style={styles.sliderContainer}>
                <Slider
                  value={r}
                  minimumValue={0}
                  maximumValue={255}
                  step={1}
                  minimumTrackTintColor={`rgb(${r},0,0)`}
                  // maximumTrackTintColor={`rgb(${255 - r},0,0)`}
                  onValueChange={v => {
                    this._onSliderChange(v, 'r');
                  }}
                  // onSlidingComplete={() => {}}
                />
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  value={g}
                  minimumValue={0}
                  maximumValue={255}
                  step={1}
                  minimumTrackTintColor={`rgb(0,${g},0)`}
                  // maximumTrackTintColor={`rgb(0,${255 - g},0)`}
                  onValueChange={v => {
                    this._onSliderChange(v, 'g');
                  }}
                  // onSlidingComplete={() => {}}
                />
              </View>
              <View style={styles.sliderContainer}>
                <Slider
                  value={b}
                  minimumValue={0}
                  maximumValue={255}
                  step={1}
                  minimumTrackTintColor={`rgb(0,0,${b})`}
                  // maximumTrackTintColor={`rgb(0,0,${255 - b})`}
                  onValueChange={v => {
                    this._onSliderChange(v, 'b');
                  }}
                  // onSlidingComplete={() => {}}
                />
              </View>
            </View>
          )}
      </View>
    );
  }
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
});

export default CustomTitle;
