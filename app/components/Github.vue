<script>
  // import Github from 'github-api'
  import { remote } from 'electron'
  let BrowserWindow = remote.BrowserWindow

  // let github = new Github({
  //   apiUrl: 'https://api/github.com'
  // })
  //
  // console.log(github)

  // let gist = github.getGist('8a90d65c4a2cc51272f0')
  //
  // gist.read(function (err, gist) {
  //   console.log(gist)
  // })

  // Build the OAuth consent page URL
  let authWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: true,
    'web-preferences': {
      'node-integration': false
    }
  })

  let options = {
    client_id: '',
    client_secret: '',
    scope: ['user:email']
  }

  let githubUrl = 'https://github.com/login/oauth/authorize?'
  let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scope

  authWindow.loadURL(authUrl)

  authWindow.webContents.on('will-navigate', function (event, url) {
    handleCallback(url)
  })

  authWindow.webContents.on('did-get-redirect-request', function (event, oldUrl, newUrl) {
    handleCallback(newUrl)
  })

  function handleCallback (url) {
    var raw_code = /code=([^&]*)/.exec(url) || null
    var code = (raw_code && raw_code.length > 1) ? raw_code[1] : null
    var error = /\?error=(.+)$/.exec(url)

    if (code || error) {
      // Close the browser if code found or error
      authWindow.destroy()
    }

    // If there is a code, proceed to get token from github
    if (code) {
      console.log(code)
    } else if (error) {
      alert('Oops! Something went wrong and we couldn\'t' +
      'log you in using Github. Please try again.')
    }
  }

  // If "Done" button is pressed, hide "Loading"
  authWindow.on('close', function () {
    authWindow.destroy()
  })

  export default {
    data () {
      return {
        msg: 'GitHub API'
      }
    },

    method: {
      auth: function () {
        authWindow.loadURL(authUrl)
      }
    }
  }
</script>

<template>
  <div class="github">
    <h2>{{ msg }}</h2>
  </div>
</template>
