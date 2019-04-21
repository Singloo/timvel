/*
 * File: /Users/origami/Desktop/timvel/js/pages/camera/template.container.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday April 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday April 21st 2019 4:04:28 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {
  NavBar,
  Text,
  Assets,
  Touchable,
  colors,
  Styles,
  Image,
  SCREEN_WIDTH,
} from '../../../re-kits';
import {
  I18n,
  curried,
  $UPLOAD_IMAGES,
  User,
  subscribeUploadImages,
  OSS,
} from '../../utils';
import { connect2 } from '../../utils/Setup';
import { RNCamera } from 'react-native-camera';
@connect2('camera')
class Sample extends React.Component {
  componentWillUnmount() {
    this.subscription && this.subscription.unsubscribe();
    this.props.dispatch('CAMERA_RESET_STATE');
  }
  componentDidMount() {
    this._onUploadFinish();
  }
  _onUploadFinish = () => {
    this.subscription = subscribeUploadImages().subscribe(
      ({ image, imageUrl }) => {
        const { currentImage } = this.props.state;
        if (currentImage.uri === image.path) {
          this._setState({
            currentImage: {
              ...currentImage,
              imageUrl,
            },
          });
        }
      },
    );
  };
  _goBack = () => {
    this.props.navigation.goBack();
  };
  _takePicture = async () => {
    if (this.camera) {
      try {
        const options = { quality: 0.5, base64: true, fixOrientation: true };
        const data = await this.camera.takePictureAsync(options);
        $UPLOAD_IMAGES.next({
          path: data.uri,
          ossPath: User.objectId,
        });
        this._setState({
          currentImage: {
            uri: data.uri,
            width: data.width,
            height: data.height,
          },
        });
      } catch (error) {
        console.warn(error);
        this.props.dispatch('SHOW_SNAKE_BAR', {
          type: 'ERROR',
          content: 'Encountered some problems...',
        });
      }
    }
  };
  _onConfirm = async () => {
    try {
      const { currentImage } = this.props.state;
      let imageUrl;
      if (currentImage.imageUrl) {
        imageUrl = currentImage.imageUrl;
      } else {
        this.props.dispatch('GLOBAL_SET_STATE', {
          isLoading: true,
        });
        this.subscription && this.subscription.unsubscribe();
        imageUrl = await OSS.upLoadImage(currentImage.uri, {
          ossPath: User.objectId,
        });
      }
      await User.updateAvatar(imageUrl);
      this.props.dispatch('SHOW_SNAKE_BAR', {
        content: 'Avatar changed successfully',
      });
      this._goBack();
    } catch (error) {
      console.warn(error);
      this.props.dispatch('SHOW_SNAKE_BAR', {
        type: 'ERROR',
        content: 'Network error...',
      });
    } finally {
      this.props.dispatch('GLOBAL_SET_STATE', {
        isLoading: false,
      });
    }
  };
  _setState = nextState => this.props.dispatch('CAMERA_SET_STATE', nextState);
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} />
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1 }}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          // onGoogleVisionBarcodesDetected={({ barcodes }) => {
          //   console.log(barcodes);
          // }}
        >
          {this._renderChildren}
        </RNCamera>
        <NavBar
          // title={'welcome'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 0,
          }}
          blur={false}
        />
        {this._renderConfirm()}
      </View>
    );
  }
  _renderChildren = ({ camera, status, recordAudioPermissionStatus }) => {
    if (status !== 'READY') return <View />;
    return (
      <Touchable onPress={this._takePicture} style={styles.capture}>
        <Text style={{ fontSize: 14 }}> {'SNAP'} </Text>
      </Touchable>
    );
  };
  _renderConfirm = () => {
    const { currentImage } = this.props.state;
    if (!currentImage) return null;
    return (
      <View
        style={[Styles.absolute, { backgroundColor: 'rgba(250,250,250,0.5)' }]}
      >
        <View style={styles.imageContainer}>
          <Image
            uri={currentImage.uri}
            style={{
              width: SCREEN_WIDTH - 60,
              height: SCREEN_WIDTH,
            }}
          />
          <View style={{ paddingHorizontal: 30, marginTop: 40 }}>
            <Text style={{ fontSize: 30 }}>{'这样可以吗?'}</Text>
            <View style={styles.textContainer}>
              <Text
                style={{ fontSize: 25, color: colors.main }}
                onPress={curried(this._setState)({ currentImage: null })}
              >
                {'不行'}
              </Text>
              <Text
                style={{ fontSize: 25, color: colors.main }}
                onPress={this._onConfirm}
              >
                {'好'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  capture: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: colors.white,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginTop: 50,
    paddingBottom: 30,
    marginHorizontal: 30,
    backgroundColor: colors.white,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default Sample;
