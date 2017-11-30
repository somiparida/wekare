<template>
<span style="width:100%; word-wrap:break-word; display:inline-block;">{{ this.description }}</span>
</template>
<script>
export default {
  data () {
    return {
      description: ''
    }
  },
  name: 'description',
  props: ['text'],
  methods: {
    wraptext (text) {
      if (text.length < 30000) {
        var wrap = require('wordwrap')(20, 60)
        var description = wrap(text)
      }
      return description
    }
  },
  created: function () {
    this.description = this.wraptext(this.text)
  }
}
</script>

<style lang="css">
</style>