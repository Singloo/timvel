import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button ,Icon,InfiniteText} from '../../../components';
import { base } from '../../../utils';
import PropTypes from 'prop-types';

class UserInfoBar extends Component {
  componentWillMount() {}

  render() {
    const {style}=this.props
    return (
        <View style={[styles.headerBar,style]}>
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
      
    );
  }
}
UserInfoBar.propTypes = {};

const styles = StyleSheet.create({
  headerBar: {
    paddingLeft: 15,
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
});

export default UserInfoBar;
