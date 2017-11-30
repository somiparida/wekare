<template>
<span style="width:100%; word-wrap:break-word; display:inline-block;">{{ notes }}</span>
</template>
<script>
export default {
  data () {
    return {
      notes: ''
    }
  },
  name: 'notes',
  props: ['text'],
  methods: {
    setText (text) {
      var notes = text
      var wrap = require('wordwrap')(20, 600)
      notes = wrap(notes)
      return notes
    }
  },
  created: function () {
    this.notes = this.setText(this.text)
  }
}
</script>

<style lang="css">
</style>