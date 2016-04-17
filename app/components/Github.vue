<script>
  import Github from 'github-api'

  let github = new Github({
    apiUrl: 'https://api/github.com'
  })

  console.log(github)

  // let gist = github.getGist('8a90d65c4a2cc51272f0')
  //
  // gist.read(function (err, gist) {
  //   console.log(gist)
  // })

  export default {
    data () {
      return {
        msg: 'GitHub API'
      }
    }
  }
</script>

<template>
  <div class="github">
    <h2>{{ msg }}</h2>
  </div>
</template>
