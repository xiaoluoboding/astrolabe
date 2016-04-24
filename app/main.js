import Vue from 'vue'
import App from './App'
import Bootstrap from './components/Bootstrap'
import Resource from 'vue-resource'

/* eslint-disable no-new */
Vue.use(Resource)

new Vue({
  el: 'body',
  components: { App, Bootstrap }
})
