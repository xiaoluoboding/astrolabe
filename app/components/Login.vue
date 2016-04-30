<script>
  import {
    toggleConnecting,
    toggleLoading,
    toggleLogin,
    setToken,
    setGithub,
    setUser,
    setRepos
  } from '../vuex/actions'
  import GithubAuth from './GithubAuth'
  import MdlLoading from './materialize/MdlLoading'
  import DotLoader from 'vue-spinner/src/DotLoader.vue'
  import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
  import storage from 'electron-json-storage'
  import request from 'request'
  import Github from 'github-api'
  import env from '../../config/env_dev.json'
  import db from '../utils/db'
  let connect = db.connect(env.db.url, env.db.options)

  export default {
    vuex: {
      getters: {
        connecting: ({ login }) => login.connecting,
        loading: ({ login }) => login.loading,
        isLogin: ({ login }) => login.isLogin,
        github: ({ github }) => github.github,
        repos: ({ github }) => github.repos
      },
      actions: {
        toggleConnecting,
        toggleLoading,
        toggleLogin,
        setToken,
        setGithub,
        setUser,
        setRepos
      }
    },

    ready () {
      this.getLocalToken()
    },

    methods: {
      getLocalToken() {
        var self = this
        storage.get('login-user', function(error, data) {
          if (data.token) {
            // self.token = data.token
            self.setToken(data.token)
            var github = new Github({
              token: data.token,
              auth: 'oauth'
            })
            self.setGithub(github)
            self.getUser(data.token)
          }
        })
      },
      getUser(token) {
        var self = this
        this.toggleConnecting()
        var options = {
          url: 'https://api.github.com/user',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Throidal',
            'Authorization': 'token ' + token
          }
        }

        function callback(error, response, body) {
          if (!error && response.statusCode === 200) {
            var user = JSON.parse(body)
            // self.user = user
            self.setUser(user)
            connect(function(db) {
              // Get the documents collection
              var col = db.collection('t_user')
              col.find({
                login: user.login
              }).toArray(function(err, result) {
                col.deleteOne({
                  login: user.login
                }, function(err, result) {
                  console.log('Removed User')
                })
                col.insert(user, {
                  w: 1
                }, function(err, result) {
                  console.log('Inserted User')
                  self.getRepos(user)
                })
              })
            })
          }
        }
        request(options, callback)
      },
      getRepos(user) {
        var self = this
        this.toggleLoading()
          // Get the documents collection

        connect(function(db) {
          var reposCol = db.collection('t_repos')
          reposCol.find({}).toArray(function(err, result) {
            self.setRepos(result)
            self.toggleLogin()
          })

          // var userCol = db.collection('t_user')
          // userCol.find({}).toArray(function(err, result) {
          //   var githubUser = self.github.getUser()
          //   githubUser.userStarred(user.login, function(err, repos) {
          //     // var reposCol = db.collection('t_repos')
          //     // for (var i in repos) {
          //     //   console.log(repos[i].full_name)
          //     //   // starsCol.find({full_name: repos[i].full_name}).toArray(function(err, result) {
          //     //   //
          //     //   // })
          //     // }
          //     self.setRepos(repos)
          //     self.toggleLogin()
          //     reposCol.insertMany(self.repos, {w: 1}, function(err, result) {
          //       console.log('Inserted repos')
          //     })
          //   })
          // })
        })
      }
    },

    components: {
      GithubAuth,
      MdlLoading,
      DotLoader,
      BounceLoader
    }
  }
</script>
<template>
  <div class="login-screen">
    <div class="login-form">
      <github-auth></github-auth>
    </div>
    <div class="loading" v-if="connecting">
      <bounce-loader></bounce-loader>
      <span>Connecting ...</span>
    </div>
    <div class="loading" v-if="loading">
      <dot-loader color='crimson'></dot-loader>
      <span>Loading ...</span>
    </div>
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

  .loading {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: white;
  }

  .loading .v-spinner {
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    margin: -30px 0 0 -30px;
  }

  .loading span {
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    color: #658399;
    pointer-events: none;
    position: absolute;
    top: 55%;
    left: 0;
    text-align: center;
    width: 100%;
  }
</style>
