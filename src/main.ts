import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'
import store from './store/index'

import antd from './components/antd'
import '@/assets/style/common.less'

const app = createApp(App)
app.config.globalProperties.myName = 'zevan'
app.use(antd)
app.use(router)
app.use(store)
app.mount('#app')


