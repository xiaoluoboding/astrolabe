// vuex/modules/global.js
import {
  CHANGE_THEME
} from '../mutation-types'

// initial state
const state = {
  theme: {
    baseColor: 'cyan',
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
