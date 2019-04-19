/*
 * File: /Users/origami/Desktop/timvel/js/pages/photoBrowser/template.container.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Thursday April 18th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Friday April 19th 2019 9:58:36 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React, { Component } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import { Styles, Image, SCREEN_WIDTH, NavBar, Assets } from '../../../re-kits';
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
          saveToLocalByLongPress={false}
          loadingRender={() => (
            <ActivityIndicator size={'large'} color={'white'} />
          )}
        />
        {this._renderHeader()}
      </Modal>
      // </View>
    );
  }
  _renderImage = props => {
    const prop = {
      style: props.style,
    };
    if (props.uri) {
      Object.assign(prop, { uri: props.uri, processType: 'post' });
    } else {
      Object.assign(prop, { source: props.source });
    }
    return <Image {...prop} />;
  };
  _renderHeader = () => {
    return (
      <NavBar
        style={{ backgroundColor: 'transparent', position: 'absolute', top: 0 }}
        sourceLeft={Assets.close.source}
        onPressLeft={this._onCancel}
        leftTint={'white'}
        leftIconStyle={{ marginLeft: 10 }}
      />
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'white',
  },
});

export default Sample;
