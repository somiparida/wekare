<template>
  <div id="home">
    <div class="container" style="margin-left:150px;">
      <div class="row" style="margin-top:150px;">
        <div class="col-sm-6"> 
          <font size="4" color="red">Please Enter correct Member Id.</font>
        </div>
      </div>
      <br/>
      <form v-on:submit.prevent="getFormValues">
        <div class="row">
          <div class="col-sm-2"> 
            <label for="Member"><strong>Member:</strong></label>
          </div>
          <div class="col-sm-4"> 
            <input type="text" class="form-control" name="pid" id="pid" v-model="pid" required>
          </div>
        </div>
        <br/><br/>
        <div class="row">
          <div class="col-sm-5 col-lg-6">
            <button id="search-member-btn" v-on:click="validateBeforeSubmit"  v-if="!formSubmitted" class="btn btn-primary col-xs-10">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
// const config = require('../../config')
// window.config = config

export default {
  name: 'MemberWrong',
  data () {
    return {
      formSubmitted: false,
      pid: ''
    }
  },
  created () {},
  methods: {
    validateBeforeSubmit () {
      console.log('Validation will be done here')
    },
    getFormValues (submitEvent) {
      alert(submitEvent)
      this.name = submitEvent.target.elements.pid.value
      Vue.axios
        .get(process.env.BASE_URL + 'callers', {
          params: {
            pid: this.name
          }
        })
        .then(response => {
          if (response.data.length > 0) {
            window.location.replace('/Member/' + this.name)
          } else {
            window.location.replace('/errorPage')
          }
        })
        .catch(function (error) {
          console.log(error)
          this.errorMsg = 'No user or no location!'
          this.contactLogs = []
        })
    }
  }
}
</script>

<style>

</style>