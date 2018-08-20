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
} from '../../../re-kits';
import { base, I18n } from '../../utils';
import InfoCard from './components/InfoCard';
const { colors, TAB_BAR_HEIGHT, NAV_BAR_HEIGHT } = base;
class NotifPage extends Component {
  componentWillMount() {}

  _goBack = () => {
    const { navigation } = this.props;
    this.props.logic('NAVIGATION_BACK', {
      navigation,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: TAB_BAR_HEIGHT,
            paddingTop: NAV_BAR_HEIGHT,
          }}
        >
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
          <InfoCard title={'回复我的'} onPress={() => {}} />
        </ScrollView>
        <NavBar
          title={'Info'}
          // sourceLeft={Assets.arrow_left.source}
          // onPressLeft={this._goBack}
          style={{ position: 'absolute' }}
        />
      </View>
    );
  }
}
NotifPage.propTypes = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default NotifPage;
