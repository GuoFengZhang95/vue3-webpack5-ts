<template>
  <div class="company-purchase-wrap">
    <div class="purchase-list-wrap">
      <!-- 列表 -->
      <MuTable
        ref="mumuTable"
        :has-index="true"
        row-key="tokenEncodeId"
        :is-loading="mixinLoding"
        :page="commonRequestParams.pageNum"
        :page-size="commonRequestParams.pageSize"
        :total="total"
        :total-visible="false"
        :columns="columns"
        :data-source="dataSource"
        :pagination-flag="showPagination"
        @pageChange="handlePageNumChange"
        @pageSizeChange="handlePageSizeChange"
        @reloadTable="reloadTable"
        @handleRowClick="handleRowClick"
      >
        <template slot="action">
          <MuSearchGroup
            :select-visible="false"
            :placeholder="searchPlaceholder"
            @search="handleSearchConfirm"
            @selectChange="handleSearchSelectChange"
          ></MuSearchGroup>
        </template>
      </MuTable>
      <EquityPaginationMask v-if="!showPagination && loadingStatus === 3"></EquityPaginationMask>
    </div>
  </div>
</template>

<script>
  import { tableMix, loadingMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { addYqmmSearchLog, getPurchaseList, getRemainCardTimes } from '@/api/index.js'
  import {
    getPurchaseColumns,
    purchaseTableListFilter,
  } from '@/service/index.js'
  const PurchaseDetail = () => import('@/views/yqmmpro/components/PurchaseDetail.vue')

  export default {
    name: 'CompanyPurchase',
    components: {},
    mixins: [
      tableMix,
      loadingMix(),
    ],
    data() {
      return {
        searchType: 7,
        /**搜索框下拉数据 */
        selectOptions: [
          {
            label: '综合搜索',
            value: '1',
          },
          {
            label: '标题搜索',
            value: '2',
          },
          {
            label: '采购单位',
            value: '3',
          },
        ],
        /**表格数据 */
        dataSource: [],
        /**表格公共入参 */
        commonRequestParams: {
          /**页码 */
          pageNum: 1,
          /**每页数 */
          pageSize: 20,
        },
        /**页面特有的列表入参 */
        pageRequestParams: {
          /**搜索条件 */
          searchKey: '',
          /**搜索范围 */
          searchType: '',
          /**是否高亮 */
          isHighlight: 1,
          /**是否需要置顶 */
          isNeedTop: 1,
          /**0-相关度 1-发布时间倒叙 */
          sort: 1,
        },
        columns: getPurchaseColumns(),
        /**权益卡采购意向剩余次数 */
        remainTotalTimes: 0,
        searchPlaceholder: '',
      }
    },
    computed: {
      unionRequestParams() {
        this.pageRequestParams.isNeedTop = this.pageRequestParams.searchKey ? 0 : 1
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
      /**是否展示分页（当前模块是否有额度） */
      showPagination() {
        return this.remainTotalTimes > 0 || this.remainTotalTimes === -1
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.getRemainTimes()
        this.handleQuery()
      },
      getRemainTimes() {
        getRemainCardTimes({ type: 1 }).then(({ code, data: { remainCardTimes } }) => {
          if (code === '0') {
            this.remainTotalTimes = remainCardTimes
          }
        })
      },
      async handleQuery() {
        this.toggleMixinLoading(true)
        const res = await getPurchaseList(this.unionRequestParams)
        if (res.code === '0') {
          if (this.unionRequestParams.searchKey) {
            const logRes = await addYqmmSearchLog({
              isHotSearch: !!res?.data?.list?.length,
              searchClient: 1,
              searchKey: this.unionRequestParams.searchKey,
              searchPlatform: 8,
              searchType: 7,
            })
            if (logRes.code === '0') {
              this.$refs['YqmmproPageSearch'].updateSearchLog(this.searchType)
            }
          }
          if (res.data && res.data.list) {
            this.purchaseList = cloneDeep(res.data.list)
            this.dataSource = purchaseTableListFilter({ list: res.data.list })
            this.total = res.data && res.data.totalCount ? res.data.totalCount : 0
          }
        }
        this.selectedRowKeys = []
        this.toggleMixinLoading(false)
      },
      /**搜索*/
      handleSearchConfirm() {
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = 20
        this.handleQuery()
      },
      handleSearchSelectChange() {

      },
      /**页码变更 */
      handlePageNumChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.getRemainTimes()
        this.commonRequestParams.pageNum = page
        this.handleQuery()
      },
      /**每页数变更 */
      handlePageSizeChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.getRemainTimes()
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = pageSize
        this.handleQuery()
      },
      // 表格操作
      handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          if (rowData.key === 'bidName') {
            this.$globalDrawer.show({
              component: PurchaseDetail,
              options: {
                name: 'PurchaseDetail',
                title: '采购意向详情',
                props: { id: record.tokenEncodeId },
              },
            })
          }
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .purchase-list-wrap {
    > .mumuxili-table {
      /deep/ .action {
        padding: 0 0 12px!important;
      }
    }
    /deep/.pagition-act {
      > span {
        display: none;
      }
    }

    .purchase-list {
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 8px));
      column-gap: 16px;
      row-gap: 8px;
    }
  }
</style>
