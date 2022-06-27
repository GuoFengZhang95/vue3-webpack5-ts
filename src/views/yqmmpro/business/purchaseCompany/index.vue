<template>
  <div v-if="power" class="yqmmpro-business-fund">
    <template v-if="power !== 2">
      <MuTab
        class="service-tab"
        :tab-list="tabList"
        :active-key="activeKey"
        @handleTabChange="handleTabChange"
      ></MuTab>
      <template v-if="tabList.length === 2">
        <PurchaseCompanyTable v-show="activeKey === 0" keys="mine"></PurchaseCompanyTable>
        <PurchaseCompanyTable
          v-show="activeKey === 1 && power === 1"
          keys="all"
        ></PurchaseCompanyTable>
      </template>
      <template v-else>
        <PurchaseCompanyTable keys="mine"></PurchaseCompanyTable>
      </template>
    </template>
    <template v-else>
      <auth-tips></auth-tips>
    </template>
  </div>
</template>

<script>
  import { yqmmBusinessMix } from '@/mixin/index'
  import PurchaseCompanyTable from './components/PurchaseCompanyTable.vue'

  export default {
    name: 'YqmmproBusinessFund',
    components: {
      PurchaseCompanyTable,
    },
    mixins: [yqmmBusinessMix({ moduleId: 6 })],
  }
</script>

<style lang="less" scoped>
  .yqmmpro-business-fund {
    .mumu-tabs {
      height: 57px;
    }
  }
</style>
