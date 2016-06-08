<script>
  import $ from 'jquery'
  import shell from 'shell'

  export default {
    name: 'Readme',

    props: [
      'repoReadme'
    ],

    ready() {
      const self = this

      $('.readme a').click(function(e) {
        e.preventDefault()
        const href = $(this).attr('href')
        if (href.match(/^[a-zA-Z]+:\/\//)) {
          self.openInBrowser(href)
        } else {
          // TODO dealwith wrong url
          console.log('[' + href + '] is a wrong url')
        }
      })
    },

    methods: {
      openInBrowser(url) {
        shell.openExternal(url);
      }
    }
  }
</script>
<template>
  <div class="readme">
    {{{ repoReadme }}}
  </div>
</template>
<style>
  .repos-readme .empty-placeholder {
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    color: #658399;
    font-weight: bold;
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 0;
    text-align: center;
    width: 100%;
  }

  .repos-readme .readme {
    margin: 16px;
  }

  .repos-readme .readme img {
    max-width: 670px;
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
