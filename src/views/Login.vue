<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Ingreso al sistema
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Formulario de Login" icon="ballot">
        <form @submit.prevent="submit">
          <div class="modal-card" style="width: auto">
            <section class="modal-card-body">
              <b-field label="Usuario de Windows">
                <b-input v-model="form.username" placeholder="Tu usuario" required></b-input>
              </b-field>
              <b-field label="Contraseña">
                <b-input
                  type="password"
                  v-model="form.password"
                  password-reveal
                  placeholder="Tu Contraseña"
                  required
                ></b-input>
              </b-field>
              <b-field label="N° de Celular">
                 <b-select placeholder="Seleccioná un teléfono" required expanded>
                  <option
                      v-for="option in allTelefonos"
                      :value="option.id"
                      :key="option.id">
                      {{ option.id }}
                  </option>
                </b-select>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <div class="align-buttons">
                <button class="button is-primary" type="submit">Ingresar</button>
              </div>
            </footer>
          </div>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Login',
  components: {
    HeroBar,
    CardComponent,
    TitleBar
  },
  data () {
    return {
      isLoading: true,
      allTelefonos: [],
      form: {
        username: null,
        password: null
      }
    }
  },
  created () {
    this.telefonos()
  },
  computed: {
    titleStack () {
      return ['Admin', 'Formulario de Login']
    }
  },
  methods: {
    async submit () {
      const loadingComponent = this.$buefy.loading.open()
      const user = { username: this.form.username.toLowerCase(), password: this.form.password }
      const username = this.form.username
      const validarCamillero = await this.validarCamilleroExiste(username)
      this.$store.state.services.tecnomet
        .login(user, 'post')
        .then((r) => {
          if (r.data.length !== 0 && validarCamillero === true) {
            this.$store.commit('user', {
              name: r.data.original.nombre,
              email: r.data.original.email,
              avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
              window: username
            })

            this.$buefy.snackbar.open({
              message: 'Bienvenido.',
              queue: false,
              type: 'is-success'
            })

            this.$router.push('/tables')
            loadingComponent.close()
            return true
          } else {
            this.$buefy.snackbar.open({
              message: 'Usuario u contraseña inválido.',
              queue: false,
              type: 'is-danger'
            })
            loadingComponent.close()
          }
        })
        .catch((r) => {})
    },
    reset () {
      this.form = mapValues(this.form, (item) => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    },
    async validarCamilleroExiste (username) {
      const respuesta = await this.$store.state.services.tecnomet
        .camillerosTienePermisos(username)
        .then((data) => data.data)
      if (!respuesta) {
        this.$buefy.snackbar.open({
          message: 'Usuario sin permiso.',
          queue: false,
          type: 'is-danger'
        })
      }
      return respuesta
    },
    telefonos () {
      this.$store.state.services.tecnomet
        .telefonos()
        .then((data) => {
          this.allTelefonos = data.data.data
        })
    }
  }
}
</script>

<style>
.align-buttons{
  text-align: right;
  width: 100%;
}
</style>
