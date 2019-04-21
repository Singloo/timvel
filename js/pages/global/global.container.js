import React from 'react';
import {} from 'react-native';
import {} from '../../../re-kits';
import {} from '../../utils';
import LoadingView from './components/LoadingView';
class Global extends React.Component {
  render() {
    const { isLoading } = this.props.state;
    if (isLoading) {
      return <LoadingView />;
    }
    return null;
  }
}

export default Global;
