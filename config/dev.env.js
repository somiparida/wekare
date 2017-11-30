'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_URL: '"http://localhost:8000/"',

  //filter
  MEMBERSLIST_WS_URL: '"http://localhost:3000/callers?pid="',
  FEEDBACK_WS_URL: '"http://localhost:3000/satisfactionLevels"',
  CONTACTMETHOD_WS_URL: '"http://localhost:3000/contactMethods"',
  CONTACTLOG_WS_URL: '"http://localhost:8000/api/v1/bookings"',
  CONTAGORY_WS_URL: '"http://localhost:3000/Categories"',

  //DEFAULT VALUES
  DEFAULT_METHOD_NAME: '"Admin"',
  DEFAULT_METHOD_ID: '"ADM"',
  DEFAULT_FEEDBACKOPTION: '"7"'
})
