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
  /* materialize */
  @import '~materialize-css/bin/materialize.css';

  /* material-design-icons */
  @import '~material-design-icons/iconfont/material-icons.css';

  /* devicon */
  @import '~devicon/devicon.min.css';
  @import '~devicon/devicon-colors.css';

  /* devicons */
  @import '~devicons/css/devicons.css';

  body {
    font-family: lato, sans-serif;
  }
  .login {
    margin-top: -100px;
    max-width: 600px;
    text-align: center;
  }
</style>
