<script lang="ts">
import { defineComponent, h } from 'vue'
export default defineComponent({
  name: 'DrawerLayout',
  setup(props, context) {
    // console.log('DrawerLayout appContext', getCurrentInstance()?.appContext)
    console.log('props', props)
    console.log('context', context)
    return () => h('div', { id: 'drawer-layout-wrp' }, h('div', { class: 'drawer-layout' }))
  }
})

</script>

<style lang="less">
#drawer-layout-wrp {
  .drawer-layout {
    position: fixed;
    z-index: 999;
    right: -100%;
    // top: 116px;
    width: calc(100vw - 500px);
    // height: calc(100vh - 116px);
    // overflow-y: auto;
    min-width: 822px;
    background: white;
    box-shadow: -10px 0px 20px 0px rgba(0, 0, 0, 0.16);

    &.show {
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      right: 0;
    }

    .main-content {
      .section {
        .dyn-com {
          overflow-y: auto;
        }
      }
    }

    .close-btn {
      position: absolute;
      left: -25px;
      top: 0px;
      width: 24px;
      height: 56px;
      opacity: 0.7;
      background: #000000;
      border-radius: 6px 0px 0px 6px;
      box-shadow: -5px 0px 6px 0px rgba(0, 0, 0, 0.16);
      cursor: pointer;

      &::before {
        position: absolute;
        content: '';
        left: 8px;
        top: 50%;
        transform: translateY(-50%);
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent transparent #ffffff;
      }
    }

    .drawer-spin {
      top: 0px !important;
      margin: 0;
      padding: 0;
      width: 100%;
    }
  }
}
</style>
