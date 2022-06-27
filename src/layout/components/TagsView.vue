<template>
  <div id="tab">
    <!-- {{tabMax}} -->
    <!-- 导航标签 -->
    <div class="tag-list">
      <div
        v-for="(e, i) in renderTab"
        :key="i"
        class="tag-item"
        :class="$route.path == e.path ? 'active' : 'border'"
        :title="e.label"
        @click.prevent="handleTabClick(e, i)"
        @mouseenter="handleTabEnter(e, i)"
        @mouseleave="handleTabLeave(e, i)"
      >
        <!-- 标签名称 -->
        <span class="title">{{ e.label }}</span>
        <!-- 关闭按钮 -->
        <div class="button-close">
          <i
            v-show="current === i || $route.path == e.path"
            class="mmxlicon mi-close"
            @click.stop="handleTabDelete(e)"
          ></i>
        </div>
      </div>
    </div>
    <!-- 右侧菜单 -->
    <div v-show="renderTab.length > 5" class="drop-menu">
      <a-dropdown
        class="extend-con"
        :trigger="['click']"
        :get-popup-container="triggerNode => triggerNode.parentNode"
        @visibleChange="handleDropdownChange"
      >
        <!-- 打开按钮 -->
        <div class="caret-down" :class="dropdownVisible ? 'bg-white' : ''">
          <a-icon type="caret-down" class="btn"></a-icon>
        </div>
        <a-menu slot="overlay" class="extend-list">
          <a-menu-item
            v-for="(e, i) in renderTab"
            :key="i"
            class="extend-item"
            @mouseenter="handleTabEnter(e, i)"
            @mouseleave="handleTabLeave(e, i)"
            @click="handleTabSwitch(e, i)"
          >
            <div class="title">
              {{ e.label }}
            </div>
            <!-- 关闭单一页面按钮 -->
            <i
              v-show="current === i"
              class="mmxlicon mi-close"
              @click.stop="handleTabDelete(e)"
            ></i>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'pinia'
  export default {
    name: 'TagsView',
    data() {
      return {
        current: -1,
        extendCurrent: -1,
        dropdownVisible: false,
      }
    },
    computed: {
      ...mapGetters(['tabMax', 'renderTab']),
    },
    watch: {
      tabMax() {
        this.$store.dispatch('tagsView/setTabs')
      },
      $route: {
        handler(route) {
          if (route?.meta?.isTagView) {
            this.$store.dispatch('tagsView/setTabs', { label: route.meta.title, path: route.path })
          }
        },
        immediate: true,
      },
    },
    mounted() {
      window.addEventListener('resize', this.resize)
      this.$nextTick(() => {
        this.resize()
      })
    },
    methods: {
      // 计算一行的最大显示个数
      resize() {
        //  let el = document.querySelector('.tag-list')
        //  let tabMax = Math.floor((el.offsetWidth - 10) / 80)
        this.$store.dispatch('tagsView/setTabMax', 100)
      },
      // tab悬浮显示删除符号
      handleTabEnter(item, idx) {
        this.current = idx
      },
      // tab悬浮隐藏删除符号
      handleTabLeave() {
        this.current = -1
      },
      // 选中tab页签
      handleTabClick(item) {
        this.$router.push(item.path)
      },
      // 选择富余的tab列表
      handleTabSwitch(item) {
        this.dropdownVisible = !this.dropdownVisible
        this.$router.push(item.path)
        this.$store.dispatch('tagsView/setTabs', item)
      },
      // 删除tab页签
      handleTabDelete(item) {
        this.$store.dispatch('tagsView/deleteTabs', item)
        // 如果删除当前路径，则需要跳转
        if (item.path === this.$route.path && this.renderTab.length) {
          for (let i = this.renderTab.length - 1; i >= 0; i--) {
            if (this.renderTab[i].path !== item.path) {
              this.handleTabSwitch(this.renderTab[i])
              break
            }
          }
        }
      },
      handleDropdownChange(visible) {
        this.dropdownVisible = visible
      },
    },
  }
</script>

<style lang="less" scoped>
  @import '~@/assets/style/common2.less';
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
