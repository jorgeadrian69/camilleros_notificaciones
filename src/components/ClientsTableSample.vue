<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
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
      <template slot-scope="props">
        <b-table-column label="Prioridad" :class="props.row.prioridad == 'Urgente' ? 'has-background-danger' : ''" field="prioridad" sortable>
          {{ props.row.prioridad }}
        </b-table-column>
        <b-table-column label="Sede" field="sede" sortable>
          {{ props.row.sede }}
        </b-table-column>
        <b-table-column label="Origen" field="origen" sortable>
          {{ props.row.origen }}
        </b-table-column>
        <b-table-column label="Destino" field="destino" sortable>
          {{ props.row.destino }}
        </b-table-column>
        <b-table-column label="Transporte" field="transporte" sortable>
          {{ props.row.transporte }}
        </b-table-column>
        <b-table-column label="Fecha" field="fecha" sortable>
          {{ props.row.fecha }}
        </b-table-column>
        <b-table-column label="Hora" field="hora" sortable>
          {{ getHour(props.row.hora) }}
        </b-table-column>
        <b-table-column label="Emisor" field="usuario" sortable>
          {{ props.row.usuario }}
        </b-table-column>
        <b-table-column label="Acciones" custom-key="actions" class="is-actions-cell">
          <div class="buttons is-center">
            <b-tooltip label="Aceptar Solicitud"
              class="pr-1"
              type="is-dark"
              position="is-top">
              <button class="button is-small is-success">
                  <b-icon icon="checkbox-marked-circle-outline" size="is-small" />
              </button>
            </b-tooltip>
            <b-tooltip label="Datos del Paciente"
              class="pr-1"
              type="is-dark"
              position="is-top">
              <button class="button is-small is-info" @click="showDetails(props.row)">
                  <b-icon icon="clipboard-account" size="is-small" />
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
import axios from 'axios'
import ModalBox from '@/components/ModalBox'
import Details from '@/components/DetailsSolicitud'

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
      checkedRows: []
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
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
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
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
