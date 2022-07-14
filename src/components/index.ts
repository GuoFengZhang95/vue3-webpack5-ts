import type { App } from 'vue'
import DrawerLayout from './global/DrawerLayout/index'

const install = function (app: App, opts = {}) {
  app.use(DrawerLayout)
}

export default {
  version: '0.0.1',
  install,
}
