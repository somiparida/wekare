// import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import { sync } from 'vuex-router-sync'
import * as types from './store/types'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
sync(store, router)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  data: {
    seen: true,
    show: true,
    csa: 'jsmith'
  },
  methods: {
    async getallcontactlogs () {
      console.log('initializing contatlogs dropdown options')
      new Promise((resolve, reject) => {
        if (this.$store.dispatch(types.SET_CONTACTLOG_LIST, this.$route.params.id)) {
          resolve()
        }
      })
    },
    async setcsa (payload) {
      console.log('initializing CSA')
      new Promise((resolve, reject) => {
        if (this.$store.commit(types.MUTATE_CSA, payload)) {
          resolve()
        }
      })
    }
  },
  created () {
    if (typeof this.$route.params.id !== 'undefined') {
      console.log('initializing route' + this.$route.params.id)
      this.$store.dispatch(types.SET_MEMBERID, this.$route.params.id)
      this.csa = (this.$route.query.csa === null || this.$route.query.csa === '' || typeof this.$route.query.csa === 'undefined') ? this.csa : this.$route.query.csa
      localStorage.setItem('csa', this.csa)
      this.getallcontactlogs()
      this.setcsa(this.csa)
    }
  },
  computed: {
  },
  init: function () {}
})
