import Container from './addTag.container';
import { Setup } from '../../utils';

export default Setup.connect({
  name: 'addTag',
  container: Container,
  stateMapper: state => ({
    global: state.global,
    state: state.addTag,
    createNew: state.createNew,
  }),
  withRef: true,
});
