import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button } from '../../../components'
import { base } from '../../../utils'
import PropTypes from 'prop-types';

const cardWidth = base.SCREEN_WIDTH - 40
const cardHeight = base.SCREEN_WIDTH * 0.618
class MainCard extends Component {

  componentWillMount() {
  }


  render() {
    const {imgUri}=this.props
    return (
      <View style={styles.wrapper}>
      <Image source={{uri:'nintendo_switch'}}/>
        <View style={styles.container}>
        
          </View>
      </View>
    );
  }
}
MainCard.propTypes={
  
}

const styles = StyleSheet.create({
  wrapper: {
    width:cardWidth+40,
    height:cardHeight+20,
    alignItems:'center',
    justifyContent:'center',
  },
  container:{
    backgroundColor:base.colors.white,
    borderRadius:base.realSize(12),
    flex:1,
    width:cardWidth,
    height:cardHeight
  }
});

export default MainCard