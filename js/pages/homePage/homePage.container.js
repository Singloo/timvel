import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Button } from '../../components'
import { base } from '../../utils'
// import store from './homePage.reducer'


class HomePage extends Component {

  componentWillMount() {

  }

  _add = () => {
   
  }


  render() {
    const { count } = this.props.state

    return (
      <View style={styles.container}>
        <Text>{count}</Text>
        <Button
          onPress={this._add}
          title={'touch'}
        />
        <Button
        onPress={() => this.props.navigation.navigate('DrawerOpen')}
        title="Go to notifications"
      />
      <Image
        source={{uri:'pikachu'}}
        style={[{width:100,height:100,tintColor:'yellow'}]}
      />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon:{
    width:50,
    height:50
  }
});

export default HomePage