// vuex/modules/dashboard.js
import {
  TOGGLE_LOADING_REPOS,
  TOGGLE_LOADING_README,
  SET_ACTIVE_REPO,
  ORDER_REPO
} from '../mutation-types'

// initial state
const state = {
  loadingRepos: false,
  loadingReadme: false,
  activeRepo: {},
  repoKey: '',
  order: 1
}

// mutations
const mutations = {
  [TOGGLE_LOADING_REPOS] (state) {
    state.loadingRepos = !state.loadingRepos
  },

  [TOGGLE_LOADING_README] (state) {
    state.loadingReadme = !state.loadingReadme
  },

  [SET_ACTIVE_REPO] (state, repo) {
    state.activeRepo = repo
  },

  [ORDER_REPO] (state, repoKey) {
    state.repoKey = repoKey
    state.order = state.order * -1
  }
}

export default {
  state,
  mutations
}
