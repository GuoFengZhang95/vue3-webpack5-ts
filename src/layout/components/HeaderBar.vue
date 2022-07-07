<template>
  <h1>我是headerbar</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HeaderBar',
  setup() {

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
