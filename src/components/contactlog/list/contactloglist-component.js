// import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import blockheading from '@/components/contactlog/list/logheading/logheading'
import logentry from '@/components/contactlog/list/logitem/logentry'
// import wordwrap from 'wordwrap'
// const config = require('../../../config')
// window.config = config
export default {
  name: 'ContactLogEntryList',
  components: {
    blockheading,
    logentry
  },
  computed: {
    ...mapGetters({
      contactLogs: 'app/LOGLIST',
      loglistloading: 'app/APPLOADER',
      pickedDaterange: 'app/FILTERDATERANGE',
      memberid: 'app/MEMBERID'
    }),
    ...mapActions({
      // contactLogs: 'app/LOGLIST'
    }),
    loglistlengthloading () {
      var cLogs = this.contactLogs
      return Object.keys(cLogs).length
         // return this.$store.getters.contactlogsCount
    }
  },
  mounted: function () {
  }
}
