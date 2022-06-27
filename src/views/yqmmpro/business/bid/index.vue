<template>
  <div v-if="power" class="bid">
    <template v-if="power !== 2">
      <MuTab
        class="service-tab"
        :tab-list="tabList"
        :active-key="activeKey"
        @handleTabChange="handleTabChange"
      ></MuTab>
      <bid-table v-show="activeKey === 0" keys="mine"></bid-table>
      <bid-table
        v-if="tabList.length === 2"
        v-show="activeKey === 1 && power === 1"
        keys="all"
      ></bid-table>
    </template>
    <template v-else>
      <auth-tips></auth-tips>
    </template>
  </div>
</template>

<script>
  import { yqmmBusinessMix } from '@/mixin/index'
  import BidTable from './components/BidTable'

  export default {
    name: 'Bid',
    components: {
      BidTable,
    },
    mixins: [yqmmBusinessMix({ moduleId: 3 })],
  }
</script>

<style lang="less" scoped>
  .bid {
    .mumu-tabs {
      height: 57px;
    }
  }
</style>
