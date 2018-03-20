import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button ,NavBar} from '../../components';
import { base } from '../../utils';
import LottieView from 'lottie-react-native';
import {BlurView} from 'react-native-blur'
class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      viewRef:null
    }
  }
  componentWillMount() {}

  componentDidMount() {
    this.gradientBK.play();
  }
  componentWillUnmount() {
    this.gradientBK.reset();
  }

  _goBack=()=>{
    const {navigation}=this.props
    this.props.logic('NAVIGATION_BACK',{
      navigation
    })
  }

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
  absoluteBK:{
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0
  }
});

export default Login;
