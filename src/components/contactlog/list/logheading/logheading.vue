<template>
<span>{{ heading }}</span>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      heading: ''
    }
  },
  name: 'blockheading',
  props: ['headertext'],
  methods: {
    convertHeader (headertext) {
      var res = headertext.split('-')
      var year = res[0]
      var monthNum = res[1]
      var monthName = moment.months(monthNum - 1)
      return monthName + '  ' + year
    }
  },
  created: function () {
    this.heading = this.convertHeader(this.headertext)
  }
}
</script>

<style lang="css">
</style>