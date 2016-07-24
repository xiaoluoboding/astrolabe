// vuex/modules/global.js
import {
  CHANGE_THEME
} from '../mutation-types'

// initial state
const state = {
  theme: {
    baseColor: 'green',
    lightenColor: 'lighten-1',
    darkenColor: 'darken-1',
    accentColor: 'accent-4'
  }
}

// mutations
const mutations = {
  [CHANGE_THEME] (state, theme) {
    state.theme.baseColor = theme
  }
}

export default {
  state,
  mutations
}
