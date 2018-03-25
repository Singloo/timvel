import Container from './user.container';
import { Setup } from '../../utils';

export default Setup.connect({
  name: 'userPage',
  container: Container,
});
