/*
 * File: /Users/origami/Desktop/timvel/js/singlePages/policy.js
 * Project: /Users/origami/Desktop/timvel
 * Created Date: Sunday May 5th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Sunday May 5th 2019 9:45:39 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Navigation, I18n } from '../utils';
import { Text, NavBar, Assets } from '../../re-kits';
const zhPolicy =
  ' “回溯(timvel)”免责声明\n  1、一切移动客户端用户在下载并浏览“回溯(timvel)”手APP软件时均被视为已经仔细阅读本条款并完全同意。凡以任何方式登陆本APP，或直接、间接使用本APP资料者，均被视为自愿接受本网站相关声明和用户服务协议的约束。\n  2、“回溯(timvel)”手机APP转载的内容并不代表“回溯(timvel)”手机APP之意见及观点，也不意味着本网赞同其观点或证实其内容的真实性。\n  3、“回溯(timvel)”手机APP转载的文字、图片、音视频等资料均由本APP用户提供，其真实性、准确性和合法性由信息发布人负责。“回溯(timvel)”手机APP不提供任何保证，并不承担任何法律责任。\n  4、“回溯(timvel)”手机APP所转载的文字、图片、音视频等资料，如果侵犯了第三方的知识产权或其他权利，责任由作者或转载者本人承担，本APP对此不承担责任。\n  5、“回溯(timvel)”手机APP不保证为向用户提供便利而设置的外部链接的准确性和完整性，同时，对于该外部链接指向的不由“回溯(timvel)”手机APP实际控制的任何网页上的内容，APP手机APP不承担任何责任。\n  6、用户明确并同意其使用“回溯(timvel)”手机APP网络服务所存在的风险将完全由其本人承担；因其使用“回溯(timvel)”手机APP网络服务而产生的一切后果也由其本人承担，“回溯(timvel)”手机APP对此不承担任何责任。\n  7、除“回溯(timvel)”手机APP注明之服务条款外，其它因不当使用本APP而导致的任何意外、疏忽、合约毁坏、诽谤、版权或其他知识产权侵犯及其所造成的任何损失，“回溯(timvel)”手机APP概不负责，亦不承担任何法律责任。\n  8、对于因不可抗力或因黑客攻击、通讯线路中断等“回溯(timvel)”手机APP不能控制的原因造成的网络服务中断或其他缺陷，导致用户不能正常使用“回溯(timvel)”手机APP，“回溯(timvel)”手机APP不承担任何责任，但将尽力减少因此给用户造成的损失或影响。\n  9、本声明未涉及的问题请参见国家有关法律法规，当本声明与国家有关法律法规冲突时，以国家法律法规为准。\n  10、本网站相关声明版权及其修改权、更新权和最终解释权均属“回溯(timvel)”手机APP所有。';
class Policy extends React.Component<IProps> {
  _goBack = () => {
    Navigation.back();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavBar
          title={I18n.t('userPolicy')}
          sourceLeft={Assets.arrow_left.source}
          onPressLeft={this._goBack}
        />
        <ScrollView>
          <Text style={{ marginHorizontal: 20 }}>{zhPolicy}</Text>
        </ScrollView>
      </View>
    );
  }
}
interface IProps {}
export default Policy;
