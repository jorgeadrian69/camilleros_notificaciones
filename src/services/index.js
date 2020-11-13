export default class Tecnomet {
  axios
  baseUrl

  constructor (axios) {
    this.axios = axios
    this.baseUrl = 'http://10.0.0.10/ldap/public/api/'
    this.urlApi = 'http://10.0.0.10/camilleros_app/public/api/v1/'
  }

  getCamilleroSolicitudes (camillero) {
    return this.axios.get(`${this.urlApi}solicitud/camilleros/${camillero}`)
  }

  login (usuario, method) {
    const url = `${this.baseUrl}camillero`
    return this.axios({
      method,
      url,
      data: usuario
    })
  }

  camillerosTienePermisos (username) {
    const url = `${this.urlApi}solicitud/checkcamillero`
    const method = 'post'
    return this.axios({
      method,
      url,
      data: { username: username }
    })
  }

  cambiarEstadoSolicitud (usuario) {
    const url = `${this.urlApi}solicitud/cambiar`
    const method = 'post'
    return this.axios({
      method,
      url,
      data: usuario
    })
  }

  rechazarSolicitud (solicitud) {
    const url = `${this.urlApi}solicitud/rechazo`
    const method = 'post'
    return this.axios({
      method,
      url,
      data: solicitud
    })
  }

  motivosRechazos () {
    return this.axios.get(`${this.urlApi}solicitud/rechazos`)
  }

  telefonos () {
    return this.axios.get(`${this.urlApi}solicitud/telefonos`)
  }
}
