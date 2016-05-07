<script>
  import NavBar from './NavBar'
  import SideBar from './SideBar'
  import Dashboard from './Dashboard'

  export default {
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
    <side-bar></side-bar>
    <dashboard></dashboard>
  </main>
</template>
