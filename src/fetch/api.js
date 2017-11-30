import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
var _ = require('lodash')
const config = require('../../config')

Vue.use(VueAxios, axios)
window.config = config

/*
Axios.defaults.baseURL = process.env.baseURL
Axios.defaults.headers.common.Accept = 'application/vnd.github.v3+json'

Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return Axios
  }
})
*/
export default {
  getCategories () {
    var r = []
    axios.get(process.env.BASE_URL + 'Categories').then((response) => {
      var result = []
      _(response.data).forEach(function (opt) {
        _(opt.subCategories).forEach(function (soption) {
          var str = opt.description + ' > ' + soption.description
          result.push(str)
        })
      })
      console.log('api/fetch ---- Categories' + r)
      return result
    }, (err) => {
      console.log(err)
    })
    return r
  },
  getMembers (payload) {
    var r = []
    axios.get(process.env.BASE_URL + 'callers?pid=' + payload).then((response) => {
      r = _.map(response.data, function (v) {
        return {
          id: v.id,
          description: v.description,
          subCategories: v.subCategories
        }
      })
      console.log('api/fetch ---- Members' + r)
      return r
    }, (err) => {
      console.log(err)
    })
    return r
  }
}
