<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Mis Colaciones
      <router-link slot="right" to="/tables" class="button">
        Mis solicitudes
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <!-- <profile-update-form class="tile is-child" /> -->
        <card-component title="Colaciones" icon="clock" class="tile is-child">
          <hr />
        <b-field label="Seleccione una colación" label-position="on-border" >
            <b-select placeholder="Seleccione una por favor" v-model="colacion">
                <option
                    v-for="option in colaciones"
                    :value="option.id"
                    :key="option.id">
                    {{ option.nombre }}
                </option>
            </b-select>
            <p class="control">
                <b-button @click="aceptarColacion" class="button is-success">Aceptar</b-button>
            </p>
        </b-field>

        </card-component>
      </tiles>
      <!-- <password-update-form /> -->
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
// import ProfileUpdateForm from '@/components/ProfileUpdateForm'
// import PasswordUpdateForm from '@/components/PasswordUpdateForm'
import Tiles from '@/components/Tiles'
import Axios from 'axios'
export default {
  name: 'Profile',
  components: {
    Tiles,
    // PasswordUpdateForm,
    // ProfileUpdateForm,
    HeroBar,
    TitleBar,
    CardComponent
  },
  data () {
    return {
      colaciones: [],
      colacion: null
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Colaciones']
    },
    ...mapState(['userName', 'userEmail', 'userId'])
  },
  created () {
    if (!this.userName) {
      this.$router.push('/')
    }
    this.getData()
  },
  methods: {
    async getData () {
      const data = await Axios.get('http://127.0.0.1:8000/api/v1/solicitud/colaciones')
      this.colaciones = data.data
    },
    async aceptarColacion () {
      const respuesta = await this.$store.state.services.tecnomet.pedirColacion(this.userId, this.colacion)
      if (respuesta.status === 200) {
        if (respuesta.data.estado === 'ok') {
          this.$buefy.snackbar.open({
            message: 'Se informó con exito su hora de descanso',
            queue: false
          })

          this.$router.push('/tables')
        }
      }
    }
  }
}
</script>
