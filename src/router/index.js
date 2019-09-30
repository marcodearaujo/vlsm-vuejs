import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Subnets from '@/components/Subnets'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/subnets',
      name: 'Subnets',
      component: Subnets,
      props: true
    }
  ]
})
