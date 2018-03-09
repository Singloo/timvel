import Container from './shopPage.container'
import { Setup } from '../../utils'

export default Setup.connect({
  name: 'shopPage',
  container: Container,
})