import Axios from 'axios'
import Camillero from '../services/index'

// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'

export default {
  tecnomet: new Camillero(Axios)
}
