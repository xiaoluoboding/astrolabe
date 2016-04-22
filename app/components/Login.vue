<script>
  import storage from 'electron-json-storage'
  import Github from 'github-api'
  import request from 'request'
  var env = require('../../config/env_dev.json')
  var connect = require('../utils/db').connect(env.throidal.url, env.throidal.options)

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
        self.getUser(data.token)
      })

      var github = new Github({
        token: this.token,
        auth: 'oauth'
      })

      var user = github.getUser()

      // console.log(user)

      // user
      user.show('malanore', function (err, user) {
        console.log(user.login)
      })
    },

    methods: {
      getUser (token) {
        var options = {
          url: 'https://api.github.com/user',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Throidal',
            'Authorization': 'token ' + token
          }
        }

        function callback (error, response, body) {
          if (!error && response.statusCode === 200) {
            var info = JSON.parse(body)
            connect(function(db) {
              // Get the documents collection
              var col = db.collection('t_user')
              col.find({login: info.login}).toArray(function(err, docs) {
                col.deleteOne({login: info.login}, function(err, result) {
                  console.log('Removed User')
                })
              })
              col.insert(info, {w: 1}, function(err, result) {
                console.log('Inserted User')
              })
            })
          }
        }
        request(options, callback)
      }
    }
  }
</script>
<template>
  <div class="login-screen">
      <!-- {{ $data | json }} -->
      <div class="login-form">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--white">
          GitHub 登录
        </button>
      </div>
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
