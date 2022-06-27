<template>
  <div id="saas-dashboard">
    <header-bar></header-bar>
    <div class="content">
      <!-- 接口待进一步优化 a-row在火狐有兼容性问题 -->
      <a-row :gutter="[0, 0]">
        <a-col :span="24"><saas-info></saas-info></a-col>
      </a-row>
      <a-row :gutter="[10, 20]" align="stretch" type="flex" style="margin-top: 0px">
        <a-col :span="16">
          <unlock-times-statistics></unlock-times-statistics>
          <quick-access></quick-access>
        </a-col>
        <a-col :span="8"><dynamic-monitoring></dynamic-monitoring></a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import HeaderBar from '@/layout/components/HeaderBar'
  import SaasInfo from './components/SaasInfo'
  import UnlockTimesStatistics from './components/UnlockTimesStatistics.vue'
  import QuickAccess from './components/QuickAccess.vue'
  import DynamicMonitoring from './components/DynamicMonitoring.vue'
  export default {
    name: 'SaasDashboard',
    components: {
      HeaderBar,
      SaasInfo,
      UnlockTimesStatistics,
      QuickAccess,
      DynamicMonitoring,
    },
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  #saas-dashboard {
    height: 100%;
    min-height: 100vh;
    background: #f4f4f4;

    .content {
      // 兼容 a-row在火狐中的兼容性问题
      padding: 10px;
      display: flex;
      flex-direction: column;
    }
  }
</style>

<style lang="less"></style>
