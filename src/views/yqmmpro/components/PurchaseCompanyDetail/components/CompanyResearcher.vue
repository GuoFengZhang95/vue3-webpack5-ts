<template>
  <div class="company-research-wrap">
    <div class="customer-list-wrap">
      <!-- 列表 -->
      <MuTable
        ref="mumuTable"
        :has-index="true"
        row-key="targetId"
        :is-loading="mixinLoding"
        :page="commonRequestParams.pageNum"
        :page-size="commonRequestParams.pageSize"
        :page-size-options="['15', '30', '45']"
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
            :options-list="selectOptions"
            :placeholder="searchPlaceholder"
            @search="handleSearchConfirm"
            @selectChange="handleSearchSelectChange"
          ></MuSearchGroup>
        </template>
        <template #nameSlot="slotProps">
          <span style="color: #00c7db; cursor: pointer" @click="handleNameClick" v-html="slotProps.text.label"></span>
        </template>
      </MuTable>
      <EquityPaginationMask v-if="!showPagination && loadingStatus === 3"></EquityPaginationMask>
    </div>
  </div>
</template>

<script>
  import { tableMix, loadingMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { addYqmmSearchLog, getResearcherList, getRemainCardTimes } from '@/api/index.js'
  import { getResearcherColumns, researcherTableListFilter } from '@/service/index.js'

  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')
  export default {
    name: 'CompanyResearcher',
    components: {},
    mixins: [
      tableMix,
      loadingMix()
    ],
    data() {
      return {
        searchType: 9,
        /**表格数据 */
        dataSource: [],
        /**表格公共入参 */
        commonRequestParams: {
          /**页码 */
          pageNum: 1,
          /**每页数 */
          pageSize: 15,
        },
        /**页面特有的列表入参 */
        pageRequestParams: {
          /**搜索条件 */
          searchKey: '',
          /**搜索类型  */
          searchType: '',
          /**是否高亮 */
          isHighlight: 1,
          /**0-相关度 1-发布时间倒叙 */
          sort: 0,
        },
        /**搜索框下拉数据 */
        selectOptions: [
          {
            label: '综合搜索',
            value: '1',
          },
          {
            label: '姓名',
            value: '2',
          },
          {
            label: '研究方向',
            value: '3',
          },
        ],
        searchPlaceholder: '',
        columns: [],
        /**权益卡科研客户剩余次数 */
        remainTotalTimes: 0,
      }
    },
    computed: {
      unionRequestParams() {
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
      /**是否展示分页（当前模块是否有额度） */
      showPagination() {
        return this.remainTotalTimes > 0 || this.remainTotalTimes === -1
      },
    },
    created() {
      // 初始化
      let colList = getResearcherColumns({ extend: ['mobile2', 'mobile3', 'email2', 'email3'] })

      this.columns = colList.filter(col => col.dataIndex != 'schoolName' && col.dataIndex != 'cityName').map(col => {
        if (col.dataIndex == 'name') { // 姓名
          col.type = 'slot'
          col.slotName = 'nameSlot'
        } else if (col.dataIndex == 'researchDirections') { // 研究方向
          col.type = 'html'
          col.dataIndex = 'researchesTagSearch'
        }
        return col
      })
    },
    mounted() {
      this.handleQuery()
      this.getRemainTimes()
      this.$bus.$on('unlock', ({ id, unlockName }) => {
        let unlockIndex = this.dataSource.findIndex(item => item.customerId == id)
        let lockCardItem = this.customerList[unlockIndex]
        // 卡片列表
        let unlockCardItem = Object.assign({}, lockCardItem, { name: unlockName, isConceal: 0 })
        this.customerList.splice(unlockIndex, 1, unlockCardItem)
        // 表格列表
        let lockTabelItem = this.dataSource[unlockIndex]
        let unlockTabelItem = Object.assign({}, lockTabelItem, {
          name: { key: 'name', label: unlockName },
        })
        this.dataSource.splice(unlockIndex, 1, unlockTabelItem)
      })
    },

    destroyed() {
      this.$bus.$off('unlock')
    },

    methods: {
      getFilterOptions() {},
      // 获取剩余额度，是否展示分页
      getRemainTimes() {
        getRemainCardTimes({ type: 6 }).then(({ code, data: { remainCardTimes } }) => {
          if (code === '0') {
            this.remainTotalTimes = remainCardTimes
          }
        })
      },
      async handleQuery() {
        this.toggleMixinLoading(true)
        const res = await getResearcherList(this.unionRequestParams)
        if (res.code === '0') {
          if (this.unionRequestParams.searchKey) {
            const logRes = await addYqmmSearchLog({
              isHotSearch: !!res?.data?.list?.length,
              searchClient: 1,
              searchKey: this.unionRequestParams.searchKey,
              searchPlatform: 8,
              searchType: 9,
            })
            // if (logRes.code === '0') {
            //   this.$refs['YqmmproPageSearch'].updateSearchLog(this.searchType)
            // }
          }
          if (res.data && res.data.customers) {
            this.customerList = cloneDeep(res.data.customers)
            this.dataSource = researcherTableListFilter({ list: res.data.customers })
            this.total = res.data && res.data.total ? res.data.total : 0
          }
        }
        this.selectedRowKeys = []
        this.toggleMixinLoading(false)
      },
      /**执行搜索*/
      handleSearchConfirm(val) {
        this.pageRequestParams.searchKey = val
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = 15
        this.handleQuery()
      },
      handleSearchSelectChange(key) {
        this.pageRequestParams.searchType = key
      },
      /**页码变更 */
      handlePageNumChange(page) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.commonRequestParams.pageNum = page
        this.handleQuery()
        this.getRemainTimes()
      },
      /**每页数变更 */
      handlePageSizeChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = pageSize
        this.handleQuery()
        this.getRemainTimes()
      },
      // 表格操作
      handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          if (rowData.key === 'name') {
            this.$globalDrawer.show({
              component: ResearcherDetail,
              options: {
                name: 'ResearcherDetail',
                title: '科研客户详情',
                props: { id: record.customerId },
              },
            })
          }
        }
      },
      // 姓名点击
      handleNameClick() {}
    },
  }
</script>

<style lang="less" scoped>
  .company-research-wrap {
    .customer-list-wrap {
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
      .customer-list {
        display: grid;
        grid-template-columns: repeat(3, calc((100% - 16px * 2) / 3));
        column-gap: 16px;
        row-gap: 16px;
      }
    }

    /deep/ .ant-popover-inner-content {
      padding: 0px;
    }

    /deep/.screen-panel-wrp {
      .school-slot {
        position: relative;
        padding-right: 20px;
        font-size: 12px;
        cursor: pointer;

        &.active {
          color: #00c7db;

          .icon-arrow {
            transform: translateY(-55%) rotateZ(180deg);
          }
        }

        &.selected {
          color: #00c7db;
        }

        .icon-arrow {
          position: absolute;
          right: 0;
          top: 55%;
          transform: translateY(-55%) rotateZ(0deg);
          font-size: 13px;
          transition: transform 0.1s linear;
        }
      }
    }
  }
</style>
