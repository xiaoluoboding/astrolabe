import Vue from 'vue'
import store from './vuex/store'
import App from './App'
// Plugins
import Bootstrap from './components/plugins/Bootstrap'
import Nestable from './components/plugins/Nestable'
import MdlWave from './components/materialize/MdlWave'
import MdlDropdown from './components/materialize/MdlDropdown'
import Easing from './components/plugins/Easing'

new Vue({
  el: 'body',
  store,
  components: {
    App,
    Bootstrap,
    Nestable,
    MdlWave,
    MdlDropdown,
    Easing
  }
})
