<script>
  import Login from './components/Login'
  import Main from './components/Main'

  export default {
    data () {
      return {
        isLogin: false,
        token: ''
      }
    },

    props: [
      'loading'
    ],

    components: {
      Login,
      Main
    }
  }
</script>

<template>
  <div id="app">
    <div class="login" v-if="!isLogin">
      <login :is-login.sync="isLogin" :token.sync="token" :loading.sync="loading"></login>
    </div>
    <div class="main" v-if="isLogin">
      <main :token.sync="token" :loading.sync="loading"></main>
    </div>
  </div>
</template>

<style>
  body {
    font-family: lato, sans-serif;
  }
  .login {
    margin-top: -100px;
    max-width: 600px;
    text-align: center;
  }
</style>
