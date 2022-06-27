<template>
  <div id="yqmmproMining">
    <AdverDesc
      v-if="authType.status === 1"
      image="https://img.mumuxili.com/yqmm/pc/saas/images/qingbaozhongxin_1.svg"
    ></AdverDesc>
    <AuthTips v-if="authType.status === 2" :auth-type="3"></AuthTips>
    <router-view v-if="authType.status === 3 || authType.status === 4"></router-view>
  </div>
</template>

<script>
  const AdverDesc = () => import('@/views/yqmmpro/components/AdverDesc.vue')
  export default {
    name: 'YqmmproMining',
    components: {
      AdverDesc,
    },
    inject: ['authType'],
  }
</script>

<style scoped></style>
