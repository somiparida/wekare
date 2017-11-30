import * as types from './types'

export default {
  [types.MEMBERID]: state => {
    // console.log('The Application Member Id is :==>' + state.memberId)
    return state.memberId
  },
  [types.UGLOGLIST]: state => {
    // console.log('The Application Member Id is :==>' + state.memberId)
    return state.ungroupedfilteredcontactlogs
  },
  [types.MEMBERS]: state => {
    // console.log('The Application Members is :==>' + JSON.stringify(state.memberlist))
    return state.members
  },
  [types.METHODS]: state => {
    // console.log('The Application Methods is :==>' + JSON.stringify(state.methodlist))
    return state.callmethods
  },
  [types.FEEDBACKS]: state => {
    // console.log('The Application Methods is :==>' + JSON.stringify(state.feedbacktypelist))
    return state.feedbackoptions
  },
  [types.CATEGORIES]: state => {
    // console.log('The Application contactlogs is :==>' + JSON.stringify(state.contactlogs))
    return state.categories
  },
  [types.LOGLIST]: state => {
    // console.log('The Application contactlogs is :==>' + JSON.stringify(state.contactlogs))
    return state.contactlogs
  },
  [types.MEMBERLOGLIST]: state => {
    // console.log('The Application contactlogs is :==>' + JSON.stringify(state.contactlogs))
    return state.contactlogsList
  },
  [types.APPLOADER]: state => {
    return state.apploader
  },
  [types.FILTERSTARTDATE]: state => {
    // console.log('state.categories------state.categories' + JSON.stringify(state.categories))
    return state.filterStartDate
  },
  [types.FILTERENDDATE]: state => {
    // console.log('state.categories------state.categories' + JSON.stringify(state.categories))
    return state.filterEndDate
  },
  [types.FILTERDATERANGE]: state => {
    // console.log('state.categories------state.categories' + JSON.stringify(state.categories))
    return state.daterange
  },
  [types.DEFAULT_FEEDBACK_VALUE]: state => {
    // console.log('state.categories------state.categories' + JSON.stringify(state.categories))
    return state.def_feedbackoption
  },
  [types.DEFAULT_METHODTYPE_VALUE]: state => {
    // console.log('state.categories------state.categories' + JSON.stringify(state.categories))
    return state.def_methodtypeoption
  },
  [types.DEFAULT_MEMBER_VALUE]: state => {
    // console.log('state.categories------state.categories' + JSON.stringify(state.categories))
    return state.def_memberoption
  },
  [types.CSA_USER]: state => {
    // console.log('state.categories------state.categories' + JSON.stringify(state.categories))
    return state.csauser
  }
}
