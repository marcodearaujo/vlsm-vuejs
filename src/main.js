// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Network from './lib/Network.js'
import Subnet from './lib/Subnet.js'
import Store from './lib/Store.js'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$Network', { value: Network })
Object.defineProperty(Vue.prototype, '$Subnet', { value: Subnet })

Object.defineProperty(Vue.prototype, '$Store', { value: Store })
Object.defineProperty(Vue.prototype, '$sharedState', { value: Store.state })

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
