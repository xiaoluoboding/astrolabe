// vuex/modules/login.js
import {
  TOGGLE_CONNECTING,
  TOGGLE_LOADING,
  TOGGLE_LOGIN
} from '../mutation-types'

// initial state
const state = {
  connecting: false,
  loading: false,
  isLogin: false
}

// mutations
const mutations = {
  [TOGGLE_CONNECTING] (state) {
    state.connecting = true
  },

  [TOGGLE_LOADING] (state) {
    state.connecting = !state.connecting
    state.loading = true
  },

  [TOGGLE_LOGIN] (state) {
    state.loading = !state.loading
    state.isLogin = true
  }
}

export default {
  state,
  mutations
}
