<script>
  import Github from 'github-api'
  import { remote } from 'electron'
  import {
    toggleConnecting,
    toggleLoading,
    toggleLogin,
    setToken,
    setGithub,
    setUser,
    initRepos
  } from '../vuex/actions'
  const BrowserWindow = remote.BrowserWindow
  import storage from 'electron-json-storage'
  import request from 'request'
  import Octicon from '../node_modules/vue-octicon/src/components/Octicon'

  export default {
    data () {
      return {
        msg: 'GitHub API',
        options: {
          client_id: 'd4a28554213774aa83cc',
          client_secret: 'a737f660e30ca4559069ec484658c45cb2a247a4',
          scope: ['user:email', 'public_repo']
        }
      }
    },

    vuex: {
      getters: {
        github: ({ github }) => github.github
      },
      actions: {
        toggleConnecting,
        toggleLoading,
        toggleLogin,
        setToken,
        setGithub,
        setUser,
        initRepos
      }
    },

    ready: function () {
    },

    methods: {
      githubAuth () {
        console.log('into github auth func')
        let self = this
        // Build the OAuth consent page URL
        let githubUrl = 'https://github.com/login/oauth/authorize?'
        let authUrl = githubUrl + 'client_id=' + this.options.client_id + '&scope=' + this.options.scope
        let authWindow = null

        // Open auth window
        authWindow = new BrowserWindow({
          width: 1024,
          height: 768,
          show: true,
          'web-preferences': {
            'node-integration': false
          }
        })

        authWindow.loadURL(authUrl)

        authWindow.webContents.on('will-navigate', function (event, url) {
          self.getCode(url, authWindow)
        })

        authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
          self.getCode(newUrl, authWindow)
        })

        // If "Done" button is pressed, hide "Loading"
        authWindow.on('close', function () {
          authWindow.destroy()
        })
      },
      getCode (url, authWindow) {
        let raw_code = /code=([^&]*)/.exec(url) || null
        let code = (raw_code && raw_code.length > 1) ? raw_code[1] : null
        let error = /\?error=(.+)$/.exec(url)
        if (code || error) {
          // Close the browser if code found or error
          authWindow.destroy()
        }

        // If there is a code, proceed to get token from github
        if (code) {
          console.log('code:' + code)
          this.code = code
          this.getToken(this.options, code)
          storage.set('oauth2', {
            code: code
          }, function (error) {
            if (error) throw error
          })
        } else if (error) {
          alert('Oops! Something went wrong and we couldn\'t' +
            'log you in using Github. Please try again.')
        }
      },
      getToken (option, code) {
        let self = this
        let postData = {
          client_id: option.client_id,
          client_secret: option.client_secret,
          code: code
        }

        let options = {
          url: 'https://github.com/login/oauth/access_token',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Astrolabe'
          },
          form: postData
        }

        function callback (error, response, body) {
          if (!error && response.statusCode === 200) {
            let info = JSON.parse(body)
            console.log('token:' + info.access_token)
            self.setToken(info.access_token)
            var github = new Github({
              token: info.access_token,
              auth: 'oauth'
            })
            self.setGithub(github)
            self.getUser(info.access_token)
            storage.set('oauth2', {
              code: code,
              token: info.access_token
            }, function (error) {
              if (error) throw error
            })
          }
        }

        request(options, callback)
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
        let githubUser = self.github.getUser()
        githubUser.listStarredRepos(function(err, repos) {
          self.initRepos(user, repos)
        })
        this.toggleLogin()
      }
    },

    components: {
      Octicon
    }
  }
</script>

<template>
  <div class="github">
    <h2>{{ msg }}</h2>
  </div>
  <a class="waves-effect waves-light btn sidebar-toggle" @click="githubAuth()">
    <octicon name="mark-github"></octicon>
    <span>Log in with GitHub</span>
  </a>
</template>
