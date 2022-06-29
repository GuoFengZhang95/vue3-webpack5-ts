import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import antd from './components/antd'

const app = createApp(App)

app.use(antd)
app.use(router)
app.use(store)
app.mount('#app')


