// vuex/modules/github.js
import {
  SET_TOKEN,
  SET_GITHUB,
  SET_USER,
  SET_REPOS
} from '../mutation-types'
import mongoose from 'mongoose'
import env from '../../../config/env_dev.json'
mongoose.connect(env.db.url)
import Users from '../models/users'
import Repos from '../models/repos'

// initial state
const state = {
  token: '',
  github: '',
  user: '',
  repos: []
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
    // state.user = user
    user._id = user.id
    Users.findOneAndUpdate({_id: user.id}, {$set: user}, {upsert: true}, function(err, result) {
      if (err) {
        console.log(err)
        return
      }
      state.user = result
    })
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
