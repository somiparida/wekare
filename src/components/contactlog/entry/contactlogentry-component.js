import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Multiselect from 'vue-multiselect'
import * as types from '../../../store/types'
Vue.use(VueAxios, axios)
Vue.component('multiselect', Multiselect)
export default {
  name: 'ContactLogEntry',
  data () {
    return {
      userdata: {
        n_BookNumber: '',
        n_BookedBy: '',
        n_GuestName: '',
        n_Checkin: '',
        n_Checkout: '',
        n_Rooms: '',
        n_People: '',
        n_Price: 1000,
        n_Remarks: '',
        validated: this.disableButton ? 1 : 0
      },
      loading: false,
      logregisteredsuccess: false,
      nVal: [],
      expandClass: 'expanded',
      noClass: '',
      value: '',
      seen: false,
      validated: false
    }
  },
  methods: {
    createNewLog () {
      this.loading = true
      this.$store.dispatch(types.SET_ADDLOGENTRY, this.userdata)
      this.userdata = {
        validated: false
      }
      setTimeout(function () {
        this.loading = false
        this.logregisteredsuccess = true
        setTimeout(function () {
          this.logregisteredsuccess = false
          this.seen = false
        }.bind(this), 1000)
      }.bind(this), 2000)
    }
  },
  computed: {
    disableButton: function () {
      if (
        this.userdata.n_BookNumber !== '' && typeof this.userdata.n_GuestName === 'object' &&
        this.userdata.n_Checkin !== '' &&
        this.userdata.n_Checkout !== '' &&
        this.userdata.n_Remarks !== '') {
        return true
      } else {
        return false
      }
    }
  }
}
