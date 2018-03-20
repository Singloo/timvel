import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, findNodeHandle } from 'react-native';
import { Button } from '../../components';
import { base } from '../../utils';
import { BlurView } from 'react-native-blur';
import Tab from './components/Tab';
class Tabbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewRef: null,
    };
  }
  componentWillMount() {}

  imageLoaded() {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    const { navigation, renderIcon, jumpToIndex } = this.props;
    const index = navigation.state.index;
    const activeTintColor = base.colors.main;
    const inactiveTintColor = base.colors.midGrey;
    return (
      <View style={styles.container}>
        {!base.isIOS && (
          <View
            ref={r => {
              this.backgroundImage = r;
            }}
            onLayout={this.imageLoaded.bind(this)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        )}
        <BlurView
          viewRef={this.state.viewRef}
          blurType={'light'}
          style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
          blurAmount={10}
        />
        <Tab
          uri={'eu_bird'}
          onPress={jumpToIndex.bind(this, 0)}
          // tintColor={index == 0 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
        <Tab
          uri={'eu_bosk'}
          onPress={jumpToIndex.bind(this, 1)}
          // tintColor={index == 1 ? activeTintColor : inactiveTintColor}
          // size={'large'}
          // title={'home'}
        />

        {/* <Tab
          uri={'eu_deer'}
          size={'large'}
          style={{position:'relative',backgroundColor:'transparent',borderRadius:30,width:60,height:60,bottom:20}}
        /> */}

        <Tab
          uri={'eu_cactus'}
          onPress={jumpToIndex.bind(this, 2)}
          // tintColor={index == 2 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
        <Tab
          uri={'eu_fox'}
          onPress={jumpToIndex.bind(this, 3)}
          // tintColor={index == 3 ? activeTintColor : inactiveTintColor}
          // title={'home'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    height: 48,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Tabbar;
