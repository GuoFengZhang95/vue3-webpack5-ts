<template>
  <div id="saas-dashboard">
    <HeaderBar></HeaderBar>
    <div class="content">
      <!-- 接口待进一步优化 a-row在火狐有兼容性问题 -->
      <a-row :gutter="[0, 10]">
        <a-col :span="24">
          <SaasInfo></SaasInfo>
        </a-col>
        <a-col :span="24">
          <a-row :gutter="[0, 10]">
            <a-col :span="16">
              <a-row :gutter="[0, 10]">
                <a-col :span="24">
                  <UnlockTimesStatistics></UnlockTimesStatistics>
                </a-col>
                <a-col :span="24">
                  <QuickAccess></QuickAccess>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="8">
              <!-- <dynamic-monitoring></dynamic-monitoring> -->
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderBar from '@/layout/components/HeaderBar.vue'
import SaasInfo from './components/SaasInfo.vue'
import QuickAccess from './components/QuickAccess.vue'
import UnlockTimesStatistics from './components/UnlockTimesStatistics.vue'
// import DynamicMonitoring from './components/DynamicMonitoring.vue'
export default defineComponent({
  name: 'SaasDashboard',
  components: {
    HeaderBar,
    SaasInfo,
    UnlockTimesStatistics,
    QuickAccess,
    // DynamicMonitoring,
  },
  setup() {

  }
})
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

<style lang="less">
</style>
