<template>
  <div class="wrap">
    <a-popover placement="right" trigger="hover" overlay-class-name="menu-item-content" :get-popup-container="
      triggerNode => {
        return triggerNode.parentNode
      }
    ">
      <div class="menu-item-icon" @mouseover="isHover = true" @mouseout="isHover = false">
        <span v-if="menuItem.icon || menuItem.icon_h" ref="icon" class="menu-icon">
          <img v-if="$route.path.indexOf(menuItem.path) > -1 || isHover" class="icon" :src="menuItem.icon_h"
            alt="pic" />
          <img v-else class="icon" :src="menuItem.icon" alt="pic" />
        </span>
      </div>
      <template slot="content">
        <div class="father" :class="selectedType === 2 ? 'active-title' : ''">
          <span class="label" @click="handleFatherClick(menuItem)">
            {{ menuItem.label }}
          </span>
        </div>
        <menu-item v-for="(e, i) in menuItem.children" :key="i" :menu-item="e" :depth="depth + 1"
          @emitChildrenHeight="handleEmitChildrenHeight"></menu-item>
      </template>
    </a-popover>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  name: 'MenuItemThin',
  components: { MenuItem },
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
      hover: false,
      totalH: 0, // 可见总导航高度 = 当前子集 + 孙集
      currentChildrenH: 0, // 当前子集导航高度
      emitChildrenH: 0, // 孙集导航高度
      heightTemp: [], //全部子/孙集展开高度合集
    }
  },
  computed: {
    selectedType() {
      const curRoute = this.$route.path
      if (this.menuItem.path) {
        if (curRoute.indexOf(this.menuItem.path) !== -1) {
          return 2
        } else {
          return 1
        }
      } else {
        let childSelected = false
        /* eslint-disable */
        function find(arr) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].path) {
              if (curRoute.indexOf(arr[i].path) !== -1) {
                childSelected = true
                break
              }
            } else {
              find(arr.children)
            }
          }
        }
        /* eslint-enable */
        find(this.menuItem.children)
        return childSelected ? 2 : 1
      }
    },
  },
  methods: {
    handleSwitchRouter(item) {
      this.$router.push(item.path)
    },
    // 子集展开/收起，抛出子集高度，重新计算父级高度
    handleEmitChildrenHeight(emitChildrenData) {
      let idx = this.heightTemp.findIndex(e => e.key == emitChildrenData.key)
      if (idx > -1) {
        this.heightTemp.splice(idx, 1)
      } else {
        this.heightTemp.push(emitChildrenData)
      }
      if (this.menuItem.children) {
        this.currentChildrenH = 40 * this.menuItem.children.length
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
    handleFatherClick(e) {
      if (!e.children) {
        this.$router.push(e.path)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.wrap {
  :deep(.menu-item-content) {
    min-width: 172px;
    left: 47px !important;

    .ant-popover-inner {
      .ant-popover-inner-content {
        padding: 0;

        .father {
          display: flex;
          align-items: center;
          text-align: center;
          user-select: none;
          cursor: pointer;

          .label {
            text-align: left;
            padding-left: 16px;
            padding-top: 12px;
            width: 100%;
            height: 40px;
            font-size: 14px;
          }

          .fr {
            font-size: 10px;
            float: right;
            transition: all 0.3s;
            margin-right: 13px;
          }

          .down {
            transform: rotate(90deg);
          }
        }

        .text-content {
          user-select: none;
          cursor: pointer;

          .content-top {
            display: flex;
            align-items: center;
            position: relative;

            .point {
              width: 2px;
              margin-left: 25px;
              margin-right: 15px;
            }

            p {
              display: flex;
              margin: 0;
              height: 40px;
              font-size: 14px;
              text-align: center;
              align-items: center;
              margin-right: 36px;
            }

            .menu-icon {
              position: absolute;
              right: 13px;
              font-size: 20px;
              transform: scale(50%);
              transition: all 0.3s;
            }
          }

          &.last-level {
            padding-left: 58px;
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }

    .ant-popover-arrow {
      display: none;
    }
  }
}

.menu-item-icon {
  display: flex;
  align-items: center;
  height: 40px;
  padding-left: 16px;

  .mmxlicon {
    cursor: pointer;
    font-size: 20px;
    text-align: center;
  }

  .mmxlicon:hover {
    color: #00c7db;
  }
}

.active {
  color: #00c7db;
  background: #00cccc0f;
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

.active-title {
  color: #00c7db;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
