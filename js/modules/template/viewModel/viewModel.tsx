import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '../../../../re-kits';
import { IViewModel, IPresenter } from '../types';
import { TemplatePresenter } from '../presenter';
import {} from '../interactor';
import {} from '../../../store';
import { observer, inject } from 'mobx-react';

interface IProps {
  presenter: TemplatePresenter;
}

// @inject('store')
@observer
class TemplateViewModel extends React.Component<IProps, any>
  implements IViewModel {
  presenter: TemplatePresenter;
  constructor(props: IProps) {
    super(props);
    this.presenter = this.props.presenter;
    this.presenter.setViewModal(this);
  }
  render() {
    return (
      <View>
        <Text>{'Hello'}</Text>
      </View>
    );
  }
}

export default inject()(TemplateViewModel);
