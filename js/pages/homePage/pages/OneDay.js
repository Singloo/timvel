import * as React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  ScrollView,
  LayoutAnimation,
} from 'react-native';
import { Button, Image, Text, Assets } from '../../../../re-kits';
import { base, I18n } from '../../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import { BlurView } from 'react-native-blur';
import Moment from 'moment';
const { Styles, SCREEN_WIDTH, colors, isIOS } = base;
class OneDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
    };
    this.animtion = LayoutAnimation.create(
      400,
      LayoutAnimation.Types.easeIn,
      LayoutAnimation.Properties.opacity,
    );
  }
  componentDidUpdate() {
    const { date, show } = this.props;
    if (show && this.state.date.length < 1) {
      this.setState({
        date: date,
      });
    }
  }

  open() {
    const { modalContronller } = this.props;
    LayoutAnimation.configureNext(this.animtion);
    modalContronller(true);
  }

  close() {
    const { modalContronller } = this.props;
    LayoutAnimation.configureNext(this.animtion);
    modalContronller(false);
  }
  render() {
    const { show, onChooseDate } = this.props;
    const { date } = this.state;
    if (show === false) {
      return null;
    }
    let markedDates = {};
    markedDates[date] = { selected: true, color: 'green', textColor: 'white' };
    markedDates['2018-7-15'] = {
      selected: true,
      color: 'green',
      textColor: 'white',
    };
    return (
      <View style={[Styles.absolute, styles.container]}>
        {isIOS && (
          <BlurView
            blurType={'light'}
            style={Styles.absolute}
            blurAmount={10}
          />
        )}
        <DatePicker
          style={{ width: SCREEN_WIDTH, alignSelf: 'center' }}
          date={date}
          mode={'date'}
          placeholder={'select date'}
          format={'YYYY-MM-DD'}
          showIcon={false}
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          customStyles={{
            dateInput: {
              borderColor: 'transparent',
            },
            dateText: {
              fontSize: 20,
              fontWeight: '200',
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({ date });
          }}
        />
        <Calendar
          current={date}
          style={styles.calendar}
          theme={{
            backgroundColor: colors.transparent,
            calendarBackground: colors.transparent,
            textSectionTitleColor: colors.midGrey,
            selectedDayBackgroundColor: colors.main,
            selectedDayTextColor: colors.white,
            todayTextColor: colors.main,
            dayTextColor: colors.depGrey,
            textDisabledColor: colors.midGrey,
            dotColor: colors.main,
            // selectedDotColor: colors.white,
            arrowColor: colors.amber,
            monthTextColor: colors.transparent,
            // textDayFontFamily: 'monospace',
            // textMonthFontFamily: 'monospace',
            // textDayHeaderFontFamily: 'monospace',
            textMonthFontWeight: 'bold',
            // textDayFontSize: 16,
            // textMonthFontSize: 16,
            // textDayHeaderFontSize: 16
          }}
          markedDates={markedDates}
          onDayPress={day => {
            this.setState({ date: day.dateString });
          }}
          monthFormat={'yyyy MM'}
          onMonthChange={month => {
            this.setState({ date: month.dateString });
          }}
          hideArrows={false}
          hideExtraDays={false}
          disableMonthChange={false}
          firstDay={1}
          hideDayNames={false}
        />
        <View style={styles.textContainer}>
          <Text
            style={styles.textStyle}
            onPress={() => {
              this.close();
            }}
          >
            {I18n.t('cancel')}
          </Text>

          <Text
            style={styles.textStyle}
            onPress={() => {
              onChooseDate(date);
              this.close();
            }}
          >
            {I18n.t('confirm')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: isIOS ? colors.transparent : 'rgba(250,250,250,0.7)',
    justifyContent: 'center',
  },
  calendar: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // borderColor: 'gray',
    height: 350,
    width: SCREEN_WIDTH - 20,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 100,
  },
  textStyle: {
    fontSize: 25,
    fontWeight: '200',
    color: 'black',
  },
});

export default OneDay;
