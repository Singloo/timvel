import Container from './testPage.container';
import { Setup } from '../../utils';

export default Setup.connect({
  name: 'testPage',
  container: Container,
});
