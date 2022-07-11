<template>
  <div id="nav-bar" :class="!collapsed ? 'wide' : 'thin'">
    <a-button class="nav-bar-auto" @click="toggleSideBar(!collapsed)">
      <span class="mmxlicon" :class="!collapsed ? 'mi-menu' : 'mi-right'"></span>
      <span v-if="!collapsed">收起菜单</span>
    </a-button>
    <div class="nav-warpper">
      <template v-if="!collapsed">
        <menu-item v-for="(e, i) in asideList" :key="i" :menu-item="e" :depth="0"></menu-item>
      </template>
      <template v-else>
        <menu-item-thin v-for="(e, i) in asideList" :key="i" :menu-item="e" :depth="0"></menu-item-thin>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoutesStore } from '@/store/index'
import MenuItem from './MenuItem.vue'
import MenuItemThin from './MenuItemThin.vue'
export default defineComponent({
  name: 'AsideBar',
  components: {
    MenuItem,
    MenuItemThin
  },
  setup() {
    /**是否折叠 */
    let collapsed = ref(false)
    const routeStore = useRoutesStore()
    const asideList = computed(() => {
      return routeStore.asideList
    })
    const toggleSideBar = (flag: boolean) => {
      collapsed.value = flag
    }
    return {
      collapsed,
      asideList,
      toggleSideBar
    }
  },
})
</script>

<style lang="less" scoped>
#nav-bar {
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
  transition: all .3s;

  &.wide {
    width: 180px;
  }

  &.thin {
    width: 52px;
    overflow: hidden;
  }

  .mmxlicon {
    font-size: 18px;
    width: 18px;
  }

  span {
    font-size: 14px;
    font-weight: 400;
  }

  .nav-bar-auto {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    padding: 0 16px;
    height: 40px;
    display: flex;
    color: #666666;
    align-items: center;
    text-align: center;
    background: #f0f2f5;
    border: 0;
    border-radius: 0;

    .mi-menu {
      margin-right: 15px;
    }

    .anticon {
      cursor: pointer;
    }
  }

  .nav-warpper {
    height: calc(100vh - 60px - 40px);
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      /*	!*滚动条整体样式*!*/
      width: 0px;
      /*	!*高宽分别对应横竖滚动条的尺寸*!*/
      height: 0px;
    }
  }

  .active {
    color: #00c7db;
  }
}
</style>
