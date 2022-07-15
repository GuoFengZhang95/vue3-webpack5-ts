// @ts-nocheck
import { h, render, watch, isVNode, vModelCheckbox } from 'vue'
import { hasOwn } from '@vue/shared'
import type { AppContext, ComponentPublicInstance } from 'vue'
import DrawerLayoutConstructor from './index.vue'
// import DrawerLayoutConstructor from './indexH.vue'
type DLVM = InstanceType<typeof DrawerLayoutConstructor>

let drawerLayoutInstance: {
  vm: DLVM,
  options: any,
  resolve: (res: any) => void
  reject: (reason?: any) => void
} | null = null

const initInstance = (
  props: { component: T, props: object, configs: object },
  container: HTMLElement,
  appContext: AppContext | null = null
) => {
  const vnode = h(DrawerLayoutConstructor, props)
  vnode.appContext = appContext
  render(vnode, container)
  document.body.appendChild(container.firstElementChild)
  return vnode.component
}

const genContainer = () => {
  return document.createElement('div')
}

const showMessage = (options: { component: T, props: object, configs: object }, appContext?: AppContext | null) => {
  const container = genContainer()
  // 注册自定义事件
  // 卸载组件
  options.onVanish = () => {
    render(null, container)
  }

  const instance = initInstance(options, container, appContext)!

  const vm = instance.proxy as DLVM

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop as string] = options[prop]
    }
  }

  watch(
    () => vm.message,
    (newVal, oldVal) => {
      if (isVNode(newVal)) {
        // Override slots since message is vnode type.
        instance.slots.default = () => [newVal]
      } else if (isVNode(oldVal) && !isVNode(newVal)) {
        delete instance.slots.default
      }
    },
    {
      immediate: true,
    }
  )
  vm.visible = true
  return vm
}

// async function DrawerLayout<T>(
//   options: { component: T, props: object, configs: object },
//   appContext?: AppContext | null
// ): Promise<{ value: string; action: any } | void>
function DrawerLayout(
  options: { component: T; props: object; configs: object },
  appContext: AppContext | null = null
): Promise<{ value: string; action: any }> {
  if (drawerLayoutInstance) {
    // console.log(drawerLayoutInstance)
    drawerLayoutInstance.vm.show({}, {})
  } else {
    return new Promise((resolve, reject) => {
      console.log('appContext', appContext)

      const vm = showMessage(options, appContext ?? DrawerLayout._context)
      drawerLayoutInstance = {
        vm,
        options,
        resolve,
        reject,
      }
    })
  }
}

DrawerLayout._context = null

export default DrawerLayout
