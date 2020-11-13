<template>
  <b-modal :active.sync="isModalActive" has-modal-card>
    <div class="modal-card">
      <form @submit.prevent="confirm">
        <header class="modal-card-head">
          <p class="modal-card-title">Rechazo de Solicitud</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Motivo de Rechazo">
              <b-select placeholder="Seleccion un motivo" v-model="motivo_rechazo_id" required>
                {{motivos}}
                  <option
                      v-for="option in motivos"
                      :value="option.id"
                      :key="option.id">
                      {{ option.nombre }}
                  </option>
              </b-select>
          </b-field>
          <b-field message="Escriba brevemente el motivo de rechazo">
              <b-input maxlength="100" v-model="motivo_rechazo_descripcion" type="textarea" required></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <div class="align-buttons">
            <button class="button pulled-right" type="button" @click="cancel">Cancelar</button>
            <button class="button pulled-right is-danger" native-type="submit">Rechazar</button>
          </div>
        </footer>
      </form>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      isModalActive: false,
      motivo_rechazo_descripcion: null,
      motivo_rechazo_id: null,
      motivos: []
    }
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  },
  created () {
    this.loadMotivos()
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      const solicitud = {
        solicitud_id: this.trashObjectId,
        motivo_rechazo_id: this.motivo_rechazo_id,
        motivo_rechazo_descripcion: this.motivo_rechazo_descripcion
      }
      this.$store.state.services.tecnomet
        .rechazarSolicitud(solicitud)
        .then((r) => {
          this.$emit('confirm')
        })
        .catch((r) => {})
    },
    loadMotivos () {
      this.$store.state.services.tecnomet
        .motivosRechazos()
        .then((r) => {
          this.motivos = r.data.data
        })
        .catch((r) => {})
    }
  }
}
</script>
<style>
.align-buttons {
    text-align: right;
    width: 100%;
}
</style>
