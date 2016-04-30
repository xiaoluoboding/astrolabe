// vuex/modules/github.js
import {
  SET_TOKEN,
  SET_GITHUB,
  SET_USER,
  SET_REPOS
} from '../mutation-types'

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
    state.user = user
  },

  [SET_REPOS] (state, repos) {
    state.repos = repos
  }
}

export default {
  state,
  mutations
}
