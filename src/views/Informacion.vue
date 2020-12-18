<template>
  <div class="modal-card" style="width: 100%">
    <header class="modal-card-head">
      <p class="modal-card-title">Guía de USO</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <div class="columns is-mobile">
        <div class="column">
          <p>
            <button class="button is-small is-success">
              <b-icon icon="checkbox-marked-circle" size="is-small" />
            </button>
            Aceptar Solicitud
          </p>
          <br />
          <p>
            <button class="button is-small is-info">
              <b-icon icon="play" size="is-small" />
            </button>
            Empezar Solicitud
          </p>
          <br />
          <p>
            <button class="button is-small is-warning">
              <b-icon icon="check-all" size="is-small" />
            </button>
            Cerrar Solicitud
          </p>
          <br />
          <p>
            <button class="button is-small is-danger">
              <b-icon icon="close-circle-outline" size="is-small" />
            </button>
            Rechazar Solicitud
          </p>
          <br />
          <p>
            <button class="button is-small is-info">
              <b-icon icon="clipboard-account" size="is-small" />
            </button>
            Datos del Paciente
          </p>
          <br />
          <p>
            <button
              class="button is-small is-danger"
            >
              <b-icon icon="account-multiple-plus" size="is-small" />
            </button>

            Pedir Ayuda a Colegas Camilleros
          </p>
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button is-info" type="button" @click="$emit('close')">
        Cerrar
      </button>
    </footer>
  </div>
</template>
