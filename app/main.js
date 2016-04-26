import Vue from 'vue'
import App from './App'
import Bootstrap from './components/Bootstrap'
import MdlWave from './components/materialize/MdlWave'
import MdlDropdown from './components/materialize/MdlDropdown'
import Nestable from './components/Nestable'
import Resource from 'vue-resource'

/* eslint-disable no-new */
Vue.use(Resource)

new Vue({
  el: 'body',
  components: { App, Bootstrap, MdlWave, MdlDropdown, Nestable }
})
