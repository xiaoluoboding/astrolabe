// vuex/modules/global.js
import {
  CHANGE_THEME,
  INCREASE_LIMIT
} from '../mutation-types'

// initial state
const state = {
  limitCount: 0,
  theme: {
    baseColor: 'teal',
    lightenColor: 'lighten-1',
    darkenColor: 'darken-1',
    accentColor: 'accent-4'
  }
}

// mutations
const mutations = {
  [CHANGE_THEME] (state, theme) {
    state.theme.baseColor = theme
  },

  [INCREASE_LIMIT] (state) {
    state.limitCount += 50
  }
}

export default {
  state,
  mutations
}
