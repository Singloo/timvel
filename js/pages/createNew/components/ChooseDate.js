import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Button, Text } from '../../../../re-kits';
import { colors, I18n } from '../../../utils';
import DatePicker from 'react-native-datepicker';
import DatePrecision from './DatePrecision';
class ChooseDate extends Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(0);
    this.animationStart = Animated.timing(this.animationState, {
      toValue: 1,
      duration: 200,
    });
    this.animationDismiss = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 200,
    });
    // this.animation = Animated.sequence([
    //   this.animationStart,
    //   this.animationDismiss,
    // ]);
  }
  componentWillMount() {}
  componentWillUnmount() {
    this.animation = null;
  }
  onChangeAnimation() {
    this.animation = null;
    this.animation = Animated.sequence([
      this.animationStart,
      this.animationDismiss,
    ]).start();
  }

  render() {
    const { onPressToday } = this.props;
    let backgroundColor = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255,255,255,1)', 'rgba(255,205,210,0.6)'],
    });
    return (
      <Animated.View
        style={[styles.container, { backgroundColor: backgroundColor }]}
      >
        {/* <Text style={styles.text}>{I18n.t('happenedAt')}</Text> */}
        {this._renderDatePrecision()}
        {this._renderDatePicker()}
        <Button
          title={I18n.t('today')}
          onPress={onPressToday}
          type={'mainBlank'}
          buttonStyle={{
            paddingVertical: 5,
            paddingHorizontal: 0,
            width: 68,
            marginRight: 10,
          }}
          textStyle={{}}
          size={'verySmall'}
        />
      </Animated.View>
    );
  }
  _renderDatePrecision = () => {
    const {
      datePrecision,
      date,
      onChangeDatePrecision,
      onSwitchDatePrecision,
    } = this.props;
    return (
      <DatePrecision
        datePrecision={datePrecision}
        date={date}
        onChangeDatePrecision={onChangeDatePrecision}
        onPress={onSwitchDatePrecision}
      />
    );
  };

  _renderDatePicker = () => {
    const { date, onChangeDate } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <DatePicker
          style={{}}
          date={date}
          mode={'date'}
          placeholder={'select date'}
          format={'YYYY-MM-DD'}
          // minDate={"2016-05-01"}
          // maxDate={"2016-06-01"}
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          showIcon={false}
          customStyles={{
            dateInput: {
              borderColor: 'transparent',
              borderWidth: 0,
            },
            dateText: {
              fontSize: 16,
            },
            dateTouchBody: {
              // backgroundColor: 'red',
              width: 150,
            },
          }}
          onDateChange={onChangeDate}
        />
      </View>
    );
  };
}
ChooseDate.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 5,
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    letterSpacing: 1,
  },
});

export default ChooseDate;
