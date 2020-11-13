
<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Mis Solicitudes
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Recepción de Solicitudes"
        icon="account-multiple"
      >
        <clients-table-sample
          :solicitudes="solicitudes"
          :checkable="true"
          @reload="getData()"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClientsTableSample from '@/components/ClientsTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Tables',
  data () {
    return {
      solicitudes: []
    }
  },
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    ClientsTableSample
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
        .getCamilleroSolicitudes(username)
        .then((r) => {
          this.solicitudes = r.data.data
        })
        .catch((r) => {})
    }
  }
}
</script>
