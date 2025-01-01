import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { useStore } from './stores/StoreState'

// Import the Subnet class from your module (ensure it's compatible with Vue 3)
import Subnet from 'vlsmcalc'

const app = createApp(App)

const store = useStore()

// Add properties to the app instance globally
app.config.globalProperties.$Subnet = Subnet
app.config.globalProperties.$useStore = store
app.config.globalProperties.$sharedState = store.state

app.use(router)

app.mount('#app')
