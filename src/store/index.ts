import { createPinia } from 'pinia'
const store = createPinia()
export default store
export { default as useAppStore } from './app'
// export { default as useRoutesStore } from './routes/index'