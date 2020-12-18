<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-id="trashObjectId"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="prioridad"
      :data="solicitudes"
    >
      <template slot-scope="props" v-if="props.row">
        <b-table-column label="Prioridad" :class="props.row.prioridad == 'Urgente' ? 'has-background-danger' : ''" field="prioridad" sortable>
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
          {{  props.row.usuario_nombre }}
        </b-table-column>
        <b-table-column label="Acciones" custom-key="actions" class="is-actions-cell">
          <div class="buttons is-center">
            <b-tooltip label="Aceptar Solicitud" v-if="props.row.estado == 2"
              class="pr-1"
              type="is-dark"
              position="is-top">
              <button class="button is-small is-success" @click="changeStateSolicitud(props.row.id,3)">
                  <b-icon icon="checkbox-marked-circle" size="is-small" />
              </button>
            </b-tooltip>
            <b-tooltip label="Empezar Solicitud" v-if="props.row.estado == 3"
              class="pr-1"
              type="is-dark"
              position="is-top">
              <button class="button is-small is-info" @click="changeStateSolicitud(props.row.id,4)">
                  <b-icon icon="play" size="is-small" />
              </button>
            </b-tooltip>
            <b-tooltip label="Cerrar Solicitud" v-if="props.row.estado == 4"
              class="pr-1"
              type="is-dark"
              position="is-top">
              <button class="button is-small is-warning" @click="changeStateSolicitud(props.row.id,5)">
                  <b-icon icon="check-all" size="is-small" />
              </button>
            </b-tooltip>
            <b-tooltip label="Datos del Paciente"
              class="pr-1"
              type="is-dark"
              position="is-left">
              <button class="button is-small is-info" @click="showDetails(props.row)">
                  <b-icon icon="clipboard-account" size="is-small" />
              </button>
            </b-tooltip>
            <b-tooltip label="Rechazar Solicitud" v-if="props.row.estado == 4"
              class="pr-1"
              type="is-dark"
              position="is-left">
              <button class="button is-small is-danger" @click.prevent="trashModal(props.row)">
                  <b-icon icon="close-circle-outline" size="is-small" />
              </button>
            </b-tooltip>
            <b-tooltip label="Refuerzo" v-if="props.row.estado == 4"
              class="pr-1"
              type="is-dark"
              position="is-left">
              <button class="button is-small is-danger" @click.prevent=" changeStateSolicitud(props.row.id,8)">
                  <b-icon icon="account-multiple-plus" size="is-small" />
              </button>
            </b-tooltip>
             <b-tooltip label="Informacion"
              class="pr-1"
              type="is-dark"
              position="is-left">
              <button class="button is-small is-info" @click.prevent="informacion()">
                  <b-icon icon="information" size="is-small" />
              </button>
            </b-tooltip>
          </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import ModalBox from '@/components/ModalBox'
import Details from '@/components/DetailsSolicitud'
import Informacion from '../views/Informacion'

export default {
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    },
    solicitudes: {
      type: Array
    }
  },
  data () {
    return {
      isModalActive: false,
      trashObject: null,
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: [],
      timer: null
    }
  },
  computed: {
    ...mapState(['userWindow']),
    trashObjectId () {
      if (this.trashObject) {
        return this.trashObject.id
      }

      return null
    }
  },
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.clients = r.data.data
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.reload()
      this.$buefy.snackbar.open({
        message: 'Rechazado',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    },
    informacion () {
      this.$buefy.modal.open({
        parent: this,
        component: Informacion,
        hasModalCard: true,
        trapFocus: true
      })
    },
    showDetails (row) {
      this.$buefy.modal.open({
        parent: this,
        component: Details,
        hasModalCard: true,
        props: {
          detail: row
        },
        trapFocus: true
      })
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
    },
    changeStateSolicitud (id, estado) {
      const usuario = {
        username: this.userWindow,
        solicitud_id: id,
        estado_solicitud: estado
      }

      this.reload()

      this.$store.state.services.tecnomet
        .cambiarEstadoSolicitud(usuario)
        .then((r) => {
          this.reload()
          this.$buefy.snackbar.open({
            message: 'Se cambio el estado con éxito.',
            position: 'is-button',
            queue: false,
            type: 'is-success'
          })
        })
        .catch((r) => {})
      /**
       * $camillero_autenticado_id = $request->id_camillero;
        $solicitud_id = $request->id_solicitud;
        $estado = $request->estado_solicitud;
       */
    },
    reload () {
      this.$emit('reload')
    }
  },
  created () {
    this.timer = setInterval(this.reload, 6000)
  }
}
</script>
