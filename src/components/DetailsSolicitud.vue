<template>
  <card-component title="Datos del Paciente" icon="account" class="tile is-child">
      <b-field label="Nombre" horizontal>
        <b-input :value="detail.paciente.nombre" custom-class="is-static" expanded readonly />
      </b-field>
      <b-field label="DNI" horizontal>
        <b-input :value="detail.paciente.dni" custom-class="is-static" expanded readonly />
      </b-field>
      <b-field label="Oxígeno" horizontal>
        <b-input :value="detail.paciente.oxigeno ? 'si' : 'no'" custom-class="is-static" expanded readonly />
      </b-field>
      <b-field label="Aislado" horizontal>
        <b-input :value="detail.paciente.aislado ? 'si' : 'no'" custom-class="is-static" expanded readonly />
      </b-field>
      <b-field label="Observaciones" horizontal>
        <b-input :value="detail.paciente.observaciones" custom-class="is-static" expanded readonly />
      </b-field>
      <footer class="card-footer pt-1 has-text-right">
        <button class="button is-info" type="button" @click="$emit('close')">Cerrar</button>
    </footer>
  </card-component>
</template>

<script>
import CardComponent from './CardComponent'
export default {
  name: 'DetailsSolicitud',
  props: ['detail'],
  components: {
    CardComponent
  }
}
</script>
