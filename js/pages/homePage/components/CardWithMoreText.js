import * as React from 'react';
import { StyleSheet, View, Text as Text2 } from 'react-native';
import { Button, Text, Image, Assets } from '../../../../re-kits';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import Wrapper from './MainCardWithSideTimeLine';
import { VibrancyView } from 'react-native-blur';
const { isIOS } = base;
class MoreText extends React.Component {
  componentWillMount() {}

  render() {
    const { post } = this.props;
    let bkImageUrl = post.imageUrls[0];
    bkImageUrl = bkImageUrl ? { uri: bkImageUrl } : Assets.bk2.source;
    const textComp = isIOS ? (
      <VibrancyView
        blurType={'light'}
        blurAmount={10}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <Text style={styles.text}>{post.content}</Text>
      </VibrancyView>
    ) : (
      <Text style={styles.text}>{post.content}</Text>
    );
    return (
      <View style={styles.container}>
        <Image
          source={Assets.bk3.source}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          blur={!isIOS}
          // blur={true}
          // blurType={'light'}
        />
        {textComp}
      </View>
    );
  }
}
MoreText.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'normal',
    // fontStyle: 'italic',
    marginHorizontal: 20,
  },
});

export default MoreText;
