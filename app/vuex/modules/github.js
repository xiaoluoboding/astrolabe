// vuex/modules/github.js
import {
  SET_TOKEN,
  SET_GITHUB,
  SET_USER,
  INIT_REPOS,
  SET_REPOS
} from '../mutation-types'
import mongoose from 'mongoose'
import env from '../../../config/env_dev.json'
// const db = mongoose.connect(env.db.url)
mongoose.connect(env.db.url)
import Users from '../models/usersModel'
import Repos from '../models/reposModel'
import userRepos from '../models/userReposModel'

// initial state
const state = {
  token: '',
  github: '',
  user: '',
  repos: [],
  langGroup: []
}

// mutations
const mutations = {
  [SET_TOKEN] (state, token) {
    state.token = token
  },

  [SET_GITHUB] (state, github) {
    state.github = github
  },

  [SET_USER] (state, user) {
    user._id = user.id
    let query = {_id: user.id}
    let doc = {$set: user}
    let options = {upsert: true, new: true}
    let callback = function(err, result) {
      if (err) {
        console.log(err)
        return
      }
      state.user = result
      // console.log(db);
      console.log('findOneAndUpdate user[' + user.login + ']')
    }
    Users.findOneAndUpdate(query, doc, options, callback)
  },

  [INIT_REPOS] (state, user, repos) {
    // insert t_repos
    let initRepos = []
    let reposArray = []
    for (let i in repos) {
      let t_repo = {
        '_id': repos[i].id,
        'owner_name': repos[i].full_name.split('\/').shift(),
        'repo_name': repos[i].full_name.split('\/').pop(),
        'description': repos[i].description,
        'stargazers_count': repos[i].stargazers_count,
        'forks_count': repos[i].forks_count,
        'html_url': repos[i].html_url,
        'clone_url': repos[i].clone_url,
        'git_url': repos[i].git_url,
        'downloads_url': repos[i].downloads_url,
        'created_at': repos[i].created_at,
        'updated_at': repos[i].updated_at,
        'language': repos[i].language
      }
      let query = {_id: repos[i].id}
      let doc = {$set: t_repo}
      let options = {upsert: true, new: true}
      let callback = function(err, result) {
        if (err) {
          console.log(err)
          return
        }
      }
      Repos.findOneAndUpdate(query, doc, options, callback)
      initRepos.push(t_repo);
      reposArray.push(repos[i].id)
    }
    console.log('findOneAndUpdate [%d] repos', repos.length)

    // insert t_user_repos
    let aggregate = [
      {$match: {_id: {$in: reposArray}}},
      {$group: {_id: '$language', count: {$sum: 1}}},
      {$project: {_id: 0, lang: '$_id', count: 1}},
      {$sort: {count: -1, lang: 1}}
    ]
    Repos.aggregate(
      aggregate,
      function (err, res) {
        if (err) {
          console.log(err)
          return
        }
        state.langGroup = res
        let user_repos = {
          'user_id': user.id,
          'repos': reposArray,
          'lang_group': res
        }
        let query = {user_id: user.id}
        let doc = {$set: user_repos}
        let options = {upsert: true, new: true}
        let callback = function(err, result) {
          if (err) {
            console.log(err)
            return
          }
          console.log('findOneAndUpdate t_user_repos')
        }
        userRepos.findOneAndUpdate(query, doc, options, callback)
      }
    )

    // set init repos
    state.repos = initRepos
  },

  [SET_REPOS] (state) {
    Repos.find({}, function (err, result) {
      if (err) {
        console.log(err)
        return
      }
      state.repos = result
    })
  }
}

export default {
  state,
  mutations
}
