<script>
  import GithubAuth from './GithubAuth'
  import MdlLoading from './MdlLoading'
  import storage from 'electron-json-storage'
  import request from 'request'
  import env from '../../config/env_dev.json'
  import db from '../utils/db'
  var $ = require('jquery')
  let connect = db.connect(env.throidal.url, env.throidal.options)

  export default {
    data () {
      return {
        token: '',
        loading: false
      }
    },

    props: [
      'isLogin'
    ],

    ready: function () {
      var self = this
      storage.get('login-user', function (error, data) {
        if (data.token) {
          self.loading = false
          self.token = data.token
          self.getUser(data.token)
        }
      })
    },

    methods: {
      getUser (token) {
        var self = this
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
              col.find({login: info.login}).toArray(function(err, result) {
                col.deleteOne({login: info.login}, function(err, result) {
                  console.log('Removed User')
                })
                col.insert(info, {w: 1}, function(err, result) {
                  console.log('Inserted User')
                  self.isLogin = true
                })
              })
            })
          }
        }
        request(options, callback)
      }
    },

    components: {
      GithubAuth,
      MdlLoading
    }
  }
</script>
<template>
  <div class="login-screen">
    {{ $data | json }}
    <div class="login-form">
      <github-auth></github-auth>
    </div>
    <mdl-loading v-if="!loading"><mdl-loading>
  </div>
</template>
<style media="screen">
  .login-screen {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: url(../assets/images/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    color: #fff;
  }
  .login-form {
  	align-items: center;
    justify-content: center;
  }
</style>
