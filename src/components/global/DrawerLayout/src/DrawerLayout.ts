// @ts-nocheck
import { h, render, watch } from 'vue'

import DrawerLayoutConstructor from './index.vue'

import type { AppContext, ComponentPublicInstance } from 'vue'
import { isVNode } from 'vue'

const messageInstance = new Map<
  ComponentPublicInstance<{ doClose: () => void }>,
  {
    options: any
    resolve: (res: any) => void
    reject: (reason?: any) => void
  }
>()

const initInstance = (
  props: any,
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

const showMessage = (options: any, appContext?: AppContext | null) => {
  const container = genContainer()
  // 卸载组件
  options.onVanish = () => {
    render(null, container)
    messageInstance.delete(vm)
  }

  const instance = initInstance(options, container, appContext)!

  const vm = instance.proxy as ComponentPublicInstance<
    {
      visible: boolean
    }
  >

  for (const prop in options) {
    // 合并传入props
    // if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
    //   vm[prop as string] = options[prop]
    // }
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

async function DrawerLayout(
  options: any,
  appContext?: AppContext | null
): Promise<{ value: string; action: any }>
function DrawerLayout(
  options: any,
  appContext: AppContext | null = null
): Promise<{ value: string; action: any }> {
  let callback: any
  callback = options.callback
  return new Promise((resolve, reject) => {
    console.log('DrawerLayout._context', DrawerLayout._context)
    const vm = showMessage(options, appContext ?? DrawerLayout._context)
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    })
  })
}

DrawerLayout.close = () => {
  messageInstance.forEach((_, vm) => {
    vm.doClose()
  })

  messageInstance.clear()
}

DrawerLayout._context = null

export default DrawerLayout
