<template>
  <div>
    <i v-if="companyList.length === 0">-</i>
    <template v-else>
      <a-tooltip v-for="(companyItem, index) in companyList" :key="index">
        <template slot="title">
          <i>{{ companyItem.companyName }}</i>
        </template>
        <i
          :class="{ active: !!companyItem.companyId }"
          class="table-slot-action"
          @click="handleCompanyClick(companyItem)"
          v-html="companyItem.companyNameEm"
        ></i>
        <i v-if="companyList.length > index + 1">，</i>
      </a-tooltip>
    </template>
  </div>
</template>

<script>
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  export default {
    name: 'TableCompanySlot',
    props: {
      companyList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {
      /**点击依托单位 */
      handleCompanyClick(companyItem) {
        console.log(companyItem)
        if (companyItem.companyId) {
          this.$globalDrawer.show({
            component: PurchaseCompanyDetail,
            options: {
              name: 'PurchaseCompanyDetail',
              title: '',
              props: {
                id: companyItem.companyId,
              },
            },
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .table-slot-action {
     color: #444;
     
    &.active {
      cursor: pointer;
      color: #00c7db;
    }
  }
</style>