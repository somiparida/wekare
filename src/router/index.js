import Vue from 'vue'
import Router from 'vue-router'
import LogMain from '@/components/contactlog/contactlogmain-component'
import MemberWrong from '@/components/pages/member-redirection-component'
import ContactLogEntry from '@/components/contactlog/entry/contactlogentry-component.vue'
// import ContactLogFilter from '@/components/contactlog/filter/contactlogfilter-component.vue'
import ContactLogEntryList from '@/components/contactlog/list/contactloglist-component.vue'
import login from '@/components/pages/login.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/MemberWrong',
      name: 'MemberWrong',
      component: MemberWrong
    },
    {
      path: '/logList/:id',
      name: 'logList',
      component: ContactLogEntryList
    },
    {
      path: '/Member/:id',
      name: 'LogMain',
      component: LogMain,
      props: (route) => ({
        staticprop: 'test',
        paramprop: route.params.id
      })
    },
    {
      path: '/logEntry/:id',
      name: 'logEntry',
      component: ContactLogEntry,
      props: (route) => ({
        staticprop: 'test',
        paramprop: route.params.id
      })
    } /* ,
    {
      path: '/logFilter/:id',
      name: 'logFilter',
      component: ContactLogFilter
    },
    {
      path: '/errorPage',
      name: 'errorPage',
      component: MemberWrong
    } */
  ]
})
