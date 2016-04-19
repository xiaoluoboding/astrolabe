<script>
  import { remote } from 'electron'
  import os from 'os'

  export default {
    data () {
      return {
        platform: os.platform(),
        appName: remote.app.getName(),
        msg: 'Welcome board the Throidal Starship！'
      }
    }
  }
</script>

<template>
  <div class="hello">
    <header>
      <h1>Throidal</h1>
    </header>
    <h2>{{ msg }}</h2>
    <span> from {{ appName }} running on {{ platform }} </span>
  </div>
</template>
