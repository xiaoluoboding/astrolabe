<script>
  import NavBar from './NavBar'
  import SideBar from './SideBar'
  import Dashboard from './Dashboard'

  export default {
    data () {
      return {
        searchQuery: ''
      }
    },

    components: {
      NavBar,
      SideBar,
      Dashboard
    }
  }
</script>

<template>
  <header>
    <nav-bar></nav-bar>
  </header>
  <main>
    <side-bar :search-query.sync="searchQuery"></side-bar>
    <dashboard :search-query.sync="searchQuery"></dashboard>
  </main>
</template>
