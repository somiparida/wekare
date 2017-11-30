import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)
/*
const store = new Vuex.Store({
  state: {
    memberId: '',
    contactlogsbyfilter: [],
    contactlogs: [],
    contactlogsList: [],
    callType: '',
    callmethods: [],
    feedbackoptions: [],
    loadingloglist: false,
    categories: [],
    members: [],
    daterange: [],
    filterStartDate: '',
    filterEndDate: ''
  },
  actions,
  mutations,
  getters
})

export default store
*/

const store = new Vuex.Store({
  state: {
    memberId: '',
    members: [],
    callmethods: [],
    feedbackoptions: [],
    categories: [],
    daterange: [],
    apploader: false,
    filterStartDate: '',
    filterEndDate: '',
    contactlogsbyfilter: [],
    ungroupedfilteredcontactlogs: [],
    contactlogs: [],
    contactlogsList: [],
    def_feedbackoption: '3',
    def_memberoption: [],
    csauser: 'jsmith'
  },
  actions,
  getters,
  mutations,
  strict: true
})

export default store
