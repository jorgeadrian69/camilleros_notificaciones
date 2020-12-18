
<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar> Mis Solicitudes </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Recepción de Solicitudes Pendientes de Aprobación"
        icon="account-multiple"
      >
        <b-table
          :loading="isLoading"
          :paginated="paginated"
          :per-page="perPage"
          :striped="true"
          :hoverable="true"
          default-sort="prioridad"
          :data="solicitudes"
        >
          <template slot-scope="props" v-if="props.row">
            <b-table-column
              label="Prioridad"
              :class="
                props.row.prioridad == 'Urgente' ? 'has-background-danger' : ''
              "
              field="prioridad"
              sortable
            >
              {{ props.row.prioridad }}
            </b-table-column>
            <b-table-column label="Sede" field="sede" sortable>
              {{ props.row.sede }}
            </b-table-column>
            <b-table-column label="Origen" field="origen" sortable>
              {{ props.row.origen }}
            </b-table-column>
            <b-table-column label="Piso Origen" field="origen" sortable>
              {{ props.row.piso_origen }}
            </b-table-column>
            <b-table-column label="Cama Origen" field="origen" sortable>
              {{ props.row.cama_origen }}
            </b-table-column>
            <b-table-column label="Destino" field="destino" sortable>
              {{ props.row.destino }}
            </b-table-column>
            <b-table-column label="Piso Destino" field="destino" sortable>
              {{ props.row.piso_destino }}
            </b-table-column>
            <b-table-column label="Cama Destino" field="destino" sortable>
              {{ props.row.cama_destino }}
            </b-table-column>
            <b-table-column label="Transporte" field="transporte" sortable>
              {{ props.row.transporte }}
            </b-table-column>
            <b-table-column label="Fecha" field="fecha" sortable>
              {{ getDate(props.row.fecha) }}
            </b-table-column>
            <b-table-column label="Hora" field="hora" sortable>
              {{ getHour(props.row.hora) }}
            </b-table-column>
            <b-table-column label="Emisor" field="usuario" sortable>
              {{ props.row.usuario_nombre }}
            </b-table-column>
          </template>

          <section slot="empty" class="section">
            <div class="content has-text-grey has-text-centered">
              <template v-if="isLoading">
                <p>
                  <b-icon icon="dots-horizontal" size="is-large" />
                </p>
                <p>Cargando...</p>
              </template>
              <template v-else>
                <p>
                  <b-icon icon="emoticon-sad" size="is-large" />
                </p>
                <p>No se encontraron solicitudes&hellip;</p>
              </template>
            </div>
          </section>
        </b-table>
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Tables',
  data () {
    return {
      solicitudes: [],
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
      timer: null
    }
  },
  components: {
    HeroBar,
    TitleBar,
    CardComponent
  },
  computed: {
    ...mapState(['userName', 'userWindow']),
    titleStack () {
      return ['Admin', 'Solicitudes']
    }
  },
  created () {
    if (!this.userName) {
      this.$router.push('/')
    }
    this.getData()
  },
  methods: {
    getData () {
      const username = this.userWindow
      this.$store.state.services.tecnomet
        .pedientesAprobacion(username)
        .then((r) => {
          this.solicitudes = r.data.data
        })
        .catch((r) => {})
    },
    getDate (date) {
      const data = new Date(date)
      return data.toLocaleDateString('es-ES')
    },
    getHour (date) {
      const data = new Date(date)
      const hours = data.getHours()
      const minutes = data.getMinutes()
      return `${hours}:${minutes}`
    }
  }
}
</script>
