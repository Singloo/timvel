import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  AnimatedLogo,
} from '../../../re-kits';
import { base, I18n, OSS } from '../../utils';
const { Styles, SCREEN_WIDTH, randomItem, colors } = base;
import SplashScreen from 'react-native-splash-screen';
const hello = [
  '你好,人类',
  'Hello,human',
  'こんにちは、人間',
  'Ciao, umani',
  'Hallo, Menschen',
  'Bonjour, les humains',
];
const AUTHOR_NAME = [
  'Rick Sanchez',
  '杨同学',
  '杨某人',
  '不愿透露姓名的杨同学',
  'Human',
];
class LaunchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
    };
    this.authorName;
  }
  componentWillMount() {
    this.authorName = randomItem(AUTHOR_NAME);
  }
  componentDidMount() {
    SplashScreen.hide();
    this.props.dispatch('INIT_APP');
  }

  _goBack = () => {
    this.props.navigation.goBack();
  };
  componentWillUnmount() {
    // this.interval && clearInterval(this.interval);
  }

  render() {
    const { textIndex } = this.state;
    const text = hello[textIndex % hello.length];
    return (
      <Animated.View
        style={[
          styles.container,
          Styles.center,
          // {
          //   backgroundColor: this.animationState.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: ['rgba(33,33,33,0.2)', 'rgba(250,250,250,0.6)'],
          //   }),
          // },
        ]}
      >
        {/* <Animated.View
          style={[
            Styles.absolute,
            {
              backgroundColor: this.animationState.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgba(33,33,33,0.2)', 'rgba(250,250,250,0.6)'],
              }),
            },
          ]}
        /> */}
        {/* <Animated.Text
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
        </Animated.Text> */}
        <AnimatedLogo style={{ marginBottom: 100 }} />
        <Text
          style={{
            position: 'absolute',
            bottom: 30,
            alignSelf: 'center',
            fontSize: 10,
            color: colors.midGrey,
          }}
        >{`Made with ❤️ by ${this.authorName}`}</Text>
      </Animated.View>
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
