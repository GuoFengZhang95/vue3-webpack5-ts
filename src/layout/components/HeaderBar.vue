<template>
  <div id="header-bar" ref="headerBar">
    <div class="left">
      <div class="header-logo" @click="goDashboard">
        <img src="@/assets/images/common/system-logo.svg" />
      </div>
      <div class="header-menu">
        <div v-for="(e, i) in headerList" :key="i" :class="$route.path.indexOf(e.path) > -1 ? 'active' : ''"
          class="header-menu-item" @mouseenter="; (hover = true), (cur = i)" @mouseleave="; (hover = false), (cur = '')"
          @click="handleMenuSelect(e)">
          <img v-if="$route.path.indexOf(e.path) > -1 || (hover && cur === i)" class="mmxlicon" :src="e.icon_h"
            alt="pic" />
          <img v-else class="mmxlicon" :src="e.icon" alt="pic" />
          <span>{{ e.label }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <a-dropdown :get-popup-container="() => headerBar">
        <div class="login-avatar">
          <img :src="avatar" alt="avatar" />
        </div>
        <template #overlay>
          <a-menu class="mini-pro-menu">
            <a-menu-item>
              <div class="login-out" @click="goHelpCenter">帮助中心</div>
            </a-menu-item>
            <a-menu-item>
              <div class="login-out" @click="exit">退出登录</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { logout } from '@/api/index'
import { useUserStore, useRoutesStore } from '@/store/index'
import router from '@/router/index'
import type { NavItem, NavKey } from '@/store/routes/index'
export default defineComponent({
  name: 'HeaderBar',
  setup() {
    const userStore = useUserStore()
    const routeStore = useRoutesStore()

    const baseUserInfo = computed(() => {
      return userStore.baseUserInfo
    })
    const avatar = computed(() => {
      return baseUserInfo.value.avatar
    })
    const headerList = computed(() => {
      const allNavList = routeStore.allNavList
      return allNavList
    })

    let hover = ref(false)
    let cur = ref('')
    const headerBar = ref<HTMLInputElement | null>(null)
    const goDashboard = () => {
      router.push({
        path: '/dashboard'
      })
    }
    /**切换一级模块 */
    const handleMenuSelect = (e: NavItem) => {
      routeStore.getAsideList(e.path.replace('/', '') as NavKey)
    }
    /**跳转帮助中心 */
    const goHelpCenter = () => {
      window.open('https://thoughts.aliyun.com/sharespace/623c471037713d001afe39d5')
    }
    /**退出登录 */
    const exit = () => {
      logout()
    }

    return {
      baseUserInfo,
      avatar,
      headerList,
      hover,
      cur,
      headerBar,
      goHelpCenter,
      exit,
      handleMenuSelect,
      goDashboard
    }
  },
})
</script>

<style lang="less" scoped>
#header-bar {
  background: #405668;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  padding-right: 30px;
  height: 60px;
  line-height: 60px;

  .left {
    display: flex;

    .header-logo {
      width: 180px; //标准180px
      height: 100%;
      padding: 0 22px 0 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        color: #fff;
        font-size: 14px;
        margin-left: 8px;
      }
    }

    .header-menu {
      display: flex;

      .header-menu-item {
        cursor: pointer;
        transition: all 0.3s;
        padding: 0 24px;
        text-align: center;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;

        .mmxlicon {
          width: 24px;
          //height: 60px;
          font-size: 24px;
          margin-right: 4px;
        }

        &:hover {
          color: #00c7db;
        }

        span {
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
          font-weight: 400;
        }
      }

      .active {
        background: #364554;
        color: #fff;

        i,
        span {
          color: #00c7db;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;

    .login-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      border: 1px solid #d9d9d9;
      cursor: pointer;
      display: flex;
      align-items: center;

      >img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
<style lang="less">
#header-bar {
  .ant-dropdown-menu {
    padding: 0;
    margin-top: -4px;

    .ant-dropdown-menu-item {
      &:hover {
        background-color: unset;
      }

      .login-out {
        user-select: none;

        &:hover {
          color: #00c7db;
        }
      }
    }
  }
}
</style>

