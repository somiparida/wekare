import Vue from 'vue'
import VueRouter from 'vue-router'
import _ from 'lodash'
import moment from 'moment'
import { mapGetters } from 'vuex'
import VueDatepickerLocal from '@/util/DateRangePicker'
import * as types from './../../../store/types'
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
Vue.prototype.moment = moment
Vue.use(VueRouter)

export default {
  name: 'ContactLogFilter',
  components: { VueDatepickerLocal },
  computed: {
    ...mapGetters({
      filterContactLogs: 'app/MEMBERLOGLIST',
      memberpickedDaterange: 'app/FILTERDATERANGE',
      filterstartdate: 'app/FILTERSTARTDATE',
      filterenddate: 'app/FILTERENDDATE',
      json_data: 'app/UGLOGLIST'
    }),
    pickedDaterange: {
      get: function () {
        return this.memberpickedDaterange
      },
      set: function (newvalue) {
        this.$store.state.daterange = newvalue
        // this.onDateChange()
        this.onFilterChange()
      }
    }
  },
  data () {
    return {
      json_fields: {
        'BookNumber': 'BookNumber',
        'BookedBy': 'BookedBy',
        'GuestName': 'BookedBy',
        'Checkin': 'Checkin',
        'Checkout': 'Checkout',
        'BookedOn': 'BookedOn',
        'Status': 'Status',
        'Rooms': 'Rooms',
        'People': 'People',
        'Price': 'Price',
        'PaymentStatus': 'PaymentStatus',
        'PaymentMethod': 'PaymentMethod',
        'Remarks': 'Remarks',
        'source': 'source',
        'migrated': 'migrated'
      },
      json_meta: [
        [{
          'key': 'charset',
          'value': 'utf-8'
        }]
      ],
      isclearable: false,
      separator: 'To',
      oldvalofclaim: false,
      oldvalofcall: false,
      oldvalofemail: false,
      showDate: true,
      time: new Date(),
      emptyTime: '',
      emptyRange: [],
      local: {
        dow: 0, // Sunday is the first day of the week
        hourTip: 'Select Hour', // tip of select hour
        minuteTip: 'Select Minute', // tip of select minute
        secondTip: 'Select Second', // tip of select second
        yearSuffix: '', // suffix of head year
        monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), // months of head
        months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), // months of panel
        weeks: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_') // weeks
      },
      dataFilterByConstrains: [],
      filterobject: {searchvalue: '', bookingsource: 'none', paid: false, advpaid: false},
      dateRange: 'ciao',
      defaultAllToggle: false
    }
  },
  methods: {
    isFilterReset () {
      var count = 0
      var checkcount = 0
      for (var f in this.filterobject) {
        switch (typeof (this.filterobject[f])) {
          case 'string':
            if (this.filterobject[f] === 'none' || (this.filterobject[f] === '' && this.filterobject[f].length === 0)) {
              count++
            }
            break
          case 'boolean':
            if (!this.filterobject[f]) {
              count++
              checkcount++
            }
            break
          default:
            break
        }
      }
      // alert(count)
      return {
        all: (count === 4),
        check: (checkcount === 2)
      }
    },
    searchlogforpaidstatus (srchdatatoiterate, searchText) {
      srchdatatoiterate = this.filterContactLogs
      if (searchText === true) {
        searchText = '1'
      } else {
        searchText = '0'
      }
      var logsforcmdata = []
      for (var c in srchdatatoiterate) {
        var mname = srchdatatoiterate[c].paid
        if (mname.toString() === searchText) {
          console.log(c, 'contactLogs in callername:', srchdatatoiterate[c].id)
          logsforcmdata.push(srchdatatoiterate[c])
        }
      }
      return logsforcmdata
    },
    searchlogforadvpaidstatus (srchdatatoiterate, searchText) {
      srchdatatoiterate = this.filterContactLogs
      var logsforcmdata = []
      for (var c in srchdatatoiterate) {
        var mname = srchdatatoiterate[c].advpaid
        if (searchText === true && (mname !== '0') && srchdatatoiterate[c].paid === 0) {
          console.log(c, 'contactLogs in callername:', srchdatatoiterate[c].id)
          logsforcmdata.push(srchdatatoiterate[c])
        }
      }
      return logsforcmdata
    },
    searchbybookingsource (srchdatatoiterate, searchText) {
      var logsforcmdata = []
      srchdatatoiterate = this.filterContactLogs
      for (var c in srchdatatoiterate) {
        var mname = srchdatatoiterate[c].source
        if (mname === searchText) {
          console.log(c, 'contactLogs in callername:', srchdatatoiterate[c].id)
          logsforcmdata.push(srchdatatoiterate[c])
        }
      }
      return logsforcmdata
    },
    searchcontactlogbytext (srchdatatoiterate, searchText) {
      var logsforsrchdata = []
      for (var i in srchdatatoiterate) {
        var found = false
        var item = srchdatatoiterate[i]

        if (searchText !== '' && typeof searchText === 'string' && searchText !== 'undefined') {
          searchText = searchText.toLowerCase()
        }
        if ((item.BookNumber !== '' && typeof item.BookNumber !== 'undefined') && (_.includes(item.BookNumber.toLowerCase(), searchText))) {
          logsforsrchdata.push(item)
          found = true
          console.log('item:foundInNotes' + JSON.stringify(this.filterobject.searchvalue))
        } else {
          if ((found === false) && (item.GuestName !== '' && typeof item.GuestName !== 'undefined') && (_.includes(item.GuestName.toLowerCase(), searchText))) {
            logsforsrchdata.push(item)
            found = true
            console.log('item:foundInNotes' + JSON.stringify(this.filterobject.searchvalue))
          }
        }
        if ((found === false && item.Rooms !== '' && typeof item.Rooms !== 'undefined') && (_.includes(item.Rooms, searchText))) {
          logsforsrchdata.push(item)
          found = true
          console.log('item:foundInCSA' + JSON.stringify(this.filterobject.searchvalue))
        }
        if (found === false && (item.People !== '' && typeof item.People !== 'undefined') && _.includes(item.People.toLowerCase(), searchText)) {
          logsforsrchdata.push(item)
          found = true
          console.log('item:foundInmethod' + JSON.stringify(item))
        }
        if (found === false && (item.Checkin !== '' && typeof item.Checkin !== 'undefined') && (_.includes(item.Checkin.toLowerCase(), searchText))) {
          logsforsrchdata.push(item)
          found = true
          console.log('item:foundInmethod' + JSON.stringify(item))
        }
        if (found === false && (item.Remarks !== '' && typeof item.Remarks !== 'undefined') && (_.includes(item.Remarks.toLowerCase(), searchText))) {
          logsforsrchdata.push(item)
          found = true
          console.log('item:foundInmethod' + JSON.stringify(item))
        }
      }
      return logsforsrchdata
    },
    onDateChange () {
      var fromtodatatoiterate = this.filterContactLogs
      var logsbetweendate = []
      var filterenddate = new Date(this.memberpickedDaterange[1])
      filterenddate = filterenddate.setDate(filterenddate.getDate() + 1)
      var filterstartdate = new Date(this.memberpickedDaterange[0])
      for (var c in fromtodatatoiterate) {
        var contactlogtime = new Date(fromtodatatoiterate[c].Checkin).getTime()
        var datepickerstarttime = filterstartdate.getTime()
        var datepickerendtime = filterenddate
        if (contactlogtime > datepickerstarttime) {
          if (contactlogtime < datepickerendtime) {
            logsbetweendate.push(fromtodatatoiterate[c])
          }
        }
      }
      // console.log('this.$store.state.daterange:', logsbetweendate)
      this.dataFilterByConstrains = logsbetweendate
      this.$store.dispatch(types.SET_FILTERED_CONTACTLOG_LIST, logsbetweendate)
    },
    onFilterChange () {
      var resetobject = this.isFilterReset()
      var allfilterreset = resetobject.all
      var checkfilterreset = resetobject.check
      var filterContactLogs = []
      var matched = []
      var methodid = ''
      if (allfilterreset && checkfilterreset) {
        filterContactLogs = []
        filterContactLogs = this.filterContactLogs
        // this.$store.dispatch(types.SET_FILTERED_CONTACTLOG_LIST, filterContactLogs)
        this.onDateChange()
        return
      }
      if (!allfilterreset && checkfilterreset) {
        if (this.filterobject.bookingsource === 'none' && this.filterobject.searchvalue !== '') {
          matched = []
          filterContactLogs = []
          filterContactLogs = this.filterContactLogs
          var searchText = this.filterobject.searchvalue
          matched = this.searchcontactlogbytext(filterContactLogs, searchText)
       //   matched = this.searchdatainselecteddates(matched)
          this.$store.dispatch(types.SET_FILTERED_CONTACTLOG_LIST, matched)
        }
        if (this.filterobject.bookingsource !== 'none' && this.filterobject.searchvalue === '') {
          matched = []
          filterContactLogs = []
          filterContactLogs = this.filterContactLogs
          searchText = this.filterobject.bookingsource
          matched = this.searchbybookingsource(filterContactLogs, searchText)
          // matched = this.searchdatainselecteddates(matched)
          this.$store.dispatch(types.SET_FILTERED_CONTACTLOG_LIST, matched)
        }
        if (this.filterobject.bookingsource !== 'none' && this.filterobject.searchvalue !== '') {
          matched = []
          filterContactLogs = []
          filterContactLogs = this.filterContactLogs
          searchText = this.filterobject.searchvalue
          methodid = this.filterobject.method
          matched = this.searchcontactlogbytext(filterContactLogs, searchText)
          matched = this.searchbybookingsource(matched, methodid)
          // matched = this.searchdatainselecteddates(matched)
          this.$store.dispatch(types.SET_FILTERED_CONTACTLOG_LIST, matched)
        }
      }
      if (!allfilterreset && !checkfilterreset) {
        matched = []
        filterContactLogs = []
        filterContactLogs = this.filterContactLogs
        searchText = this.filterobject.searchvalue
        matched = filterContactLogs
        methodid = this.filterobject.method
        if (this.filterobject.searchvalue !== '') {
          matched = this.searchcontactlogbytext(matched, this.filterobject.searchvalue)
        }
        if (this.filterobject.method !== 'none') {
          matched = this.searchbybookingsource(matched, this.filterobject.method)
        }
        if (this.filterobject.paid) {
          matched = this.searchlogforpaidstatus(matched, this.filterobject.paid)
        }
        if (this.filterobject.advpaid) {
          matched = this.searchlogforadvpaidstatus(matched, this.filterobject.advpaid)
        }
        // matched = this.searchdatainselecteddates(matched)
        this.$store.dispatch(types.SET_FILTERED_CONTACTLOG_LIST, matched)
      }
      /*  matched = []
        filterContactLogs = []
        filterContactLogs = this.filterContactLogs
        searchText = this.filterobject.searchvalue
        matched = filterContactLogs
        var callarray = []
        var claimarray = []
        var emailarray = []
        var appealarray = []
        var result = []
        methodid = this.filterobject.method
        if (this.filterobject.searchvalue !== '') {
          matched = this.searchcontactlogbytext(matched, this.filterobject.searchvalue)
        }
        if (this.filterobject.method !== 'none') {
          matched = this.searchbymethodid(matched, this.filterobject.method)
        }
        if (this.filterobject.appeal) {
          appealarray = this.searchlogsbyappeal(matched)
        }
        if (this.filterobject.claim) {
          claimarray = this.searchlogsbymethoddescription(matched, 'claim')
        }
        if (this.filterobject.email) {
          emailarray = this.searchlogsbymethoddescription(matched, 'e-mail')
        }
        if (this.filterobject.call) {
          callarray = this.searchlogsbymethoddescription(matched, 'call')
        }
        if (this.filterobject.searchvalue === '' && this.filterobject.method === 'none') {
          result = emailarray.concat(appealarray).concat(callarray).concat(claimarray)
        } else {
          result = emailarray.concat(appealarray).concat(callarray).concat(claimarray).concat(matched)
        }
        result = _.uniqBy(result, function (e) {
          return e.id
        })
        console.log('RESULT:' + JSON.stringify(result))
        this.$store.dispatch(types.SET_FILTERED_CONTACTLOG_LIST, result)
      } */
    },
    searchdatainselecteddates (datatoierate) {
      var filterenddate = new Date(this.memberpickedDaterange[1])
      var filterstartdate = new Date(this.memberpickedDaterange[0])
      filterenddate = filterenddate.setDate(filterenddate.getDate() + 1)
      var fromtodatatoiterate = datatoierate
      var logsbetweendate = []
      for (var c in fromtodatatoiterate) {
        var contactlogtime = new Date(fromtodatatoiterate[c].startTime).getTime()
        var datepickerstarttime = filterstartdate.getTime()
        var datepickerendtime = filterenddate
        if (contactlogtime > datepickerstarttime) {
          if (contactlogtime < datepickerendtime) {
            logsbetweendate.push(fromtodatatoiterate[c])
          }
        }
      }
      return logsbetweendate
    },
    toggle () {
      this.defaultAllToggle = !this.defaultAllToggle
      this.$forceUpdate()
    },
    onDateRangeChanged: function (picker) {
      this.dateRange = picker.startDate + ' - ' + picker.endDate
    },
    disabledDate (time) {
      var max = new Date(this.filterenddate)
      var min = new Date(this.filterstartdate)
      if ((time < min) || (time > max)) {
        return true
      } else {
        return false
      }
    },
    searchall: _.debounce(function (event) {
      this.onFilterChange()
    }, 500),
    setBookingSource: _.debounce(function (event) {
      this.onFilterChange()
    }, 500)
  }
}
