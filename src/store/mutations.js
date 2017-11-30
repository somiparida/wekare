import * as types from './types'
import moment from 'moment'
var _ = require('lodash')

export default {
  [types.MUTATE_MEMBER_ID]: (state, payload) => {
    console.log('mutations --SET APPLICATION MEMBER ID ===> ' + payload)
    state.memberId = payload
  },
  [types.MUTATE_MEMBER_LIST]: (state, { list }) => {
    state.members = list
    console.log('mutations --SET APPLICATION MEMBER LIST ===> ' + state.members)
  },
  [types.MUTATE_METHOD_LIST]: (state, { list }) => {
    state.callmethods = list
    console.log('mutations --SET APPLICATION METHOD LIST ===> ')
  },
  [types.MUTATE_CATEGORY_LIST]: (state, { list }) => {
    state.categories = list
    console.log('mutations --SET APPLICATION CATEGORY/SUBCATEGORY LIST ===> ')
  },
  [types.MUTATE_FEEDBACKTYPE_LIST]: (state, { list }) => {
    state.feedbackoptions = list
    console.log('mutations --SET APPLICATION FEEDBACK LIST ===> ')
  },
  [types.MUTATE_APPLOADER]: (state, value) => {
    state.apploader = value
    console.log('mutations --SET APPLICATION LOADER ===> ')
  },
  [types.MUTATE_CSA]: (state, value) => {
    state.csauser = value
    console.log('mutations --SET APPLICATION CSA USER ===> ')
  },
  [types.MUTATE_GROUPCONTACTLOG_LIST]: (state, { list }) => {
    var clogs = list
    state.ungroupedfilteredcontactlogs = list
    // state.contactlogsList = list
    clogs = _.sortBy(clogs, function (o) {
      return o.Checkin
    }).reverse()
    state.contactlogs = _.groupBy(clogs, function (item) {
      return item.Checkin.substring(0, 7)
    })
    state.contactlogsbyfilter = _.groupBy(clogs, function (item) {
      return item.Checkin.substring(0, 7)
    })
  },
  [types.MUTATE_MEMBERLOGLIST]: (state, { list }) => {
    console.log('mutations --SET MEMBERLOGLIST ===> ')
    state.contactlogsList = list
  },
  [types.MUTATE_LOG_DATE]: (state, list) => {
    console.log('mutations --SET MUTATE_LOG_DATE ===> ' + list[0])
    console.log('INSIDE types.MUTATE_LOG_DATE =====>' + list[1])
    var fromDate = moment(list[0]).format('MM-DD-YYYY').replace(/-/g, '/')
    var toDate = moment(list[1]).format('MM-DD-YYYY').replace(/-/g, '/')
    var range = [new Date(fromDate), new Date(toDate)]
    state.filterStartDate = fromDate
    state.filterEndDate = toDate
    state.daterange = range
  },
  [types.MUTATE_DEFAULT_FEEDBACK_VALUE]: (state) => {
    console.log('mutations --SET DEFAULT VALUE FOR FEEDBACK OPTION ===> ')
    state.def_feedbackoption = process.env.DEFAULT_FEEDBACKOPTION
  },
  [types.MUTATE_DEFAULT_METHODTYPE_VALUE]: (state) => {
    console.log('mutations --SET DEFAULT VALUE FOR CALL METHOD OPTION ===> ')
    var obj = {}
    obj.id = process.env.DEFAULT_METHOD_ID
    obj.description = process.env.DEFAULT_METHOD_NAME
    state.def_methodtypeoption = obj
  },
  [types.MUTATE_PAIDSTATUS]: (state, payload) => {
    console.log('mutations --SET PAID STATUS ===> ')
    var loglist = state.contactlogsList
    loglist = _.reject(loglist, { id: payload.id })
    loglist.push(payload)
    loglist = _.sortBy(loglist, function (o) {
      return o.Checkin
    }).reverse()
    state.contactlogsList = loglist
    loglist = _.groupBy(loglist, function (item) {
      return item.Checkin.substring(0, 7)
    })
    console.log('PAIDSTATUS' + JSON.stringify(loglist))
    state.contactlogs = loglist
  },
  [types.SET_FREEBREAKFAST]: (state, payload) => {
    console.log('mutations --SET FREE BREAKFAST ===> ')
    var loglist = state.contactlogsList
    loglist = _.reject(loglist, { id: payload.id })
    loglist.push(payload)
    loglist = _.sortBy(loglist, function (o) {
      return o.Checkin
    }).reverse()
    state.contactlogsList = loglist
    loglist = _.groupBy(loglist, function (item) {
      return item.Checkin.substring(0, 7)
    })
    console.log('FREEBREAKFAST' + JSON.stringify(loglist))
    state.contactlogs = loglist
  },
  [types.SET_FREECAB]: (state, payload) => {
    console.log('mutations --SET FREE CAB ===> ')
    var loglist = state.contactlogsList
    loglist = _.reject(loglist, { id: payload.id })
    loglist.push(payload)
    loglist = _.sortBy(loglist, function (o) {
      return o.Checkin
    }).reverse()
    state.contactlogsList = loglist
    loglist = _.groupBy(loglist, function (item) {
      return item.Checkin.substring(0, 7)
    })
    console.log('FREECAB' + JSON.stringify(loglist))
    state.contactlogs = loglist
  },
  [types.MUTATE_DEFAULT_MEMBER_VALUE]: (state, payload) => {
    var members = state.members
    console.log('SET_DEFAULT_MEMBER_VALUE:11111' + state.memberId.list)
    console.log('SET_DEFAULT_MEMBER_VALUE:' + JSON.stringify(members))
    var r = _.find(members, function (o) {
      console.log('SET_DEFAULT_MEMBER_VALUE:' + JSON.stringify(o))
      console.log('SET_DEFAULT_MEMBER_VALUE:' + typeof o.memNo + typeof state.memberId.list)
      if (o.memNo.toString() === state.memberId.list) {
        return o
      }
    })
    console.log('mutations --SET DEFAULT MEMBER OPTION ===> ' + JSON.stringify(r))
    state.def_memberoption = r
  },
  [types.MUTATE_ADDLOGENTRY]: (state, contactlog) => {
    var feedbackoptions = state.feedbackoptions
    var r = _.find(feedbackoptions, {id: contactlog.satisfaction})
    if (typeof (r) === 'undefined' || r.length === 0) {
      r = {'id': 3, 'description': 'Normal'}
    }
    contactlog.satisfaction = r
    state.contactlogsList.push(contactlog)
    var clogs = state.contactlogsList
    clogs = _.sortBy(clogs, function (o) {
      return o.startDate
    }).reverse()
    state.contactlogs = _.groupBy(clogs, function (item) {
      return item.startDate.substring(0, 7)
    })
  }
}
