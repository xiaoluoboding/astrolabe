// vuex/modules/sidebar.js
import {
  TOGGLE_SIDEBAR,
  SET_SEARCH_QUERY,
  FILTER_BY_LANGUAGE
} from '../mutation-types'

// initial state
const state = {
  searchQuery: '',
  filterFields: [
    'owner_name',
    'repo_name',
    'description',
    'language'
  ]
}

// mutations
const mutations = {
  [SET_SEARCH_QUERY] (state, searchQuery) {
    if (state.filterFields.length == 1) {
      state.filterFields = [
        'owner_name',
        'repo_name',
        'description',
        'language'
      ]
    }
    state.searchQuery = searchQuery
  },
  [FILTER_BY_LANGUAGE] (state, searchQuery) {
    state.filterFields = ['language']
    state.searchQuery = searchQuery
  }
}

export default {
  state,
  mutations
}
