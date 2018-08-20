import Container from './comment.container'
import { Setup } from '../../utils'

export default Setup.connect({
  name: 'comment',
  container: Container,
})