import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { Button, NavBar, Image, InfiniteText, Text } from '../../../re-kits';
import { base, I18n } from '../../utils';
const { Styles } = base;
import SplashScreen from 'react-native-splash-screen';
const hello = [
  '你好,人类',
  'Hello,human',
  'こんにちは、人間',
  'Ciao, umani',
  'Hallo, Menschen',
  'Bonjour, les humains',
];
class LaunchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
    };
    this.animationState = new Animated.Value(0);
    this.animation1 = Animated.timing(this.animationState, {
      toValue: 1,
      duration: 1500,
    });
    this.animation2 = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 1500,
    });
    this.animation = Animated.sequence([this.animation1, this.animation2]);
  }
  componentWillMount() {}
  componentDidMount() {
    SplashScreen.hide();
    Animated.loop(this.animation).start();
    this.interval = setInterval(() => {
      const { textIndex } = this.state;
      this.setState({
        textIndex: textIndex + 1,
      });
    }, 3000);
    this.props.logic('INIT_APP');
  }

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };
  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
  }

  render() {
    const { textIndex } = this.state;
    const text = hello[textIndex % hello.length];
    return (
      <View style={[styles.container, Styles.center]}>
        <Animated.View
          style={[
            Styles.absolute,
            {
              backgroundColor: this.animationState.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(33,33,33,0.2)', 'rgba(250,250,250,0.6)'],
              }),
            },
          ]}
        />
        <Animated.Text
          style={[
            { fontSize: 20, fontWeight: '100', marginBottom: 80 },
            {
              color: this.animationState.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(250,250,250,0.6)', 'rgba(33,33,33,1)'],
              }),
              transform: [
                {
                  scale: this.animationState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            },
          ]}
        >
          {text}
        </Animated.Text>
      </View>
    );
  }
}
LaunchPage.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LaunchPage;
