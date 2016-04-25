<script>
  import NavBar from './NavBar'
  import SideBar from './SideBar'
  import Dashboard from './Dashboard'
  import { remote } from 'electron'
  import Github from 'github-api'
  import env from '../../config/env_dev.json'
  import db from '../utils/db'
  let connect = db.connect(env.throidal.url, env.throidal.options)

  var $ = require('jquery')

  export default {
    data () {
      return {
        appName: remote.app.getName(),
        msg: 'Welcome board the Throidal Starship！',
        login: '',
        avatarUrl: '',
        htmlUrl: '',
        repos: ''
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
          self.avatarUrl = result[0].avatar_url
          self.htmlUrl = result[0].html_url
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
            self.repos = repos
            // starsCol.insertMany(repos, {w: 1}, function(err, result) {
            //   console.log('Inserted Stars')
            // })
          })
        })
      })
      $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
      });
    },
    components: {
      NavBar,
      SideBar,
      Dashboard
    }
  }
</script>

<template>
  <header>
    <nav-bar :login='login' :avatar-url='avatarUrl' :html-url='htmlUrl'></nav-bar>
  </header>
  <main>
    <side-bar></side-bar>
    <dashboard :repos='repos'></dashboard>
  </main>
</template>
