<template>
  <div class="container">
      <div class="row">
        <ContactLogFilter></ContactLogFilter>
      </div> 
      <div class="row" >
        <ContactLogEntryList></ContactLogEntryList>
      </div> 
      <div class="row">
        <ContactLogEntry></ContactLogEntry>
      </div>       
  </div>
</template>
<script>
  import ContactLogFilter from './filter/contactlogfilter-component.vue'
  import ContactLogEntryList from './list/contactloglist-component.vue'
  import ContactLogEntry from './entry/contactlogentry-component.vue'
  export default {
    name: 'LogMain',
    components:
    {
      'ContactLogFilter': ContactLogFilter,
      'ContactLogEntryList': ContactLogEntryList,
      'ContactLogEntry': ContactLogEntry
    },
    methods: {
    }
  }
</script>
<style>
</style>
