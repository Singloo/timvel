/*
 * File: /Users/origami/Desktop/timvel/js/pages/photoBrowser/template.container.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday April 18th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday April 18th 2019 10:22:32 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { Styles, Image, SCREEN_WIDTH } from '../../../re-kits';
import { I18n } from '../../utils';
import { connect2 } from '../../utils/Setup';
import PhotoBrowser from 'react-native-image-zoom-viewer';

@connect2('photoBrowser')
class Sample extends Component {
  componentWillMount() {}
  componentWillUnmount() {
    this.props.dispatch('PHOTO_BROWSER_RESET_STATE');
  }
  _goBack = () => {
    this.props.navigation.goBack();
  };

  _onCancel = () => {
    const { onCancel } = this.props.state;
    if (typeof onCancel === 'function') onCancel();
    this.props.dispatch('PHOTO_BROWSER_RESET_STATE');
  };
  _renderImage = props => {
    const prop = {
      style: props.style,
    };
    if (props.uri) {
      Object.assign(prop, { uri: props.uri });
    } else {
      Object.assign(prop, { source: props.source });
    }
    return <Image {...prop} />;
  };
  render() {
    const { show, imageUrls, index } = this.props.state;
    return (
      // <View style={Styles.absolute}>
      <Modal visible={show} transparent={true} onDismiss={() => {}}>
        <PhotoBrowser
          imageUrls={imageUrls}
          onCancel={this._onCancel}
          index={index}
          renderImage={this._renderImage}
          enableSwipeDown={true}
        />
      </Modal>
      // </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
  },
});

export default Sample;
