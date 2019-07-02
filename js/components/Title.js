/*
 * File: /Users/origami/Desktop/timvel/js/components/Title.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday March 14th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday July 2nd 2019 10:19:29 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from '../../re-kits';
class Title extends React.PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   return this.props.title !== nextProps.title;
  // }
  render() {
    const { title, customStyle } = this.props;
    const style = switchTitle(title, customStyle);

    return <Text style={[styles.qing, style]}>{title}</Text>;
  }
}
const switchTitle = (title, customStyle) => {
  switch (title) {
    case '青': {
      return {
        color: '#00ffff',
        borderColor: '#00ffff',
      };
    }

    case '神': {
      return {
        borderColor: '#ffc400',
        color: '#ffc400',
      };
    }

    case '侠': {
      return {
        color: '#00b0ff',
        borderColor: '#00b0ff',
      };
    }

    case '魅': {
      return {
        color: '#ec407a',
        borderColor: '#ec407a',
      };
    }

    case '萌': {
      return {
        color: '#f484b1',
        borderColor: '#f484b1',
      };
    }

    case '邪': {
      return {
        color: '#d500f9',
        borderColor: '#d500f9',
      };
    }

    case '魔': {
      return {
        color: '#311b92',
        borderColor: '#311b92',
      };
    }

    case '妖': {
      return {
        color: '#7cb342',
        borderColor: '#7cb342',
      };
    }

    case '绫': {
      return {
        color: '#4dd0e1',
        borderColor: '#4dd0e1',
      };
    }

    case '鱼唇': {
      return {
        color: '#ff7043',
        borderColor: '#ffc400',
      };
    }

    default:
      if (customStyle) {
        return customStyle;
      }
      break;
  }
};
const styles = StyleSheet.create({
  qing: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    textAlign: 'center',
    marginLeft: 2,
    fontSize: 12,
    borderWidth: 1,
    marginHorizontal: 4,
  },
});

export default Title;
