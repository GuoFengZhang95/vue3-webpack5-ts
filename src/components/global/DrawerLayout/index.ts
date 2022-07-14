import DrawerLayout from './src/DrawerLayout'

import type { App, Plugin } from 'vue'

const _DrawerLayout = DrawerLayout as typeof DrawerLayout & Plugin

_DrawerLayout.install = (app: App) => {
  _DrawerLayout._context = app._context
  app.config.globalProperties.$globalDrawer = _DrawerLayout
}

export default _DrawerLayout
