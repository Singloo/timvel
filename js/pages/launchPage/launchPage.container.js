import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { Button, NavBar, Image, InfiniteText, Text } from '../../../re-kits';
import { base, I18n } from '../../utils';
const { Styles } = base;
import SplashScreen from 'react-native-splash-screen';
class LaunchPage extends Component {
  constructor(props) {
    super(props);
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
    this.props.logic('INIT_APP');
  }

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  render() {
    return (
      <View style={[styles.container, Styles.center]}>
        <Animated.Text
          style={[
            { fontSize: 25, fontWeight: '100', marginBottom: 80 },
            {
              opacity: this.animationState.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.6],
              }),
              transform: [
                {
                  scale: this.animationState.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            },
          ]}
        >
          {'welcome'}
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
