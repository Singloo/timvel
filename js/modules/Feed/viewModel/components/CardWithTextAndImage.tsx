import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import {
  Text,
  Image,
  Touchable,
  Styles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  colors,
  Assets,
} from '../../../../../re-kits';
import { IPost } from '../../../../models';
import { get } from 'lodash';
interface IProps {
  post: IPost;
}
class CardWithPureText extends React.PureComponent<IProps> {
    render(){
        return(
            <View>
                
            </View>
        )
    }
}

export default CardWithPureText