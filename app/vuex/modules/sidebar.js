// vuex/modules/sidebar.js
import {
  TOGGLE_SIDEBAR,
  SET_SEARCH_QUERY,
  FILTER_BY_LANGUAGE
} from '../mutation-types'

// initial state
const state = {
  isAll: true,
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
  [TOGGLE_SIDEBAR] (state) {
    state.isAll = !state.isAll
  },
  [SET_SEARCH_QUERY] (state, searchQuery) {
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
