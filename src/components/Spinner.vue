<template>
<div class="spinner-container">
  <div class="spinner-content">
    <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
    <br>
    <div class="spinner-message">{{ message }}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'spinner',
  /**
   * Props the parent can use to manipulate this component.
   * Note: Components themselves should not mutate their own props.
   */
  props: {
    /**
     * The message displayed with the spinner
     */
    'message': {
      type: String,
      default: 'Loading...'
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>