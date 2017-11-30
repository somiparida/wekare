import * as types from './types'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'
// import api from '../fetch/api'
Vue.use(VueAxios, axios)
// const config = require('../../config')
var _ = require('lodash')

export default {
  [types.SET_MEMBERID]: function ({ commit }, payload) {
    commit(types.MUTATE_MEMBER_ID, {list: payload})
  },
  [types.SET_MEMBER_LIST]: function ({ commit }, payload) {
    var r = []
    axios.get(process.env.MEMBERSLIST_WS_URL + payload).then((response) => {
      r = _.map(response.data, function (v) {
        return {
          pid: v.pid,
          memNo: v.memNo,
          name: v.name
        }
      })
      if (response.data.length > 0) {
        commit(types.MUTATE_MEMBER_LIST, {list: r})
      } else {
        window.location.replace('/errorPage')
      }
    }, (err) => {
      window.location.replace('/errorPage')
      alert('NOT A MEMBER' + err)
    })
  },
  [types.SET_METHOD_LIST]: function ({ commit }) {
    axios.get(process.env.CONTACTMETHOD_WS_URL).then((response) => {
      var r = _.map(response.data, function (v) {
        // alert(JSON.stringify(v))
        return {
          id: v.id,
          description: v.description
        }
      })
      commit(types.MUTATE_METHOD_LIST, {list: r})
    }, (err) => {
      console.log(err)
    })
  },
  [types.SET_CATEGORY_LIST]: function ({ commit }) {
    // setTimeout(api.getCategories(), 5000)
    // var r = []
    axios.get(process.env.CONTAGORY_WS_URL).then((response) => {
      var result = []
      _(response.data).forEach(function (opt) {
        _(opt.subCategories).forEach(function (soption) {
          var str = opt.description + ' > ' + soption.description
          result.push(str)
        })
      })
      commit(types.MUTATE_CATEGORY_LIST, {list: result})
    }, (err) => {
      console.log(err)
    })
  },
  [types.SET_FEEDBACK_LIST]: function ({ commit }) {
    axios.get(process.env.FEEDBACK_WS_URL).then((response) => {
      var r = _.map(response.data, function (v) {
        return {
          id: v.id,
          description: v.description
        }
      })
      commit(types.MUTATE_FEEDBACKTYPE_LIST, {list: r})
    }, (err) => {
      console.log(err)
    })
  },
  [types.SET_APPLOADER]: function ({ commit }, payload) {
    commit(types.MUTATE_APPLOADER, payload)
  },
  [types.SET_CONTACTLOG_LIST]: function ({ commit }, payload) {
    commit(types.MUTATE_APPLOADER, true)
    var contactlogs = []
    var loglist = []
    setTimeout(function () {
      Vue.axios
      .get(process.env.CONTACTLOG_WS_URL)
      .then(response => {
        contactlogs = response.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
    }, 1000)
    setTimeout(function () {
      contactlogs.forEach(function (item) {
        // console.log('ROW DATA:' + JSON.stringify(row))
        loglist.push(item)
      })
      loglist = _.sortBy(loglist, function (dateObj) {
        return new Date(dateObj.Checkin)
      })
      var len = loglist.length
      len = len - 1
      var datesarr = []
      datesarr.push(loglist[0].Checkin)
      datesarr.push(loglist[2].Checkin)
      console.log('LOGLISTLOGLIST' + len)
      commit(types.MUTATE_GROUPCONTACTLOG_LIST, { list: loglist })
      commit(types.MUTATE_MEMBERLOGLIST, { list: loglist })
      setTimeout(function () {
        commit(types.MUTATE_LOG_DATE, datesarr)
        commit(types.MUTATE_APPLOADER, false)
      }, 1000)
    }, 2000)
  },
  [types.SET_FILTERED_CONTACTLOG_LIST]: function ({ commit }, payload) {
    commit(types.MUTATE_APPLOADER, true)
    commit(types.MUTATE_GROUPCONTACTLOG_LIST, { list: payload })
    setTimeout(function () {
      commit(types.MUTATE_APPLOADER, false)
    }, 1000)
  },
  [types.SET_DEFAULT_FEEDBACK_VALUE]: function ({ commit }) {
    commit(types.MUTATE_DEFAULT_FEEDBACK_VALUE)
  },
  [types.SET_CSA]: function ({ commit }, payload) {
    commit(types.MUTATE_CSA, payload)
  },
  [types.SET_DEFAULT_METHODTYPE_VALUE]: function ({ commit }) {
    commit(types.MUTATE_DEFAULT_METHODTYPE_VALUE)
  },
  [types.SET_DEFAULT_MEMBER_VALUE]: function ({ commit }, payload) {
    console.log('SET_DEFAULT_MEMBER_VALUE:' + payload)
    setTimeout(function () {
      commit(types.MUTATE_DEFAULT_MEMBER_VALUE, payload)
    }, 1000)
  },
  [types.SET_ADDLOGENTRY]: function (context, contactlog) {
    context.commit(types.MUTATE_APPLOADER, true)
    this.startdate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    axios.post(process.env.BASE_URL + 'contactLogs', {
      callerId: contactlog.callerId,
      entityType: 'M',
      callerName: contactlog.member.name,
      details: contactlog.details,
      satisfaction: contactlog.satisfactionoption,
      description: contactlog.description,
      notes: contactlog.notes,
      csa: contactlog.csa,
      startTime: this.startdate,
      endTime: this.startdate
    })
    .then(response => {
      var contactlog = response.data
      var row = {
        id: contactlog.id,
        callerId: contactlog.callerId,
        callerName: contactlog.callerName,
        entityType: contactlog.entityType,
        description: contactlog.description,
        notes: contactlog.notes,
        details: contactlog.details,
        csa: contactlog.csa,
        satisfaction: contactlog.satisfaction,
        startTime: moment(contactlog.startTime).format('YYYY-MM-DD hh:mm:ss'),
        startDate: moment(contactlog.startTime).format('YYYY-MM-DD'),
        logItemDate: moment(contactlog.startTime).format('DD/MM/YYYY hh:mm')
      }
      setTimeout(function () {
        context.commit(types.MUTATE_ADDLOGENTRY, row)
        context.commit(types.MUTATE_APPLOADER, false)
      }, 1000)
    })
    .catch(e => {
      console.log('Errors' + e)
      console.log(e)
    })
  },
  [types.SET_PAIDSTATUS]: function (context, entry) {
    context.commit(types.MUTATE_APPLOADER, true)
    if (entry.paid === true) {
      entry.freebreakfast = true
      entry.freecab = true
      entry.advpaid = entry.Price
    } else {
      entry.freebreakfast = false
      entry.freecab = false
      entry.advpaid = '0'
    }
    axios.post(process.env.BASE_URL + 'api/v1/bookings/paid/' + entry.id, {
      'id': entry.id,
    /*  'BookNumber': entry.BookNumber,
      'BookedBy': entry.BookedBy,
      'GuestName': entry.GuestName,
      'Phone': entry.Phone,
      'Checkin': entry.Checkin,
      'Checkout': entry.Checkout,
      'BookedOn': entry.BookedOn,
      'Status': entry.Status,
      'Rooms': entry.Rooms,
      'People': entry.People,
      'Price': entry.Price,
      'advpaid': entry.advpaid,
      'source': entry.source, */
      'advpaid': entry.advpaid,
      'paid': entry.paid,
      'freecab': entry.freecab,
      'freebreakfast': entry.freebreakfast
    /*  'freecab': entry.freecab,
      'freebreakfast': entry.freebreakfast,
      'Commission': entry.Commission,
      'CommissionAmount': entry.CommissionAmount,
      'PaymentStatus': entry.PaymentStatus,
      'PaymentMethod': entry.PaymentMethod,
      'Remarks': entry.Remarks,
      'migrate': 1 */
    })
    .then(response => {
      setTimeout(function () {
        context.commit(types.MUTATE_PAIDSTATUS, entry)
        context.commit(types.MUTATE_APPLOADER, false)
      }, 1000)
    })
    .catch(e => {
      console.log('Errors' + e)
      console.log(e)
    })
  },
  [types.SET_FREEBREAKFAST]: function (context, entry) {
    context.commit(types.MUTATE_APPLOADER, true)
    axios.post(process.env.BASE_URL + 'api/v1/bookings/freebreakfast/' + entry.id, {
      'id': entry.id,
      'freebreakfast': entry.freebreakfast === true ? 1 : 0
    })
    .then(response => {
      setTimeout(function () {
        context.commit(types.MUTATE_FREEBREAKFAST, entry)
        context.commit(types.MUTATE_APPLOADER, false)
      }, 1000)
    })
    .catch(e => {
      console.log('Errors' + e)
      console.log(e)
    })
  },
  [types.SET_FREECAB]: function (context, entry) {
    context.commit(types.MUTATE_APPLOADER, true)
    axios.post(process.env.BASE_URL + 'api/v1/bookings/freecab/' + entry.id, {
      'id': entry.id,
      'freecab': entry.freecab === true ? 1 : 0
    })
    .then(response => {
      setTimeout(function () {
        context.commit(types.MUTATE_FREECAB, entry)
        context.commit(types.MUTATE_APPLOADER, false)
      }, 1000)
    })
    .catch(e => {
      console.log('Errors' + e)
      console.log(e)
    })
  },
  [types.SET_ADVPAYMENT]: function (context, entry) {
    context.commit(types.MUTATE_APPLOADER, true)
    axios.post(process.env.BASE_URL + 'api/v1/bookings/advpaid/' + entry.id, {
      'id': entry.id,
      'advpaid': entry.advpaid
    })
    .then(response => {
      setTimeout(function () {
        context.commit(types.MUTATE_APPLOADER, false)
      }, 1000)
    })
    .catch(e => {
      console.log('Errors' + e)
      console.log(e)
    })
  },
  [types.SET_PHONE]: function (context, entry) {
    context.commit(types.MUTATE_APPLOADER, true)
    axios.post(process.env.BASE_URL + 'api/v1/bookings/phone/' + entry.id, {
      'id': entry.id,
      'Phone': entry.Phone
    })
    .then(response => {
      setTimeout(function () {
        context.commit(types.MUTATE_APPLOADER, false)
      }, 1000)
    })
    .catch(e => {
      console.log('Errors' + e)
      console.log(e)
    })
  }
}
