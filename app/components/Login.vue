<script>
  import {
    toggleConnecting,
    toggleLoading,
    toggleLogin,
    setToken,
    setGithub,
    setUser,
    setRepos,
    setLangGroup,
    initRepos
  } from '../vuex/actions'
  import GithubAuth from './GithubAuth'
  import MdlLoading from './materialize/MdlLoading'
  import DotLoader from 'vue-spinner/src/DotLoader.vue'
  import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
  import storage from 'electron-json-storage'
  import request from 'request'
  import Github from 'github-api'
  import _ from 'lodash'
  import db from '../services/db'

  export default {
    vuex: {
      getters: {
        connecting: ({ login }) => login.connecting,
        loading: ({ login }) => login.loading,
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
        setRepos,
        setLangGroup,
        initRepos
      }
    },

    ready () {
      this.getLocalToken()
    },

    methods: {
      getLocalToken() {
        let self = this
        storage.get('oauth2', function(error, data) {
          if (data.token) {
            self.setToken(data.token)
            let github = new Github({
              token: data.token,
              auth: 'oauth'
            })
            self.setGithub(github)
            self.getUser(data.token)
          }
        })
      },
      getUser(token) {
        let self = this
        this.toggleConnecting()
        let options = {
          url: 'https://api.github.com/user',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Astrolabe',
            'Authorization': 'token ' + token
          }
        }
        function callback(error, response, body) {
          if (!error && response.statusCode === 200) {
            let user = JSON.parse(body)
            self.setUser(user)
            self.getRepos(user)
          }
        }
        request(options, callback)
      },
      getRepos(user) {
        let self = this
        this.toggleLoading()
        let githubUser = this.github.getUser(user.login)
        db.findOneUser(user.id).then(doc => {
          if (_.isNull(doc)) {
            githubUser.listStarredRepos(function(err, repos) {
              self.initRepos(repos)
            })
          } else {
            db.fetchRepos().then(repos => {
              if (_.isEmpty(repos)) {
                githubUser.listStarredRepos(function(err, repos) {
                  self.initRepos(user, repos)
                })
              } else {
                self.setRepos(repos)
              }
            })
            db.fetchLangGroup().then(langGroup => {
              if (!_.isEmpty(langGroup)) {
                self.setLangGroup(langGroup)
              }
            })
          }
        })
        githubUser.listStarredRepos(function(err, repos) {
          self.initRepos(repos)
        })
        this.toggleLogin()
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
    <div class="loading" v-if="connecting">
      <bounce-loader></bounce-loader>
      <span>Connecting ...</span>
    </div>
    <div class="login-form" v-else>
      <github-auth></github-auth>
    </div>
    <div class="loading" v-if="loading">
      <dot-loader color='#e91e63'></dot-loader>
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
    z-index: 1020;
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
