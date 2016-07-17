// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
// import parts from modules
import global from './modules/global'
import login from './modules/login'
import github from './modules/github'
import dashboard from './modules/dashboard'
import sidebar from './modules/sidebar'

Vue.use(Vuex)

export default new Vuex.Store({
  // combine sub modules
  modules: {
    global,
    login,
    github,
    dashboard,
    sidebar
  }
})
