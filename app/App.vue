<script>
  import Login from './components/Login'
  import Main from './components/Main'

  export default {
    // data () {
    //   return {
    //     isLogin: true
    //   }
    // },

    vuex: {
      getters: {
        isLogin: ({ login }) => login.isLogin
      }
    },

    components: {
      Login,
      Main
    }
  }
</script>

<template>
  <div id="app">
    <div class="login animated fadeIn" v-if="!isLogin">
      <login></login>
    </div>
    <div class="animated fadeIn" v-else>
      <main></main>
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
