import { observable, action, configure } from 'mobx';
import {} from '../../../models';

configure({
  enforceActions: 'always',
});

interface IStore {}
class Store {
  @action setState = (nextState: IStore) => {
    Object.assign(this, nextState);
  };
}
export { Store };
