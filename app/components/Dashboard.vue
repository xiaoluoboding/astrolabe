<script>
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
        repoReadme: '',
        loadingReadme: ''
      }
    },

    props: [
      'searchQuery',
      'github',
      'repos'
    ],

    methods: {
      openInBrowser(url) {
        shell.openExternal(url);
      },
      showReadme(userName, repoName) {
        this.loadingReadme = false
        var self = this
        var github = this.github
        var repo = github.getRepo(userName, repoName)
        repo.read('master', 'README.md', function(err, data) {
          self.repoReadme = marked(data)
        });
      }
    },

    watch: {
      'repoReadme': function (val, oldVal) {
        if (val) {
          this.loadingReadme = true
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
    <aside id="repos-desc" class="repos-desc">
      <!-- <search :search-query.sync="searchQuery"></search> -->
      <dot-loader v-if=''></dot-loader>
      <ul class="collection">
        <li class="collection-item"
            @click="showReadme(repo.full_name.split('\/').shift(),repo.full_name.split('\/').pop())"
            v-for="repo in repos | filterBy searchQuery in 'full_name' 'description'">
          <span class="title">{{ repo.full_name }}</span>
          <p>{{ repo.description }}</p>
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
      </ul>
    </aside>
    <main id="repos-readme" class="repos-readme">
      <!-- <div class="wrapper">
        <div class="constructor">
          <h2 class="headline">Sidebar Constructor</h2>
          <p>
            <label for="sidebar-position">Sidebar postion</label>
            <select id="sidebar-position" name="sidebar-position">
              <option value="">Default</option>
              <option value="sidebar-fixed-left">Float on left</option>
              <option value="sidebar-fixed-right">Float on right</option>
              <option value="sidebar-stacked">Stacked on left</option>
            </select>
          </p>
          <p>
            <label for="sidebar-theme">Sidebar theme</label>
            <select id="sidebar-theme" name="sidebar-theme">
              <option value="sidebar-default">Default</option>
              <option value="sidebar-inverse">Inverse</option>
              <option value="sidebar-colored">Colored</option>
              <option value="sidebar-colored-inverse">Colored-Inverse</option>
            </select>
          </p>
          <p>
            <label for="sidebar-header">Sidebar header cover</label>
            <select id="sidebar-header" name="sidebar-header">
              <option value="header-cover">Image cover</option>
              <option value="">Color cover</option>
            </select>
          </p>
          <p>
            <a class="waves-effect waves-light btn sidebar-toggle">Toggle sidebar</a>
          </p>
        </div>
      </div> -->
      <div class='empty-placeholder' v-if='!repoReadme'>
        No Repo Selected
      </div>
      <div v-else>
        <mdl-loading v-if='!loadingReadme'></mdl-loading>
        <readme v-if='loadingReadme' :repo-readme='repoReadme'></readme>
      </div>
    </main>
  </main>
</template>
<style>
  .repos-desc {
    position: absolute;
    left: 240px;
    top: 64px;
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

  .collection {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12),0 2px 8px 0 rgba(0,0,0,0.12);
  }

  .collection .collection-item {
    padding: 10px;
  }

  .collection .collection-item:hover {
    background: #fafafa;
  }

  .collection .collection-item .title{
    font-size: 16px;
    font-weight: bold;
    color: #546e7a;
  }

  .collection .collection-item .repo-count{
    display: inline-flex;
    margin-top: 2px;
    font-weight: bold;
    color: #546e7a;
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
</style>
