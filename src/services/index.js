export default class Tecnomet {
  axios
  baseUrl

  constructor (axios) {
    this.axios = axios
    this.baseUrl = 'http://localhost:8002/api/'
  }

  getCamilleroSolicitudes () {
    return this.axios.get('http://127.0.0.1:8000/api/v1/solicitud/camilleros')
  }

  login (usuario, method) {
    const url = `${this.baseUrl}camillero`
    return this.axios({
      method,
      url,
      data: usuario
    })
  }
}
