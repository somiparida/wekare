'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  BASE_URL: '"http://localhost:8000/"',
  
  //filter
  MEMBERSLIST_WS_URL: '"http://localhost:3000/callers?pid="',
  FEEDBACK_WS_URL: '"http://localhost:3000/satisfactionLevels"',
  CONTACTMETHOD_WS_URL: '"http://localhost:3000/contactMethods"',
  CONTACTLOG_WS_URL: '"http://localhost:8000/api/v1/bookings"',
  CONTAGORY_WS_URL: '"http://localhost:3000/Categories"',

  //DEFAULT VALUES
  DEFAULT_METHOD_NAME: '"Call Inbound"',
  DEFAULT_METHOD_ID: '"CIN"',
  DEFAULT_FEEDBACKOPTION: '"7"'
})
