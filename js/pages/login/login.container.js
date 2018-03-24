import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, NavBar } from '../../components';
import { base } from '../../utils';
import LottieView from 'lottie-react-native';
import { BlurView } from 'react-native-blur';
import { Sae } from 'react-native-textinput-effects';
import { FontAwesomeIcon } from 'react-native-vector-icons';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  componentWillMount() {}

  componentDidMount() {
    this.gradientBK.play();
  }
  componentWillUnmount() {
    this.gradientBK.reset();
  }

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          ref={r => {
            this.gradientBK = r;
          }}
          loop={true}
          speed={0.5}
          source={require('../../lottieFiles/gradient.json')}
          style={styles.absoluteBK}
        />
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'light'}
          style={styles.absoluteBK}
          blurAmount={20}
        />

        <View style={styles.buttonContainer}>
          <Sae
            label={'Your name'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
          />

          <Sae
            label={'Your password'}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
            // TextInput props
            autoCapitalize={'none'}
            autoCorrect={false}
          />

          <Button title={'Press me to login'} />
          <Button title={`Don't have an account?`} />
        </View>
        <NavBar
          uriLeft={'arrow_left'}
          onPressLeft={this._goBack}
          title={'LogIn or SignUp or Get out'}
        />
      </View>
    );
  }
}
Login.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  absoluteBK: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    flex: 1,
  },
});

export default Login;
