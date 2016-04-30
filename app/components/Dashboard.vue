<script>
  import {
    toggleLoadingReadme,
    setActiveRepo,
    orderRepo
  } from '../vuex/actions'
  import Octicon from '../node_modules/vue-octicon/src/components/Octicon'
  import Search from './Search'
  import Readme from './Readme'
  import MdlLoading from './materialize/MdlLoading'
  import shell from 'shell'
  import marked from 'marked'

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  })

  export default {
    name: 'Dashboard',

    data () {
      return {
        repoReadme: ''
      }
    },

    props: [
      'searchQuery'
    ],

    vuex: {
      getters: {
        github: ({ github }) => github.github,
        repos: ({ github }) => github.repos,
        loadingReadme: ({ dashboard }) => dashboard.loadingReadme,
        activeRepo: ({ dashboard }) => dashboard.activeRepo,
        repoKey: ({ dashboard }) => dashboard.repoKey,
        order: ({ dashboard }) => dashboard.order
      },
      actions: {
        toggleLoadingReadme,
        setActiveRepo,
        orderRepo
      }
    },

    ready () {
      // Bind via element reference
      // stroll.bind(document.getElementById('cards'));
    },

    methods: {
      openInBrowser(url) {
        shell.openExternal(url);
      },
      showReadme(repo) {
        var self = this
        if (repo.id != this.activeRepo.id) {
          this.setActiveRepo(repo)
          this.repoReadme = true
          var githubRepo = this.github.getRepo(repo.owner_name, repo.repo_name)
          githubRepo.read('master', 'README.md', function(err, data) {
            self.repoReadme = marked(data)
          });
        }
      },
      orderByRepoKey(repoKey) {
        this.orderRepo(repoKey)
      }
    },

    watch: {
      'repoReadme': function (val, oldVal) {
        if (val) {
          this.toggleLoadingReadme()
        }
      }
    },

    components: {
      Octicon,
      Search,
      Readme,
      MdlLoading
    }
  }
</script>
<template>
  <main id="content" class="content">
    <div class="btn-group btn-repos">
      <a class="waves-effect waves-light btn" @click="orderByRepoKey('owner_name')"><octicon name="octoface"></octicon>Owner</a>
      <a class="waves-effect waves-light btn" @click="orderByRepoKey('repo_name')"><octicon name="repo"></octicon>Repo</a>
      <a class="waves-effect waves-light btn" @click="orderByRepoKey('stargazers_count')"><octicon name="star"></octicon>Star</a>
    </div>
    <aside id="repos-desc" class="repos-desc">
      <!-- <search :search-query.sync="searchQuery"></search> -->
      <div id="cards" class="cards">
        <div
          class="card"
          :class="{ 'blue-grey': activeRepo.id === repo.id }"
          :class="{ 'darken-1': activeRepo.id === repo.id }"
          @click="showReadme(repo)"
          v-for="repo in repos | filterBy searchQuery in 'owner_name' 'repo_name' 'description' | orderBy repoKey order">
          <div class="card-content" :class="{ 'white-text': activeRepo.id === repo.id }">
            <span class="card-title">{{ repo.owner_name }} / {{ repo.repo_name }}</span>
            <p>{{ repo.description }}</p>
            <div class="tags">
              <div class="chip">
               {{ repo.language }}
              </div>
            </div>
            <div class="card-action">
              <div class="repo-count">
                <div class="star">
                  <octicon name="star"></octicon><span> {{ repo.stargazers_count }}</span>
                </div>
                <div class="fork">
                  <octicon name="repo-forked"></octicon><span> {{ repo.forks_count }}</span>
                </div>
              </div>
              <a href="#" @click="openInBrowser(repo.html_url)">View on GitHub</a>
            </div>
          </div>
        </div>
      </div>
      <!-- <ul class="collection">
        <li href="#" class="collection-item"
            :class="{ active: activeRepo.id === repo.id }"
            @click="showReadme(repo)"
            v-for="repo in repos | filterBy searchQuery in 'owner_name' 'repo_name' 'description' | orderBy repoKey order" track-by="$index">
          <span class="title">{{ repo.owner_name }} / {{ repo.repo_name }}</span>
          <p>{{ repo.description }}</p>
          <div class="tags">
            <div class="chip">
             {{ repo.language }}
            </div>
          </div>
          <div class="repo-count">
            <div class="star">
              <octicon name="star"></octicon><span> {{ repo.stargazers_count }}</span>
            </div>
            <div class="fork">
              <octicon name="repo-forked"></octicon><span> {{ repo.forks_count }}</span>
            </div>
          </div>
          <a href="#" class="secondary-content" @click="openInBrowser(repo.html_url)">View on GitHub</a>
        </li>
      </ul> -->
    </aside>
    <main id="repos-readme" class="repos-readme">
      <!-- {{ $data | json }} -->
      <div class='empty-placeholder' v-if='!repoReadme'>
        No Repo Selected
      </div>
      <div v-else>
        <div class="animated fadeIn" v-if='loadingReadme'>
          <mdl-loading></mdl-loading>
        </div>
        <div class="animated fadeIn" v-else>
          <readme :repo-readme='repoReadme'></readme>
        </div>
      </div>
    </main>
  </main>
</template>
<style>
  .btn-group.btn-repos {
    position: absolute;
    left: 240px;
    top: 64px;
    bottom: 0;
    padding: 12px 8px;
    width: 320px;
    background: #fafafa;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .repos-desc {
    position: absolute;
    left: 240px;
    top: 128px;
    bottom: 0;
    padding: 0 8px;
    width: 320px;
    background: white;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid rgba(55,53,112,0.08);
  }

  .repos-readme {
    position: absolute;
    background: #fff;
    color: #546e7a;
    top: 64px;
    left: 560px;
    right: 0;
    bottom: 0;
    min-width: 448px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  /* collection */

  .collection {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12),0 2px 8px 0 rgba(0,0,0,0.12);
  }

  .collection .collection-item {
    padding: 10px;
  }

  .collection .collection-item .title{
    font-size: 16px;
    font-weight: bold;
    color: #546e7a;
  }

  .collection .collection-item.active .title{
    color: #fff;
  }

  .collection .collection-item .repo-count{
    display: inline-flex;
    margin-top: 2px;
    font-weight: bold;
    color: #546e7a;
  }

  .collection .collection-item.active .repo-count{
    color: #fff;
  }

  .collection .collection-item .secondary-content {
    font-size: 13px;
    font-weight: bold;
  }

  .collection .collection-item .repo-count .star{
    margin-right: 4px;
  }

  .collection .collection-item .repo-count span{
    float: right;
    margin: -2px 2px;
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
  }

  .btn-group .btn i.left {
    margin: 0
  }

  .btn-group .btn .octicon {
    margin: 10px 0;
    float: left
  }

  /* cards */

  .cards {
    margin: 0.5rem 0 1rem 0;
  }

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

  .card .card-action {
    padding: 8px 0 0 0;
  }

  .card .card-content .card-action .repo-count {
    display: inline-flex;
    margin-top: 2px;
    font-weight: bold;
    color: #546e7a;
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
</style>
