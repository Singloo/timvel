import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image, Assets } from '../../../../re-kits';
import { Styles } from '../../../utils';
class CardWithoutImg extends Component {
  componentWillMount() {}

  render() {
    const { post } = this.props;
    return (
      <View style={styles.container}>
        <Image
          style={Styles.absolute}
          source={Assets.bk1.source}
          blur={true}
          blurType={'dark'}
        />
        <View
          style={{
            paddingHorizontal: 25,
            marginHorizontal: 10,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: 'white',
          }}
        >
          <Text style={styles.text}>{post.content}</Text>
        </View>
      </View>
    );
  }
}
CardWithoutImg.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    // marginHorizontal: 20,
    color: 'white',
  },
});

export default CardWithoutImg;
