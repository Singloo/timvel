import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, findNodeHandle } from 'react-native';
import { Button, Icon, InfiniteText } from '../../../components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';
import { BlurView } from 'react-native-blur';
import LinearGradient from 'react-native-linear-gradient';
const cardWidth = base.SCREEN_WIDTH - 20;
const cardHeight = base.SCREEN_WIDTH * 0.618;
class MainCard extends Component {
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
    const { imgUri } = this.props;
    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.container, base.shadow]}>
          <Image
            ref={r => {
              this.backgroundImage = r;
            }}
            source={{ uri: 'bk1' }}
            style={styles.absoluteBK}
            onLoadEnd={this.imageLoaded.bind(this)}
          />
          <BlurView
            viewRef={this.state.viewRef}
            blurType={'light'}
            style={styles.absoluteBK}
            blurAmount={2}
          />
        </View>
        <View style={[styles.headerBar,{}]}>
          <Icon
            uri={'bk2'}
            size={60}
            // isRound={true}
            resizeMode={'cover'}
            style={[{}, base.shadow]}
          />
          <View style={styles.headerTextContainer}>
            <InfiniteText
              style={{}}
              text={'Lilith'}
              textStyle={styles.username}
            />
            <InfiniteText
              style={{}}
              text={'welcome back,how are you today,'}
              textStyle={styles.title}
            />
          </View>
          <View style={{ justifyContent: 'flex-end' }}>
            <Icon
              uri={'add'}
              tintColor={'white'}
              style={{ alignSelf: 'flex-end', marginRight: 2 }}
            />
          </View>
        </View>

        <View style={styles.bottomBar}>
          <LinearGradient
            colors={['rgba(33,33,33,0)', 'rgba(33,33,33,0.6)']}
            locations={[0.2, 1]}
            style={styles.absoluteBK}
          />
          <Text
            style={[
              styles.timeLabel,
              { fontSize: 25, marginRight: 5, fontWeight: '300' },
            ]}
          >
            {'From:'}
          </Text>
          <Text style={[styles.timeLabel, { marginBottom: 2 }]}>
            {'2018-3-16 17:12:2'}
          </Text>
        </View>
      </View>
    );
  }
}
MainCard.propTypes = {};

const styles = StyleSheet.create({
  wrapper: {
    width: cardWidth + 20,
    height: cardHeight + 20 + 30,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    paddingBottom: 10,
  },
  container: {
    width: cardWidth,
    height: cardHeight,
  },
  absoluteBK: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headerBar: {
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
    paddingLeft: 15,
    marginTop: 10,
    flexDirection: 'row',
    height:60
  },
  username: {
    fontSize: 17,
    color: base.colors.depGrey,
  },
  title: {
    color: 'black',
    fontWeight: '100',
    fontSize: 22,
    letterSpacing: 1,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 20,
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 16,
    color: base.colors.white,
    fontWeight: '100',
    letterSpacing: 1,
  },
});

export default MainCard;
