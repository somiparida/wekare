'use strict'
module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: '"http://localhost:3000/"',
  
    //filter
    MEMBERSLIST_WS_URL: '"http://localhost:3000/callers?pid="',
    FEEDBACK_WS_URL: '"http://localhost:3000/satisfactionLevels"',
    CONTACTMETHOD_WS_URL: '"http://localhost:3000/contactMethods"',
    CONTACTLOG_WS_URL: '"http://localhost:3000/contactLogs?callerId="',
    CONTAGORY_WS_URL: '"http://localhost:3000/Categories"',
  
    //DEFAULT VALUES
    DEFAULT_METHOD_NAME: '"Call Inbound"',
    DEFAULT_METHOD_ID: '"CIN"',
    DEFAULT_FEEDBACKOPTION: '"3"'
}
