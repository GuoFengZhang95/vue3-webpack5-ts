import { createApp } from 'vue'

import App from './App.vue'
import router from './router/index'
import store from './store/index'

//权限文件
import './permission'

// ant-design-vue
import antd from './components/antd'
import '@/assets/style/common.less'
// 项目全局组件
import MuUI from './components/index'

const app = createApp(App)
app.use(antd)
app.use(router)
app.use(store)
app.use(MuUI)
app.mount('#app')


