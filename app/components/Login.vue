<script>
  import storage from 'electron-json-storage'
  import Github from 'github-api'

  export default {
    data () {
      return {
        token: ''
      }
    },

    ready: function () {
      var self = this
      storage.get('login-user', function (error, data) {
        self.token = data.token
      })

      var github = new Github({
        token: this.token,
        auth: 'oauth'
      })

      var user = github.getUser()

      console.log(user)

      // user
      user.show('malanore', function (err, user) {
        console.log(user)
      })
    }
  }
</script>
<template>
  <div class="login-screen">

  </div>
</template>
<style media="screen">
  .login-screen {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: url(../assets/images/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
  }
</style>
