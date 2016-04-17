<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <hello></hello>
    <github></github>
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import Github from './components/Github'

  export default {
    components: {
      Hello,
      Github
    }
  }
</script>

<style>
  html {
    height: 100%;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  #app {
    margin-top: -100px;
    max-width: 600px;
    font-family: Helvetica, sans-serif;
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
</style>