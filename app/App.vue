<script>
  import Login from './components/Login'
  import Main from './components/Main'

  export default {
    data () {
      return {
        isLogin: false,
        token: '',
        user: '',
        repos: '',
        github: ''
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
      <login
        :is-login.sync="isLogin"
        :user.sync="user"
        :repos.sync="repos"
        :github.sync="github">
      </login>
    </div>
    <div class="animated fadeIn" v-else>
      <main :user.sync="user" :repos.sync="repos" :github.sync="github"></main>
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
