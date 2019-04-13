/*
 * File: /Users/origami/Desktop/timvel/js/pages/postByTag/components/GradientSideBar.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Saturday April 13th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Saturday April 13th 2019 3:25:23 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import {} from 'react-native';
import {} from '../../../../re-kits';
import LinearGradient from 'react-native-linear-gradient';
class GradientSideBar extends React.PureComponent {
  render() {
    const { style } = this.props;
    return (
      <LinearGradient
        colors={['#444444', '#e0e0e0']}
        style={[{ width: 3 }, style]}
      />
    );
  }
}

export default GradientSideBar;
