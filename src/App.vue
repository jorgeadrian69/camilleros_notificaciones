<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'Home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        // 'General',
        // [
        //   {
        //     to: '/',
        //     icon: 'desktop-mac',
        //     label: 'Dashboard'
        //   }
        // ],
        'Menu',
        [
          {
            to: '/tables',
            label: 'Mis Solicitudes',
            icon: 'table',
            updateMark: true
          },
          // {
          //   to: '/forms',
          //   label: 'Forms',
          //   icon: 'square-edit-outline'
          // },
          {
            to: '/profile',
            label: 'Mi Perfil',
            icon: 'account-circle'
          },
          {
            to: '/colacion',
            label: 'Colaciones',
            icon: 'calendar-clock'
          },
          {
            to: '/pendientes',
            label: 'Pendientes',
            icon: 'arrow-down-bold-circle'
          }
          // {
          //   label: 'Submenus',
          //   subLabel: 'Submenus Example',
          //   icon: 'view-list',
          //   menu: [
          //     {
          //       href: '#void',
          //       label: 'Sub-item One'
          //     },
          //     {
          //       href: '#void',
          //       label: 'Sub-item Two'
          //     }
          //   ]
          // }
        ]
        // 'About',
        // [
        //   {
        //     href: 'https://admin-one.justboil.me',
        //     label: 'Premium Demo',
        //     icon: 'credit-card'
        //   },
        //   {
        //     href: 'https://justboil.me/bulma-admin-template/one',
        //     label: 'About',
        //     icon: 'help-circle'
        //   }
        // ]
      ]
    }
  }
}
</script>
