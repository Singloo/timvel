import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Text, Styles } from '../../../re-kits';
import { SCREEN_WIDTH, colors, I18n } from '../../utils';
const card_width = SCREEN_WIDTH - 20;
const card_height = (card_width * 3) / 5;
const alertStyles = {
  NORMAL: {
    title: 'Info',
    color: colors.main,
    backgroundColor: colors.main,
  },
  WARNING: {
    title: 'Warning',
    color: colors.red,
    backgroundColor: colors.red,
  },
  NOTIFICATION: {
    title: 'Notification',
    color: colors.green,
    backgroundColor: colors.greenLight,
  },
  FAQ: {
    title: 'FAQ',
    color: colors.lime,
    backgroundColor: colors.lime,
  },
};
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
    this.state = {
      animationState: new Animated.Value(0),
    };
    this.animationStart = Animated.spring(this.state.animationState, {
      toValue: 1,
      useNativeDriver: true,
      speed: 14,
    });
    this.animationDismiss = Animated.timing(this.state.animationState, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    });
  }
  componentDidMount() {}
  componentWillMount() {}
  componentWillUnmount() {}
  componentDidUpdate() {
    const { show } = this.props.state;
    if (show) {
      this._show();
    }
  }
  _onPressChoices = onPress => () => {
    this.dismiss();
    onPress && onPress();
  };
  _renderChoices = () => {
    const { choices } = this.props.state;
    return choices.map((item, index) => {
      return (
        <Text
          key={index}
          style={[styles.choices, item.color && { color: item.color }]}
          onPress={this._onPressChoices(item.onPress)}
        >
          {item.title}
        </Text>
      );
    });
  };

  _show = () => {
    this.state.animationState.setValue(0);
    this.animationStart.start();
  };
  dismiss = () => {
    this.animationDismiss.start(() => {
      this.props.dispatch('ALERT_RESET_STATE');
    });
  };
  render() {
    const { show, type } = this.props.state;
    if (!show) {
      return null;
    }
    let alertStyle = alertStyles[type];
    const scale = this.state.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [0.01, 1],
    });
    const transform = [{ scale }];
    return (
      <View style={[Styles.absolute, styles.container, Styles.center]}>
        <Animated.View
          style={[
            styles.card,
            Styles.shadow,
            {
              borderColor: alertStyle.color,
              transform,
            },
          ]}
        >
          {this._renderTitle()}
          {this._renderContent()}
          {this._renderBottom()}
        </Animated.View>
      </View>
    );
  }
  _renderTitle = () => {
    const { type } = this.props.state;
    let alertStyle = alertStyles[type];
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: alertStyle.backgroundColor,
          paddingBottom: 5,
          marginLeft: 10,
        }}
      >
        <Text style={[styles.title]}>{alertStyle.title}</Text>
      </View>
    );
  };
  _renderContent = () => {
    const { content } = this.props.state;
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{content}</Text>
      </View>
    );
  };
  _renderBottom = () => {
    const { onCancel, cancelTitle } = this.props.state;
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={styles.choices} onPress={this._onPressChoices(onCancel)}>
          {cancelTitle || 'No'}
        </Text>
        {this._renderChoices()}
      </View>
    );
  };
}
Alert.propTypes = {};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(33,33,33,0.3)',
  },
  card: {
    width: card_width,
    minHeight: card_height,
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderBottomWidth: 3,
    marginBottom: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.depGrey,
    // backgroundColor: colors.lightGrey,
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
    flex: 1,
  },
});

export default Alert;
