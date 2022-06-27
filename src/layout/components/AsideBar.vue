<template>
  <div id="nav-bar" :class="type ? 'wide' : 'thin'">
    <a-button class="nav-bar-auto" @click="changeSideBar(!type)">
      <span class="mmxlicon" :class="type ? 'mi-menu' : 'mi-right'"></span>
      <span v-if="type">收起菜单</span>
    </a-button>
    <div :style="{ height: `${mainH - 40}px` }" class="nav-warpper">
      <template v-if="type">
        <menu-item v-for="(e, i) in asideList" :key="i" :menu-item="e" :depth="0"></menu-item>
      </template>
      <template v-else>
        <menu-item-thin v-for="(e, i) in asideList" :key="i" :menu-item="e" :depth="0"></menu-item-thin>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'pinia'
import MenuItem from './MenuItem'
import MenuItemThin from './MenuItemThin'
export default {
  name: 'AsideBar',
  components: { MenuItem, MenuItemThin },
  props: {
    mainH: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      type: true,
      collapsed: false,
    }
  },
  computed: {
    ...mapGetters(['asideList']),
  },
  watch: {
    $route: {
      handler(val) {
        // console.log('route', val)
      },
      immediate: true,
    },
  },
  mounted() {
    this.reisze()
    window.addEventListener('resize', this.reisze)
  },
  methods: {
    // 屏幕缩放
    reisze() {
      let _this = this
      let clientW = document.body.clientWidth
      _this.type = clientW >= 1080
      _this.$emit('changeSideBar', _this.type ? '180' : '52')
    },
    // 切换测导航类型
    changeSideBar(val) {
      this.type = val
      this.$emit('changeSideBar', val ? '180' : '52')
    },
  },
}
</script>

<style lang="less" scoped>
#nav-bar {
  transition: all 0.4s;

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

.wide {
  width: 180px;
}

.thin {
  width: 52px;
  overflow: hidden;
}
</style>
