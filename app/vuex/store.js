// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
// import parts from modules
import login from './modules/login'
import github from './modules/github'
import dashboard from './modules/dashboard'

Vue.use(Vuex)

export default new Vuex.Store({
  // combine sub modules
  modules: {
    login,
    github,
    dashboard
  }
})
