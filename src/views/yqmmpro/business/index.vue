<template>
  <div id="yqmmproBusiness">
    <AdverDesc
      v-if="authType.status === 1 || authType.status === 3"
      image="https://img.mumuxili.com/yqmm/pc/saas/images/qingbaozhongxin_1.svg"
    ></AdverDesc>
    <router-view v-if="authType.status === 2 || authType.status === 4"></router-view>
  </div>
</template>

<script>
  const AdverDesc = () => import('@/views/yqmmpro/components/AdverDesc.vue')
  export default {
    name: 'YqmmproBusiness',
    components: {
      AdverDesc,
    },
    inject: ['authType'],
  }
</script>

<style lang="less">
  #yqmmproBusiness {
    .actions-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > .left {
        display: flex;
        align-items: center;

        > div {
          margin-right: 12px;
        }
      }

      > .right {
        display: flex;
        align-items: center;
        
        .export-button-wrapper {
          margin-left: 12px;
        }
      }
    }
  }
</style>
