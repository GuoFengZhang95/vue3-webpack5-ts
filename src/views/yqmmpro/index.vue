<template>
  <div id="yqmmpro">
    <router-view></router-view>
  </div>
</template>

<script>
  import { equityAuthMix } from '@/mixin/index.js'
  export default {
    name: 'Yqmmpro',
    mixins: [equityAuthMix()],
    provide() {
      return {
        authType: this.authType,
      }
    },
    mounted() {
      // todo 数据字典存在vuex中是否会导致内存占用过大
      this.getDicts()
    },
    methods: {
      getDicts() {
        this.$store.dispatch('dictionary/getTargetDicts', [
          'getCompanyType',
          'getCity',
          'getBidType',
          'getTitle',
          'getAdminiPost',
        ])
      },
    },
  }
</script>

<style lang="less" scoped>
  #yqmmpro {
    .content {
      padding: 16px;
    }
  }
</style>
<style lang="less">
  #yqmmpro {
    .result-switch-slot {
      padding-right: 32px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &.right::after {
        content: '';
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 24px;
        background-color: #e9e9e9;
      }

      .export-button-wrapper {
        margin-left: 12px;
      }
    }
    // 表格中单位和客源插槽样式
    .action-item-user {
      cursor: pointer;
      color: #00c7db;

      > i {
        color: #444;
        cursor: auto;
      }

      &.disabled {
        color: #444;
        cursor: auto;
      }
    }
  }
</style>
