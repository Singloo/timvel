import Container from './sample.container'
import { Setup } from '../../utils'

export default Setup.connect({
  name: 'sample',
  container: Container,
})