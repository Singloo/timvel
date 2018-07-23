import Container from './addTag.container'
import { Setup } from '../../utils'

export default Setup.connect({
  name: 'sample',
  container: Container,
})