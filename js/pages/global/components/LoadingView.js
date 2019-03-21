import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Assets } from '../../../../re-kits';
import { Styles, realSize, I18n } from '../../../utils';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

class LoadingView extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  componentDidMount() {
    this._lottie && this._lottie.play();
  }

  componentWillUnmount() {
    this._lottie && this._lottie.reset();
  }

  render() {
    const { children } = this.props;
    return (
      <View
        style={[
          Styles.absolute,
          Styles.center,
          { backgroundColor: 'rgba(33,33,33,0.6)' },
        ]}
      >
        <View>
          <LottieView
            ref={r => (this._lottie = r)}
            source={Assets.LoadingDotsDown.source}
            loop={true}
            speed={1}
            style={{
              width: realSize(375),
              height: realSize(375),
              transform: [{ scale: 1 }],
            }}
          />
        </View>
        {children}
      </View>
    );
  }
}
LoadingView.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LoadingView;
