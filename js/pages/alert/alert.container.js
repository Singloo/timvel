import React, { Component } from 'react';
import { StyleSheet, View, Animated, LayoutAnimation } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
} from '../../../re-kits';
import { base, I18n } from '../../utils';
const { Styles, SCREEN_WIDTH, colors } = base;
const card_width = SCREEN_WIDTH - 20;
const card_height = card_width * 3 / 5;

/**
 *
 *
 * @interface choices
 * `title:string,
 * `onPress: function
 * textColor: string
 */
const initialState = {
  show: false,
  choices: [],
  cancelTitle: null,
  type: 'NORMAL',
  onCancel: null,
  content: '',
};
class Alert extends Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(0);
    this.animationStart = Animated.spring(this.animationState, {
      toValue: 1,
      useNativeDriver: true,
    });
    this.animationDismiss = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });
  }
  componentWillMount() {}

  componentDidUpdate() {
    const { show } = this.props.state;
    if (show) {
      this._show();
    }
  }
  _renderChoices = () => {
    const { choices } = this.props.state;
    return choices.map((item, index) => {
      return (
        <Text
          key={index}
          style={[styles.choices, item.textColor && { color: item.textColor }]}
          onPress={() => {
            this._dismiss();
            item.onPress && item.onPress();
          }}
        >
          {item.title}
        </Text>
      );
    });
  };

  _show = () => {
    this.animationState.setValue(0);
    this.animationStart.start();
  };
  _dismiss = () => {
    this.animationDismiss.start(() => {
      this.props.logic('ALERT_SET_STATE', {
        ...initialState,
      });
    });
  };
  render() {
    const { show, content, type, cancelTitle, onCancel } = this.props.state;
    if (!show) {
      return null;
    }
    const alertStyles = {
      NORMAL: {
        title: 'Info',
        color: colors.main,
      },
      WARNING: {
        title: 'Warning',
        color: colors.red,
      },
      NOTIFICATION: {
        title: 'Notification',
        color: colors.green,
      },
    };
    let alertStyle = alertStyles[type];
    return (
      <View style={[Styles.absolute, styles.container, Styles.center]}>
        <Animated.View
          style={[
            styles.card,
            Styles.shadow,
            {
              borderColor: alertStyle.color,
              transform: [
                {
                  scale: this.animationState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.01, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>{alertStyle.title}</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.content}>{content}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text
              style={styles.choices}
              onPress={() => {
                this._dismiss();
                onCancel && onCancel();
              }}
            >
              {cancelTitle || 'No'}
            </Text>
            {this._renderChoices()}
          </View>
        </Animated.View>
      </View>
    );
  }
}
Alert.propTypes = {};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(33,33,33,0.3)',
  },
  card: {
    width: card_width,
    height: card_height,
    backgroundColor: colors.white,
    padding: 10,
    borderBottomWidth: 3,
    // borderColor: colors.main,
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.depGrey,
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  choices: {
    marginHorizontal: 10,
    marginLeft: 15,
    fontSize: 25,
    fontWeight: '200',
  },
  content: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Alert;
