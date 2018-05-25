import Container from './login.container';
import { Setup } from '../../utils';

export default Setup.connect({
  name: 'login',
  container: Container,
});
