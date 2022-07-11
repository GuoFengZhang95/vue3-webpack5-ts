<template>
  <div class="menu-item" :class="`menu-item-${depth}`">
    <div class="menu-item-title" :class="
      $route.fullPath === menuItem.path
        ? 'active'
        : $route.fullPath.indexOf(menuItem.path) > -1
          ? 'active-title'
          : ''
    " @click.stop="handleToggleChildren($event, menuItem)" @mouseover="isHover = true" @mouseout="isHover = false">
      <!-- 1级导航图标 -->
      <span v-if="menuItem.icon || menuItem.icon_h" class="menu-icon">
        <img v-if="$route.path.indexOf(menuItem.path) > -1 || isHover" class="icon" :src="menuItem.icon_h" alt="pic" />
        <img v-else class="icon" :src="menuItem.icon" alt="pic" />
      </span>

      <!-- 2级导航点 -->
      <i v-else class="menu-point" :style="{ margin: `0 14px 0 ${15 * depth}px` }">
        {{ depth === 1 ? '·' : '' }}
      </i>
      <!-- 导航主体 -->
      <span class="menu-label">{{ menuItem.label }}</span>
      <!-- 展开/收起箭头 -->
      <i v-if="menuItem.children" class="mmxlicon mi-arrow-down arrow-status"
        :class="showChildren ? 'open' : 'close'"></i>
    </div>
    <!-- 递归导航列表 -->
    <div class="menu-item-children" :style="{ height: `${totalH}px` }" @emitChildrenHeight="handleEmitChildrenHeight">
      <menu-item v-for="(e, i) in menuItem.children" :key="i" :menu-item="e" :depth="depth + 1"
        @emitChildrenHeight="handleEmitChildrenHeight"></menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object,
      default: () => { },
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isHover: false,
      showChildren: false,
      totalH: 0, // 可见总导航高度 = 当前子集 + 孙集
      currentChildrenH: 0, // 当前子集导航高度
      emitChildrenH: 0, // 孙集导航高度
      heightTemp: [], // 全部子/孙集展开高度合集
    }
  },
  watch: {
    menuItem(val, pre) {
      this.currentChildrenH = 0
      this.emitChildrenH = 0
      this.totalH = this.currentChildrenH + this.emitChildrenH
      this.init()
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      function getPaths(arr) {
        let result = []
        arr.forEach(e => {
          if (e.children) {
            result = [...result, ...getPaths(e.children)]
          } else {
            result = [...result, e.path]
          }
        })
        return result
      }
      // 默认你展开所有的侧边栏
      if (this.menuItem.children) {
        this.currentChildrenH = 40 * this.menuItem.children.length
        this.totalH = this.currentChildrenH + this.emitChildrenH
        this.showChildren = true
        this.$emit('emitChildrenHeight', {
          key: this.menuItem.path,
          h: 40 * this.menuItem.children.length,
        })
        // 只展开包含当前激活路由的侧边栏
        // let fullPaths = this.$route.path
        // if (list.findIndex(e => e === fullPaths) > -1) {
        //   this.currentChildrenH = 40 * this.menuItem.children.length
        //   this.totalH = this.currentChildrenH + this.emitChildrenH
        //   this.showChildren = true
        //   this.$emit('emitChildrenHeight', {
        //     key: this.menuItem.path,
        //     h: 40 * this.menuItem.children.length,
        //   })
        // } else {
        //   this.currentChildrenH = 0
        //   this.totalH = 0
        //   this.showChildren = false
        // }
      }
      this.heightTemp = []
    },
    // 点击侧导航
    async handleToggleChildren(event, item) {
      // 最后层级：选中当前导航&设置全局tab
      if (!item.children) {
        this.$router.push(item.path)
        return
      }
      // 存在子集：toggle展开状态，计算高度
      this.showChildren = !this.showChildren
      if (this.showChildren) {
        this.currentChildrenH = 40 * this.menuItem.children.length
        this.totalH = this.currentChildrenH + this.calcHeight()
        this.$emit('emitChildrenHeight', {
          key: this.menuItem.path,
          h: this.currentChildrenH,
        })
      } else {
        this.currentChildrenH = 0
        this.totalH = 0
        this.$emit('emitChildrenHeight', { key: this.menuItem.path, h: 0 })
      }
    },
    // 子集展开/收起，抛出子集高度，重新计算父级高度
    handleEmitChildrenHeight(emitChildrenData) {
      let idx = this.heightTemp.findIndex(e => e.key === emitChildrenData.key)
      if (idx > -1) {
        this.heightTemp.splice(idx, 1, emitChildrenData)
      } else {
        this.heightTemp.push(emitChildrenData)
      }
      this.emitChildrenH = this.calcHeight()
      this.totalH = this.currentChildrenH + this.emitChildrenH
    },
    // 计算高度
    calcHeight() {
      let result = 0
      this.heightTemp.forEach(heightData => {
        result += heightData.h
      })
      return result
    },
  },
}
</script>

<style lang="less" scoped>
.menu-item {
  .active {
    background: #e5f9fc;
    color: #00c7db;
    position: relative;

    &::before {
      display: inline-block;
      content: '';
      width: 3px;
      height: 100%;
      background-color: #00c7db;
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .menu-item-title {
    height: 40px;
    display: flex;
    padding-right: 7px;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;

    .menu-icon {
      display: block;
      height: 20px;
      font-size: 0;
      margin-left: 15px;
      margin-right: 14px;

      .icon {
        width: 20px;
        height: 20px;
      }
    }

    .menu-point {
      font-size: 2px;
      width: 20px;
      text-align: center;
      display: inline-block;
    }

    .menu-label {
      flex: 1;
      font-size: 14px;
      white-space: nowrap;
    }

    .arrow-status {
      font-size: 20px;
      transform: scale(0.5);
      transition: all 0.3s;
    }

    .open {
      transform: scale(0.5) rotate(0deg);
    }

    .close {
      transform: scale(0.5) rotate(-90deg);
    }

    &:hover {
      color: #0cc7db;
    }
  }

  .active-title {
    color: #0cc7db;
  }

  .menu-item-children {
    transition: all 0.3s;
    overflow: hidden;
    height: 0;
  }
}
</style>
