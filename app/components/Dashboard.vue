<script>
  import {
    toggleLoadingRepos,
    toggleLoadingReadme,
    setActiveRepo,
    orderRepo,
    setLazyRepos,
    increaseLimit,
    filterByLanguage
  } from '../vuex/actions'
  import Search from './Search'
  import Readme from './Readme'
  import MdlLoading from './materialize/MdlLoading'
  import MdlFab from './materialize/MdlFab'
  import Stroll from './plugins/Stroll'
  const {shell} = require('electron')
  import $ from 'jquery'
  import hljs from 'highlight.js'
  import markdownIt from 'markdown-it'
  import db from '../services/db'
  import request from 'superagent'
  import InfiniteLoading from 'vue-infinite-loading'
  // import marked, { Renderer } from 'marked'

  const md = new markdownIt({
    html: true,
    linkify: true,
    typographer: true,
    langPrefix: 'lang-',
    highlight: (code, language) => {
      // Check whether the given language is valid for highlight.js.
      const validLang = !!(language && hljs.getLanguage(language));
      // Highlight only if the language is valid.
      const highlighted = validLang ? hljs.highlight(language, code).value : code;
      // Render the highlighted code with `hljs` class.
      return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
    }
  })

  // // Create your custom renderer.
  // const renderer = new Renderer();
  //
  // renderer.code = (code, language) => {
  //   // Check whether the given language is valid for highlight.js.
  //   const validLang = !!(language && hljs.getLanguage(language));
  //   // Highlight only if the language is valid.
  //   const highlighted = validLang ? hljs.highlight(language, code).value : code;
  //   // Render the highlighted code with `hljs` class.
  //   return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
  // };
  //
  // marked.setOptions({
  //   renderer,
  //   gfm: true,
  //   tables: true,
  //   breaks: false,
  //   pedantic: false,
  //   sanitize: true,
  //   smartLists: true,
  //   smartypants: false,
  //   highlight: function(code) {
  //     return hljs.highlightAuto(code).value;
  //   }
  // })

  export default {
    name: 'Dashboard',

    data() {
      return {
        repoReadme: '',
        distance: 100
      }
    },

    vuex: {
      getters: {
        github: ({ github }) => github.github,
        reposCount: ({ github }) => github.reposCount,
        langGroup: ({ github }) => github.langGroup,
        lazyRepos: ({ github }) => github.lazyRepos,
        loadingRepos: ({ dashboard }) => dashboard.loadingRepos,
        loadingReadme: ({ dashboard }) => dashboard.loadingReadme,
        activeRepo: ({ dashboard }) => dashboard.activeRepo,
        repoKey: ({ dashboard }) => dashboard.repoKey,
        order: ({ dashboard }) => dashboard.order,
        searchQuery: ({ sidebar }) => sidebar.searchQuery,
        filterFields: ({ sidebar }) => sidebar.filterFields,
        limitCount: ({ global }) => global.limitCount,
        theme: ({ global }) => global.theme
      },
      actions: {
        toggleLoadingRepos,
        toggleLoadingReadme,
        setActiveRepo,
        orderRepo,
        setLazyRepos,
        increaseLimit,
        filterByLanguage
      }
    },

    ready() {
      $(document).ready(function() {
        $('body').css('overflow', 'hidden')
        $('[data-toggle="tooltip"]').tooltip()
        $('.repos-desc').css('height', $(window).height() - 124)
      })

      $(window).resize(function() {
        $('.repos-desc').css('height', $(this).height() - 124)
      })
    },

    methods: {
      openInBrowser(url) {
        shell.openExternal(url);
      },
      showReadme(repo) {
        const self = this
        if (repo._id != this.activeRepo._id) {
          this.setActiveRepo(repo)
          this.toggleLoadingReadme()
          const githubRepo = this.github.getRepo(repo.owner_name, repo.repo_name)
          const readmeUrl = 'https://api.github.com/repos/' + repo.owner_name + '/' + repo.repo_name + '/readme'
          request.get(readmeUrl)
            .accept('application/json')
            .end(function(err, res) {
              if (!err && res) {
                githubRepo.getContents('master', res.body.name, true, function(err, data) {
                  if (err) {
                    console.dir(err.status);
                    // TODO dealwith 404
                  }
                  // self.repoReadme = marked(data)
                  self.repoReadme = md.render(data)
                  self.toggleLoadingReadme()
                })
              } else {
                console.log('Something went wrong fetching from GitHub', err);
              }
            })
        }
      },
      loadMore() {
        const self = this
        // Configurable
        this.increaseLimit()
        setTimeout(() => {
          db.fetchLazyRepos(self.limitCount).then(lazyRepos => {
            self.setLazyRepos(lazyRepos)
            self.$broadcast('$InfiniteLoading:loaded')
          })
        }, 1000)
      },
      reload() {
        const self = this
        setTimeout(() => {
          db.fetchLazyRepos(self.limitCount).then(lazyRepos => {
            self.setLazyRepos(lazyRepos)
          })
        }, 1000)
      }
    },

    watch: {
      'langGroup': function (val, oldVal) {
        this.toggleLoadingRepos()
      },
      'loadingRepos': function (val, oldVal) {
        if (!val) {
          this.reload()
        }
      }
    },

    components: {
      Search,
      Readme,
      MdlLoading,
      MdlFab,
      Stroll,
      InfiniteLoading
    }
  }
</script>
<template>
  <main class="wrapper">
    <div class="content">
      <div class="btn-group btn-repos">
        <a class="waves-effect waves-light btn"
           @click="orderRepo('owner_name')"
           :class="[theme.baseColor, theme.accentColor]">Owner</a>
        <a class="waves-effect waves-light btn"
           @click="orderRepo('repo_name')"
           :class="[theme.baseColor, theme.accentColor]">Repo</a>
        <a class="waves-effect waves-light btn"
           @click="orderRepo('stargazers_count')"
           :class="[theme.baseColor, theme.accentColor]">Star</a>
        <a class="waves-effect waves-light btn"
           @click="orderRepo('repo_idx')"
           :class="[theme.baseColor, theme.accentColor]">Time</a>
      </div>
      <aside id="repos-desc" class="repos-desc cards">
        <!-- {{ $data | json }} -->
        <div
          class="card waves-effect waves-light animated fadeIn"
          :class="{ 'blue-grey': activeRepo._id === repo._id, 'darken-1': activeRepo._id === repo._id }"
          @click="showReadme(repo)"
          v-for="repo in lazyRepos | filterBy searchQuery in filterFields | orderBy repoKey order">
          <div class="card-content" :class="{ 'white-text': activeRepo._id === repo._id }">
            <span class="card-title">{{ repo.owner_name }} / {{ repo.repo_name }}</span>
            <p>{{ repo.description }}</p>
            <div class="card-tag" v-if="repo.language">
              <div class="chip" @click="filterByLanguage(repo.language)" v-if="repo.language != 'null'">
               {{ repo.language }}
              </div>
            </div>
            <div class="card-action">
              <div class="repo-count">
                <div class="star">
                  <i class="material-icons">star</i><span> {{ repo.stargazers_count }}</span>
                </div>
                <div class="fork">
                  <i class="devicons devicons-git_branch"></i><span> {{ repo.forks_count }}</span>
                </div>
              </div>
              <a href="#" @click="openInBrowser(repo.html_url)">View on GitHub</a>
            </div>
          </div>
        </div>
        <infinite-loading :distance="distance" :on-infinite="loadMore" v-if="limitCount < reposCount">No More Data.</infinite-loading>
      </aside>
      <mdl-fab></mdl-fab>
      <mdl-loading v-show='loadingReadme'></mdl-loading>
      <main id="repos-readme" class="repos-readme">
        <!-- {{ $data | json }} -->
        <div class='empty-placeholder' v-if='repoReadme.length == 0'>
          No Repo Selected
        </div>
        <readme :repo-readme='repoReadme' v-else></readme>
      </main>
      <!-- stroll component is after the cards's dom rendered -->
      <!-- <stroll v-if="repos.length > 10"></stroll> -->
    </div>
  </div>
</template>
<style>
  .btn-group.btn-repos {
    position: relative;
    /*position: absolute;
    left: 240px;
    top: 64px;
    bottom: 0;*/
    padding: 12px 8px;
    width: 320px;
    background: #fafafa;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .repos-desc {
    position: relative;
    /*position: absolute;
    left: 240px;
    top: 128px;
    bottom: 0;*/
    padding: 0 8px;
    width: 320px;
    background: white;
    overflow-y: scroll;
    overflow-x: hidden;
    border-right: 1px solid rgba(55,53,112,0.08);
  }

  .repos-desc .waves-effect {
    display: block;
  }

  .repos-desc a:hover {
    color: #004D40;
    text-decoration: underline;
  }

  .repos-readme {
    position: absolute;
    background: #fff;
    color: #546e7a;
    /*top: 64px;
    left: 560px;*/
    top: 0;
    left: 320px;
    right: 0;
    bottom: 0;
    min-width: 448px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  /* btn-group */

  .btn-group {
    width: 100%;
    display: inline-table;
    table-layout: fixed;
    border-collapse: separate;
  }

  .btn-group .btn {
    padding: 0 10px;
    display: table-cell;
    border-radius: 0;
    text-transform: inherit;
    width: 100%;
    font-weight: bold;
  }

  .btn-group .btn i.left {
    margin: 0
  }

  .btn-group .btn .octicon {
    margin: 10px 0;
    float: left
  }

  /* cards */

  .card {
    margin: 0.5rem 0 0.5rem 0;
  }

  .card .card-content {
    padding: 8px;
  }

  .card .card-title {
    font-size: 16px;
    font-weight: 700;
  }

  .card .card-content .card-title {
    line-height: 36px;
    color: #546e7a;
  }

  .card .card-content.white-text .card-title {
    line-height: 36px;
    color: #fff;
  }

  .card .card-content p {
    margin: 0 0 8px 0;
  }

  .card .card-content .card-tag .chip {
    margin-bottom: 8px;
    height: 24px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.8);
    padding: 2px 8px;
    background-color: #e0e0e0;
  }

  .card .card-content .card-tag .chip:hover {
    color: #004D40;
    text-decoration: underline;
  }

  .card .card-content.white-text .card-tag .chip {
    margin-bottom: 8px;
    color: rgba(255, 255, 255, 0.9);
    background-color: #FFAB40;
  }

  .card .card-action {
    padding: 8px 0 0 0;
  }

  .card .card-content .card-action .repo-count {
    display: inline-flex;
    margin-top: 2px;
    font-weight: bold;
    color: #546e7a;
  }

  .card .card-content .card-action .repo-count i{
    font-size: 18px;
  }

  .card .card-content.white-text .card-action .repo-count {
    color: #fff;
  }

  .card .card-action .repo-count .star {
    margin-right: 4px;
  }

  .card .card-action .repo-count span {
    float: right;
    margin: -2px 2px;
  }

  .card .card-content .card-action a:not(.btn):not(.btn-large):not(.btn-floating) {
    float: right;
    margin: 0px;
    transition: color .3s ease;
    color: #26a69a;
    font-size: 13px;
    font-weight: bold;
    text-transform: inherit;
  }

  .card .card-content.white-text .card-action a:not(.btn):not(.btn-large):not(.btn-floating) {
    color: #ffab40;
  }

  .repos-desc .empty-placeholder {
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
</style>
