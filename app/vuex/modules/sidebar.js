// vuex/modules/sidebar.js
import {
  TOGGLE_SIDEBAR
} from '../mutation-types'

// initial state
const state = {
  isAll: true
}

// mutations
const mutations = {
  [TOGGLE_SIDEBAR] (state) {
    state.isAll = !state.isAll
  }
}

export default {
  state,
  mutations
}
