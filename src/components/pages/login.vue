<template>
  <div id="home">
    <div class="container" style="margin-left:150px;">
      <div class="row" style="margin-top:150px;">
        <div class="col-sm-6"> 
          <font size="4" color="red">Please Enter Your Login Credentials</font>
        </div>
      </div>
      <br/>
      <form v-on:submit.prevent="getFormValues">
        <div class="row">
          <div class="col-sm-2"> 
            <label for="Member"><strong>Username:</strong></label>
          </div>
          <div class="col-sm-4"> 
            <input type="text" class="form-control" name="username" id="username" v-model="username" required>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-2"> 
            <label for="Member"><strong>Password:</strong></label>
          </div>
          <div class="col-sm-4"> 
            <input type="text" class="form-control" name="password" id="password" v-model="password" required>
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
// import Vue from 'vue'
// const config = require('../../config')
// window.config = config

export default {
  name: 'MemberWrong',
  data () {
    return {
      formSubmitted: false,
      username: '',
      password: ''
    }
  },
  created () {},
  methods: {
    validateBeforeSubmit () {
      console.log('Validation will be done here')
    },
    getFormValues (submitEvent) {
      this.uname = submitEvent.target.elements.username.value
      this.pwd = submitEvent.target.elements.password.value
    /*  Vue.axios
        .get(process.env.BASE_URL + 'login', {
          params: {
            uname: this.uname,
            pwd: this.pwd
          }
        })
        .then(response => {
          if (response.data.length > 0) {
            window.location.replace('/Member/' + this.uname)
          } else {
            window.location.replace('/errorPage')
          }
        })
        .catch(function (error) {
          console.log(error)
          this.errorMsg = 'No user or no location!'
          this.contactLogs = []
        }) */
      if (this.uname === 'admin' && this.pwd === 'admin') {
        localStorage.setItem('loggedin', this.uname)
        window.location.replace('/Member/' + this.uname)
      } else {
        localStorage.removeItem('loggedin')
        window.location.replace('/errorPage')
      }
    }
  }
}
</script>

<style>

</style>