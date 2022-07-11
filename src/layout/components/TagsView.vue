<template>
  <div id="tab">
    <!-- 导航标签 -->
    <div class="tag-list">
      <div v-for="(e, i) in renderTab" :key="i" class="tag-item" :class="$route.path == e.path ? 'active' : 'border'"
        :title="e.label" @click.prevent="handleTabClick(e, i)" @mouseenter="handleTabEnter(e, i)"
        @mouseleave="handleTabLeave(e, i)">
        <!-- 标签名称 -->
        <span class="title">{{ e.label }}</span>
        <!-- 关闭按钮 -->
        <div class="button-close">
          <i v-show="current === i || $route.path == e.path" class="mmxlicon mi-close"
            @click.stop="handleTabDelete(e)"></i>
        </div>
      </div>
    </div>
    <!-- 右侧菜单 -->
    <div v-show="renderTab.length > 5" class="drop-menu">
      <a-dropdown class="extend-con" :trigger="['click']" :get-popup-container="triggerNode => triggerNode.parentNode"
        @visibleChange="handleDropdownChange">
        <!-- 打开按钮 -->
        <div class="caret-down" :class="dropdownVisible ? 'bg-white' : ''">
          <a-icon type="caret-down" class="btn"></a-icon>
        </div>
        <a-menu slot="overlay" class="extend-list">
          <a-menu-item v-for="(e, i) in renderTab" :key="i" class="extend-item" @mouseenter="handleTabEnter(e, i)"
            @mouseleave="handleTabLeave(e, i)" @click="handleTabSwitch(e, i)">
            <div class="title">
              {{ e.label }}
            </div>
            <!-- 关闭单一页面按钮 -->
            <i v-show="current === i" class="mmxlicon mi-close" @click.stop="handleTabDelete(e)"></i>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed, onMounted, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useTagViewStore } from '@/store/index'
import router from '@/router/index'
export default defineComponent({
  name: 'TagsView',
  setup() {
    let current = ref(-1)
    let extendCurrent = ref(-1)
    let dropdownVisible = ref(false)
    const tagViewStore = useTagViewStore()

    const tabMax = computed(() => {
      return tagViewStore.tabMax
    })
    const renderTab = computed(() => {
      return tagViewStore.renderTab
    })

    watch(tabMax, () => {
      tagViewStore.setTabMax()
    }, {
      immediate: false
    })
    watch(router.currentRoute, (currentVal) => {
      console.log(currentVal)
      if (currentVal.meta?.isTagView) {
        tagViewStore.setTabs({ label: currentVal.meta.title, path: currentVal.path })
      }
    }, {
      immediate: true
    })

    const resize = () => {
      tagViewStore.setTabMax(100)
    }
    useEventListener(window, 'resize', () => {
      resize()
    })

    onMounted(() => {
      nextTick(() => {
        resize()
      })
    })

    /**tab悬浮显示删除符号 */
    const handleTabEnter = (item, idx) => {
      current.value = idx
    }
    /**tab悬浮隐藏删除符号 */
    const handleTabLeave = () => {
      current.value = -1
    }
    /**选中tab页签 */
    const handleTabClick = (item) => {
      router.push({
        path: item.path
      })
    }
    /**选择富余的tab列表 */
    const handleTabSwitch = (item) => {
      dropdownVisible.value = !dropdownVisible.value
      router.push(item.path)
      tagViewStore.setTabs(item)
    }
    /**删除tab页签 */
    const handleTabDelete = (item) => {
      tagViewStore.deleteTabs(item)
      // 如果删除当前路径，则需要跳转
      if (item.path === router.currentRoute.path && renderTab.length) {
        for (let i = renderTab.length - 1; i >= 0; i--) {
          if (renderTab[i].path !== item.path) {
            handleTabSwitch(this.renderTab[i])
            break
          }
        }
      }
    }
    const handleDropdownChange = (visible) => {
      dropdownVisible.value = visible
    }

    return {
      current,
      extendCurrent,
      dropdownVisible,
      renderTab,
      handleTabEnter,
      handleTabLeave,
      handleTabClick,
      handleTabSwitch,
      handleTabDelete,
      handleDropdownChange
    }
  }
}) 
</script>

<style lang="less" scoped>
#tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  height: 40px;
  padding-left: 10px;

  .tag-list {
    display: flex;
    flex: 1;
    height: 100%;
    overflow: hidden;

    .tag-item {
      // flex-shrink: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      min-width: 90px;
      max-width: 140px;
      padding: 0 6px 0 16px;
      box-sizing: border-box;
      width: 100%;
      transition: all 0.5s;
      position: relative;

      span {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        font-size: 13px;
      }

      .anticon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: #fff;
      }

      .active {
        color: @primary-color;
      }

      .button-close {
        min-width: 18px;
        text-align: right;
        padding: 0;

        .mmxlicon {
          color: #999999;
          font-size: 7px;
          text-align: right;

          &:hover {
            &::before {
              content: '\e633';
            }
          }
        }
      }
    }

    .border {
      min-width: 90px;
      max-width: 140px;

      &::before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 100%;
        background-color: #ebebeb;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .border:hover {
      background: #d9d9d9;
    }

    .active {
      background: #fff;
      min-width: 120px;

      span {
        color: @primary-color;
        // margin-left: 16px;
      }

      &::before {
        content: '';
        display: inline-block;
        width: 5px;
        height: 100%;
        background: #ffffff;
        position: absolute;
        left: -2px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .drop-menu {
    .caret-down {
      width: 24px;
      padding-left: 7px;
      height: 40px;
      display: flex;
      align-items: center;

      .btn {
        cursor: pointer;
        width: 10px;
        height: 7px;
        font-size: 10px;
      }

      &:hover {
        background: #fff;
      }
    }

    .bg-white {
      background: #fff;
    }

    .extend-con {
      cursor: pointer;
    }

    .mmxlicon {
      font-size: 12px;
      color: #999999;
    }
  }
}

.extend-list {
  display: flex;
  background: #fff;
  flex-direction: column;
  width: 120px;
  transform: translateX(-10px);

  .extend-item {
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      width: 80px;
      max-width: 85px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
    }
  }

  .extend-item:hover {
    background: #f4f4f4;
  }
}
</style>
