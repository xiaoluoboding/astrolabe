<script>
  import SideBar from './SideBar'
  import { remote } from 'electron'
  import os from 'os'
  import Github from 'github-api'
  import env from '../../config/env_dev.json'
  import db from '../utils/db'
  let connect = db.connect(env.throidal.url, env.throidal.options)

  export default {
    data () {
      return {
        platform: os.platform(),
        appName: remote.app.getName(),
        msg: 'Welcome board the Throidal Starship！',
        login: '',
        avatar_url: '',
        html_url: ''
      }
    },

    props: [
      'token',
      'loading'
    ],

    ready: function() {
      var self = this
      connect(function(db) {
        // Get the documents collection
        var userCol = db.collection('t_user')
        userCol.find({}).toArray(function(err, result) {
          self.login = result[0].login
          self.avatar_url = result[0].avatar_url
          self.html_url = result[0].html_url
          var github = new Github({
            token: self.token,
            auth: 'oauth'
          })
          var user = github.getUser()
          user.userStarred(result[0].login, function(err, repos) {
            // var starsCol = db.collection('t_stars')
            for (var i in repos) {
              console.log(repos[i].full_name)
              // starsCol.find({full_name: repos[i].full_name}).toArray(function(err, result) {
              //
              // })
            }
            // starsCol.insertMany(repos, {w: 1}, function(err, result) {
            //   console.log('Inserted Stars')
            // })
          })
        })
      })
    },
    components: {
      SideBar
    }
  }
</script>

<template>
  <!-- The drawer is always open in large screens. The header is always shown,
  even in small screens. -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <div class="mdl-layout-spacer"></div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                    mdl-textfield--floating-label mdl-textfield--align-right">
          <label class="mdl-button mdl-js-button mdl-button--icon"
                 for="fixed-header-drawer-exp">
            <i class="material-icons">search</i>
          </label>
          <div class="mdl-textfield__expandable-holder">
            <input class="mdl-textfield__input" type="text" name="sample"
                   id="fixed-header-drawer-exp">
          </div>
        </div>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">Title</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content"><!-- Your content goes here --></div>
    </main>
  </div>
  <side-bar></side-bar>
</template>

<style>
  .nav-wrapper {
    margin-left: 300px;
  }
</style>
