import Vue from 'vue'
import Router from 'vue-router'
import ErrorPage from '@/components/404'

import Account from '@/components/Account'
import Roles from '@/components/Roles'
import Zone from '@/components/Zone'
import Devices from '@/components/Devices'
import Device from '@/components/Device'
import About from '@/components/About'
import Users from '@/components/Users'
import User from '@/components/User'
import DeviceType from '@/components/DeviceType'

import Login from '@/components/Login'
import ChangePassword from '@/components/ChangePassword'

Vue.use(Router)

import auth from '@/utils/auth'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/404', component: ErrorPage, name: 'ErrorPage' },
    { path: '/account', component: Account, name: 'Account', beforeEnter: requireAuth },
    { path: '/roles', component: Roles, name: 'Roles', beforeEnter: requireAuth },
    { path: '/zone', component: Zone, name: 'Zone', beforeEnter: requireAuth },
    { path: '/about', component: About, name: 'About', beforeEnter: requireAuth },
    { path: '/devices', component: Devices, name: 'Devices', beforeEnter: requireAuth },
    { path: '/newdevice', component: Device, name: 'Newdevice', beforeEnter: requireAuth },
    { path: '/device/:id', component: Device, name: 'Device', beforeEnter: requireAuth },
    { path: '/users', component: Users, name: 'Users', beforeEnter: requireAuth },
    { path: '/newuser', component: User, name: 'NewUser', beforeEnter: requireAuth },
    { path: '/user/:id', component: User, name: 'User', beforeEnter: requireAuth },
    { path: '/deviceType', component: DeviceType, name: 'DeviceType', beforeEnter: requireAuth },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/changePassword', component: ChangePassword, name: 'ChangePassword' },
    { path: '/logout',
      beforeEnter (to, from, next) {
        auth.logout()
        next('/login')
      }
    },
    { path: '/', redirect: '/Users' },
    { path: '*', redirect: '/404' }
  ],
  meta: {
    progress: {
      func: [
        {call: 'color', modifier: 'temp', argument: '#ffb000'},
        {call: 'fail', modifier: 'temp', argument: '#6e0000'},
        {call: 'location', modifier: 'temp', argument: 'top'},
        {call: 'transition', modifier: 'temp', argument: {speed: '1.5s', opacity: '0.6s', termination: 400}}
      ]
    }
  }
})
