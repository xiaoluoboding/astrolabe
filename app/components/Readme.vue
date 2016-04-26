<script>
  export default {
    name: 'Readme',

    props: [
      'repoReadme'
    ]
  }
</script>
<template>
  <div class="readme">
    {{{ repoReadme }}}
  </div>
</template>
<style>
  .repos-readme .readme {
    margin: 16px;
  }

  .repos-readme .readme img {
    max-width: 750px;
    vertical-align: middle;
  }

  .repos-readme .readme h1 {
    padding-bottom: 0.3em;
    font-size: 2.25em;
    line-height: 1.2;
    border-bottom: 1px solid #eee;
  }

  .repos-readme .readme h2 {
    padding-bottom: 0.3em;
    font-size: 1.75em;
    font-weight: bold;
    line-height: 1.225;
    border-bottom: 1px solid #eee;
  }

  .repos-readme .readme h3 {
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.43;
  }

  .repos-readme .readme ul {
    padding-left: 2em;
    list-style-type: disc;
  }

  .repos-readme .readme ul li {
    list-style-type: disc;
  }

  .repos-readme .readme ul ul, .repos-readme .readme ol ul {
    list-style-type: circle;
  }
</style>
