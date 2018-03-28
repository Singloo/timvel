import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Icon,
  InfiniteText,
  Text,
  TextInput
} from '../../../re-kits/components';
import { base } from '../../utils';
import LottieView from 'lottie-react-native';
import { BlurView } from 'react-native-blur';
import { Sae } from 'react-native-textinput-effects';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  componentWillMount() {}

  componentDidMount() {
    // this.gradientBK.play();
  }
  componentWillUnmount() {
    // this.gradientBK.reset();
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
        {/* <LottieView
          ref={r => {
            this.gradientBK = r;
          }}
          loop={true}
          speed={0.5}
          source={require('../../lottieFiles/gradient.json')}
          style={styles.absoluteBK}
        /> */}
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'light'}
          style={styles.absoluteBK}
          blurAmount={20}
        />
        <View style={styles.contentContainer}>
        <View>
          <TextInput
          placeholder={'your email'}
          />
          </View>
        <View style={styles.buttonContainer}>
        

          <Button title={'Press me to login'} />
          <Button title={`Don't have an account?`} />
        </View>
        </View>
        <NavBar
          uriLeft={'arrow_left'}
          onPressLeft={this._goBack}
          title={'LogIn or SignUp'}
          style={styles.navBar}
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
    alignItems:'center'
  },
  navBar: {
    position: 'absolute',
    top: 0,
  },
  absoluteBK: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection:'column'
  },
  contentContainer:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center'
  }
});

export default Login;
