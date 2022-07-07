// shims-vue.d.ts
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const VueComponent: ComponentOptions
  export default VueComponent
}


