<script>
  // import Github from 'github-api'
  import { ipcRenderer } from 'electron'
  import storage from 'electron-json-storage'
  import request from 'request'
  import MdlButton from './MdlButton'

  export default {
    data () {
      return {
        msg: 'GitHub API',
        options: {
          client_id: 'd4a28554213774aa83cc',
          client_secret: 'a737f660e30ca4559069ec484658c45cb2a247a4',
          scope: ['user:email', 'public_repo']
        },
        code: '',
        token: ''
      }
    },

    ready: function () {
      var self = this
      ipcRenderer.on('getCode', function (event, arg) {
        self.getCode(arg)
      })
    },

    methods: {
      githubAuth () {
        console.log('into github auth func')
        let githubUrl = 'https://github.com/login/oauth/authorize?'
        let authUrl = githubUrl + 'client_id=' + this.options.client_id + '&scope=' + this.options.scope

        // Open auth window
        ipcRenderer.send('open-auth-window', authUrl)
      },
      getCode (url) {
        var raw_code = /code=([^&]*)/.exec(url) || null
        var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null
        var error = /\?error=(.+)$/.exec(url)
        if (code || error) {
          // Close the browser if code found or error
          ipcRenderer.send('destroy-auth-window')
        }

        // If there is a code, proceed to get token from github
        if (code) {
          console.log('code:' + code)
          this.code = code
          this.getToken(this.options, code)
          storage.set('login-user', {
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
        var self = this
        var postData = {
          client_id: option.client_id,
          client_secret: option.client_secret,
          code: code
        }

        var options = {
          url: 'https://github.com/login/oauth/access_token',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Throidal'
          },
          form: postData
        }

        function callback (error, response, body) {
          if (!error && response.statusCode === 200) {
            var info = JSON.parse(body)
            console.log('token:' + info.access_token)
            self.token = info.access_token
            storage.set('login-user', {
              code: code,
              token: info.access_token
            }, function (error) {
              if (error) throw error
            })
          }
        }

        request(options, callback)
      },
      getUser () {
        var options = {
          url: 'https://api.github.com/user',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Throidal'
          }
        }

        function callback (error, response, body) {
          if (!error && response.statusCode === 200) {
            var info = JSON.parse(body)
            console.log('token:' + info)
          }
        }

        request(options, callback)
      }
    },

    components: {
      MdlButton
    }
  }
</script>

<template>
  <div class="github">
    <h2>{{ msg }}</h2>
  </div>
  <!-- <pre>
    {{ $data | json }}
  </pre> -->
  <mdl-button @click="githubAuth()">Github登录</mdl-button>
</template>
