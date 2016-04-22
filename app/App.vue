<script>
  import Login from './components/Login'
  import Hello from './components/Hello'
  import Github from './components/Github'

  export default {
    data () {
      return {
        isLogin: false
      }
    },

    components: {
      Login,
      Hello,
      Github
    }
  }
</script>

<template>
  <div id="app">
    <div class="login-style" v-if="!isLogin">
      <login :is-login.sync="isLogin"></login>
    </div>
    <div class="dashboard" v-if="isLogin">
      <hello></hello>
      <github></github>
    </div>

  </div>
</template>

<style>
  html {
    height: 100%;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #app {
    margin-top: -100px;
    max-width: 600px;
    font-family: lato, sans-serif;
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
</style>
