<script>
  // import Github from 'github-api'
  import { remote } from 'electron'
  import storage from 'electron-json-storage'
  import request from 'request'
  let BrowserWindow = remote.BrowserWindow

  // Build the OAuth consent page URL
  let authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    'web-preferences': {
      'node-integration': false
    }
  })

  let options = {
    client_id: 'd4a28554213774aa83cc',
    client_secret: 'a737f660e30ca4559069ec484658c45cb2a247a4',
    scope: ['user:email']
  }

  export default {
    data () {
      return {
        msg: 'GitHub API',
        code: '',
        token: ''
      }
    },

    ready: function () {
      let githubUrl = 'https://github.com/login/oauth/authorize?'
      let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scope

      console.log(authUrl)

      authWindow.loadURL(authUrl)

      authWindow.webContents.on('will-navigate', function (event, url) {
        getCode(url)
      })

      authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
        getCode(newUrl)
      })
        // If "Done" button is pressed, hide "Loading"
      authWindow.on('close', function () {
        authWindow.destroy()
      })
    },

    method: {

    }
  }

  function getCode (url) {
    var raw_code = /code=([^&]*)/.exec(url) || null
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null
    var error = /\?error=(.+)$/.exec(url)
    if (code || error) {
      // Close the browser if code found or error
      authWindow.destroy()
    }

    // If there is a code, proceed to get token from github
    if (code) {
      console.log('code:' + code)
      getToken(options, code)
      storage.set('login-user', {
        code: code
      }, function (error) {
        if (error) throw error
      })
    } else if (error) {
      alert('Oops! Something went wrong and we couldn\'t' +
        'log you in using Github. Please try again.')
    }
  }

  function getToken (option, code) {
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
        storage.set('login-user', {
          code: code,
          token: info.access_token
        }, function (error) {
          if (error) throw error
        })
      }
    }

    request(options, callback)
  }
</script>

<template>
  <div class="github">
    <h2>{{ msg }}</h2>
  </div>
</template>
