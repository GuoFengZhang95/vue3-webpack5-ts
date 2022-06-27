<template>
  <div class="yqmmpro-mining-subscription">
    <div class="tab-wrp">
      <MuTab
        :tab-list="tabList"
        :active-key="activeKey"
        @handleTabChange="e => (activeKey = e.value)"
      ></MuTab>
      <FoldController
        v-if="activeKey == 0"
        :result-num="purchaseResultNum"
        :is-expanded.sync="isPurchaseExpanded"
      ></FoldController>
      <FoldController
        v-if="activeKey == 1"
        :result-num="bidResultNum"
        :is-expanded.sync="isBidExpanded"
      ></FoldController>
    </div>
    <purchase-subscription
      v-if="activeKey == 0"
      :is-expanded="isPurchaseExpanded"
      :result-num.sync="purchaseResultNum"
    ></purchase-subscription>
    <bid-subscription
      v-if="activeKey == 1"
      :is-expanded="isBidExpanded"
      :result-num.sync="bidResultNum"
    ></bid-subscription>
  </div>
</template>

<script>
  const PurchaseSubscription = () =>
    import('./components/PurchaseSubscription.vue')
  const BidSubscription = () => import('./components/BidSubscription.vue')
  const FoldController = () =>
    import('@/views/yqmmpro/components/ScreenPanel/FoldController.vue')
  export default {
    name: 'YqmmproMiningSubscription',
    components: {
      PurchaseSubscription,
      BidSubscription,
      FoldController,
    },
    mixins: [],
    data() {
      return {
        purchaseResultNum: 0,
        isPurchaseExpanded: true,
        bidResultNum: 0,
        isBidExpanded: true,
        tabList: [
          {
            value: 0,
            label: '采购意向订阅',
          },
          {
            value: 1,
            label: '标讯订阅',
          },
        ],
        activeKey: 0,
      }
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-mining-subscription {
    position: relative;
    border-radius: 4px;
    overflow: hidden;

    .tab-wrp {
      position: relative;

      .search-wrap-controller {
        position: absolute;
        top: 29px;
        right: 24px;
        transform: translateY(-50%);
      }
    }
  }
</style>
