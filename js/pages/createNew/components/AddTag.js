import * as React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TextInput,
} from 'react-native';
import { base, I18n } from '../../../utils/';
import {
  Touchable,
  Image,
  Assets,
  Text,
  Tag,
  Separator,
} from '../../../../re-kits';
const { Styles, SCREEN_WIDTH, colors, SCREEN_HEIGHT, PADDING_TOP } = base;
class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.animationState = new Animated.Value(0);
    this.animationOpen = Animated.spring(this.animationState, {
      toValue: 1,
      duration: 300,
      bounciness: 10,
    });
    this.animationClose = Animated.timing(this.animationState, {
      toValue: 0,
      duration: 300,
    });

    this.bk = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(33,33,33,0)', 'rgba(33,33,33,0.5)'],
    });
    this.height = this.animationState.interpolate({
      inputRange: [0, 1],
      outputRange: [0, SCREEN_HEIGHT],
    });
  }

  open() {
    const { modelController } = this.props;
    modelController();
    this.animationOpen.start();
  }
  close() {
    const { modelController } = this.props;
    this.animationClose.start(() => {
      modelController();
    });
  }
  render() {
    const { show, modelController, tags, onPress } = this.props;

    const renderTags = tags.map((item, index) => {
      return <Tag title={item} key={index.toString()} />;
    });
    if (show) {
      return (
        <Animated.View
          style={[
            styles.container,
            Styles.absolute,
            { backgroundColor: this.bk },
          ]}
        >
          <Animated.View
            style={[
              styles.contentContainer,
              {
                height: this.height,
              },
            ]}
          >
            <View style={styles.close}>
              <Image
                source={Assets.close.source}
                onPress={() => {
                  this.close();
                }}
                size={'small'}
              />
              <TextInput
                style={styles.search}
                placeholder={I18n.t('noInterested')}
                autoCorrect={true}
                underlineColorAndroid={'transparent'}
              />
              <View style={{ width: 10, backgroundColor: 'transparent' }} />
            </View>
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'flex-end',
                }}
              >
                <Text style={{ fontSize: 25, fontWeight: '200' }}>
                  {I18n.t('current')}
                </Text>
              </View>
              <Separator style={{ marginTop: 5 }} />
              <ScrollView
                style={{ marginLeft: 10, marginTop: 10 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {renderTags}
              </ScrollView>
            </View>

            <Text style={{ marginTop: 10, fontSize: 25, fontWeight: '200' }}>
              {I18n.t('popular')}
            </Text>
            <Separator style={{ marginTop: 10 }} />
            <View style={{ flex: 1 }} />
          </Animated.View>
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: { justifyContent: 'flex-end', zIndex: 2 },
  contentContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  close: {
    paddingTop: PADDING_TOP,
    height: PADDING_TOP + 44 + 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.lightGrey,
  },
  search: {
    borderBottomWidth: 1,
    borderColor: colors.midGrey,
    flex: 1,
    marginHorizontal: 10,
    height: 30,
  },
});

export default AddTag;
