<template>
  <div class="company-bid">
    <div class="bid-list-wrap">
      <!-- 列表 -->
      <MuTable
        ref="mumuTable"
        :has-index="true"
        :is-loading="mixinLoding"
        :page="commonRequestParams.pageNum"
        :page-size="commonRequestParams.pageSize"
        :total="total"
        :total-visible="false"
        :columns="columns"
        :data-source="dataSource"
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
    </div>
  </div>
</template>

<script>
  import { loadingMix, tableMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { getBidList, addYqmmSearchLog } from '@/api/index.js'
  import { bidTableListFilter, getBidColumns } from '@/service/index.js'
  const BidDetail = () => import('@/views/yqmmpro/components/BidDetail/index.vue')

  export default {
    name: 'CompanyBid',
    components: {},
    mixins: [loadingMix(), tableMix],
    data() {
      return {
        searchType: 2,
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
          searchRange: '0',
          /**搜索类型  */
          searchType: '1',
          /**0-相关度 1-发布时间倒叙 */
          sort: 1,
        },
        selectOptions: [
          {
            label: '综合搜索',
            value: '1',
          },
          {
            label: '标题搜索',
            value: '4',
          },
          {
            label: '采购单位',
            value: '2',
          },
        ],
        searchPlaceholder: '',
        columns: getBidColumns()
      }
    },
    computed: {
      unionRequestParams() {
        this.pageRequestParams.isNeedTop = this.pageRequestParams.searchKey ? 0 : 1
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.handleQuery()
      },
      async handleQuery() {
        this.toggleMixinLoading(true)
        const res = await getBidList(this.unionRequestParams)
        if (res.code === '0') {
          if (this.unionRequestParams.searchKey) {
            const logRes = await addYqmmSearchLog({
              isHotSearch: !!res?.data?.list?.length,
              searchClient: 1,
              searchKey: this.unionRequestParams.searchKey,
              searchPlatform: 8,
              searchType: 2,
            })
            if (logRes.code === '0') {
              this.$refs['YqmmproPageSearch'].updateSearchLog(this.searchType)
            }
          }
          if (res.data && res.data.list) {
            this.bidList = cloneDeep(res.data.list)
            this.dataSource = bidTableListFilter({ list: res.data.list })
            this.total = res.data && res.data.totalCount ? res.data.totalCount : 0
          }
        }
        this.toggleMixinLoading(false)
      },
      handleSearchSelectChange() {},
      handleSearchConfirm() {
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = 20
        this.handleQuery()
      },
      /**页码变更 */
      handlePageNumChange(page) {
        this.commonRequestParams.pageNum = page
        this.handleQuery()
      },
      /**每页数变更 */
      handlePageSizeChange(page, pageSize) {
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = pageSize
        this.handleQuery()
      },
      // 表格操作
      handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          if (rowData.key === 'title') {
            this.$globalDrawer.show({
              component: BidDetail,
              options: {
                name: 'BidDetail',
                title: '标讯详情',
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
  .bid-list-wrap {
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

    .bid-list {
      display: grid;
      grid-template-columns: repeat(1);
      row-gap: 16px;
    }
  }
</style>
