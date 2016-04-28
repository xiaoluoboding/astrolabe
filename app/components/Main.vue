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

    props: [
      'user',
      'repos',
      'github'
    ],

    components: {
      NavBar,
      SideBar,
      Dashboard
    }
  }
</script>

<template>
  <header>
    <nav-bar :user='user' ></nav-bar>
  </header>
  <main>
    <side-bar :search-query.sync="searchQuery"></side-bar>
    <dashboard :github='github' :repos='repos' :search-query.sync="searchQuery"></dashboard>
  </main>
</template>
