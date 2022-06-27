import store from '@/store'

export default {
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    $_resizeHandler() {
      let contentOffsetWidth = document.getElementById('app-main').offsetWidth
      store.dispatch('app/setTableWidth', contentOffsetWidth)
    },
  },
}
