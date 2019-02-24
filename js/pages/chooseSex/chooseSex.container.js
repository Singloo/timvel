import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import {
  Button,
  NavBar,
  Image,
  InfiniteText,
  Text,
  Assets,
  Choices,
} from '../../../re-kits';
import { base, I18n } from '../../utils';
const { colors } = base;
class ChooseSex extends Component {
  componentWillMount() {}

  componentWillUnmount() {
    this.props.dispatch('CHOOSE_SEX_RESET_STATE');
  }
  _goBack = () => {
    this.props.navigation.goBack();
  };

  _onPressChoice = value => {
    const showConfirm = ['男神', '萌妹', '女神'];
    if (showConfirm.includes(value)) {
      this.props.dispatch('SHOW_ALERT', {
        choices: [
          {
            title: '我保证',
            onPress: () => {
              this.props.dispatch('CHOOSE_SEX_SET_STATE', {
                sex: value,
              });
            },
          },
        ],
        type: 'WARNING',
        cancelTitle: '重新选择',
        content: `你选择了 ${value} ,请保证此选择的正确性,谢谢`,
      });
      return;
    }
    this.props.dispatch('CHOOSE_SEX_SET_STATE', {
      sex: value,
    });
  };

  _onPressFAQ = () => {
    this.props.dispatch('SHOW_ALERT', {
      choices: [
        { title: '然' },
        { title: '好的' },
        {
          title: '恍然大悟',
          onPress: () => {
            this.props.dispatch('SHOW_SNAKE_BAR', {
              content: '明白就好.',
            });
          },
        },
      ],
      type: 'FAQ',
      cancelTitle: '多谢',
      onCancel: () => {
        this.props.dispatch('SHOW_SNAKE_BAR', {
          content: '客气',
        });
      },
      content:
        'Q1. 为什么要获得这些信息?\nA1. 我们希望用户能够真实一些\n\nQ2. 我觉得某些选项具有攻击性\nA2. 你在选择后可以获得一个标签,展示在昵称前方.',
    });
  };

  render() {
    const { sex } = this.props.state;
    let renderMale = [
      '男的',
      '男的肥宅',
      '男的死肥宅',
      '女装爱好者',
      '文艺矫情男',
      '男神',
    ].map((item, index) => {
      return (
        <Choices
          key={index}
          style={{ marginLeft: 10, marginTop: 10 }}
          title={item}
          currentValue={sex}
          onPress={() => this._onPressChoice(item)}
        />
      );
    });
    let renderFemale = [
      '女的',
      '女的肥宅',
      '女的死肥宅',
      '文学少女',
      '萌妹',
      '女神',
    ].map((item, index) => {
      return (
        <Choices
          key={index}
          style={{ marginLeft: 10, marginTop: 10 }}
          title={item}
          currentValue={sex}
          onPress={() => this._onPressChoice(item)}
        />
      );
    });

    let gotChoice = sex.length > 0;
    return (
      <View style={styles.container}>
        <NavBar
          title={'last step ...'}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
          sourceRight={Assets.questionMark.source}
          onPressRight={this._onPressFAQ}
          rightIconStyle={{ marginRight: 10 }}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
            <View style={{ flex: 1 }}>{renderMale}</View>
            <View style={{ flex: 1 }}>{renderFemale}</View>
          </View>
        </ScrollView>
        <Text
          style={[styles.next, gotChoice && { color: colors.main }]}
          onPress={this._onPressNext}
        >
          {'Next'}
        </Text>
      </View>
    );
  }
}
ChooseSex.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  next: {
    fontSize: 25,
    alignSelf: 'center',
    marginBottom: 30,
    color: colors.midGrey,
  },
});

export default ChooseSex;
