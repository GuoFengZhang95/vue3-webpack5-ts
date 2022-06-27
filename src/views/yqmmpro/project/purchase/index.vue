<template>
  <div class="yqmmpro-project-purchase">
    <YqmmproPageSearch
      ref="YqmmproPageSearch"
      :options="selectOptions"
      :value.sync="pageRequestParams.searchKey"
      :range.sync="pageRequestParams.searchType"
      :height.sync="yqmmPageSearchHeight"
      :search-type="searchType"
      @confirm="onSearchConfirm"
    >
      <template #right>
        <FoldController :result-num="resultNum" :is-expanded.sync="isExpanded"></FoldController>
      </template>
    </YqmmproPageSearch>
    <ScreenPanel
      :layout="spLayout"
      :result-num="resultNum"
      :is-expanded="isExpanded"
      :height.sync="screenPanelHeight"
      @reset="handleSPReset"
    >
      <template #companyType>
        <OnceFilter
          ref="companyType"
          :list="companyTypeDict"
          @change="handleSPChange($event, 'companyType')"
        ></OnceFilter>
      </template>
      <template #city>
        <DoubleFilter
          ref="city"
          :list="cityDict"
          @change="handleSPChange($event, 'city')"
        ></DoubleFilter>
      </template>
      <template #purchaseTime>
        <DateRange
          ref="purchaseTime"
          :mode="['month', 'month']"
          format="YYYY-MM"
          @change="handleSPChange($event, 'purchaseTime')"
        ></DateRange>
      </template>
      <template #result>
        <ResultItem
          label="单位类型"
          :value="screenResults.companyType"
          @delete="handleSPReset('companyType')"
        ></ResultItem>
        <ResultItem
          label="城市"
          :value="screenResults.city"
          @delete="handleSPReset('city')"
        ></ResultItem>
        <ResultItem
          label="预计采购时间"
          :value="screenResults.purchaseTime"
          @delete="handleSPReset('purchaseTime')"
        ></ResultItem>
      </template>
      >
    </ScreenPanel>
    <MuDivid></MuDivid>
    <div class="purchase-list-wrap">
      <result-switch
        :is-search="isSearchStatus"
        :total="total"
        :is-time-relate-show="true"
        :selected-sort="pageRequestParams.sort"
        :sort-key="{ relate: 0, time: 1 }"
        :columns="columns"
        @setTableHeader="setTableHeader"
        @dragTableHeaderOver="dragTableHeaderOver"
        @handleSortChange="handleSortChange"
        @handleDisplayChange="e => (selectedDisplay = e)"
      >
        <template #right>
          <div v-if="resultOperationsRightVisible" class="result-switch-slot right">
            <ExportButton
              v-if="resultOperationsVisible"
              :loading="exportLoading"
              :type="1"
              @click.native="beforeExport"
            ></ExportButton>
            <ExportButton :type="2"></ExportButton>
          </div>
        </template>
      </result-switch>
      <!-- 卡片 -->
      <template v-if="selectedDisplay == 0">
        <template v-if="loadingStatus === 3">
          <div class="purchase-list">
            <PurchaseCard
              v-for="item in purchaseList"
              :key="item.tokenEncodeId"
              :item="item"
            ></PurchaseCard>
          </div>
          <MuPagination
            v-if="showPagination"
            :page="commonRequestParams.pageNum"
            :page-size="commonRequestParams.pageSize"
            :total="total"
            @pageChange="handlePageNumChange"
            @pageSizeChange="handlePageSizeChange"
          ></MuPagination>
        </template>
        <DefaultArea :loading-status="loadingStatus"></DefaultArea>
      </template>
      <!-- 列表 -->
      <MuTable
        v-else
        ref="mumuTable"
        :has-index="true"
        :selections-flag="true"
        :selections-all-flag="true"
        :selections-toggle-flag="false"
        row-key="tokenEncodeId"
        :selected-row-keys="selectedRowKeys"
        :is-loading="mixinLoding"
        :page="commonRequestParams.pageNum"
        :page-size="commonRequestParams.pageSize"
        :total="total"
        :total-visible="false"
        :columns="columns"
        :data-source="dataSource"
        :resize-height-offset="tableOffset + yqmmPageSearchHeight + screenPanelHeight + 10 + 56"
        :pagination-flag="showPagination"
        @pageChange="handlePageNumChange"
        @pageSizeChange="handlePageSizeChange"
        @reloadTable="reloadTable"
        @handleRowClick="handleRowClick"
      ></MuTable>
      <EquityPaginationMask v-if="!showPagination && loadingStatus === 3"></EquityPaginationMask>
      <ExportModal
        :visible.sync="exportVisible"
        :step="exportStep"
        :selected-num="selectedNum"
        :consume-quota="exportConsumeQuota"
        :reduce-quota="exportReduceQuota"
        :remain-times="exportRemainTimes"
        :field-names="exportFieldNames"
        :loading="exportLoading"
        @export="handleExport"
        @continueExport="handleContinueExport"
      ></ExportModal>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { tableMix, loadingMix, exportMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { addYqmmSearchLog, getPurchaseList, getRemainCardTimes } from '@/api/index.js'
  import {
    getPurchaseColumns,
    getPurchaseExportFilters,
    purchaseTableListFilter,
  } from '@/service/index.js'
  const PurchaseCard = () => import('@/views/yqmmpro/components/PurchaseCard.vue')
  const PurchaseDetail = () => import('@/views/yqmmpro/components/PurchaseDetail.vue')
  const YqmmproPageSearch = () => import('@/views/yqmmpro/components/PageSearch.vue')
  const ResultSwitch = () => import('@/views/yqmmpro/components/ResultSwitch.vue')
  const ScreenPanel = () => import('@/views/yqmmpro/components/ScreenPanel/index.vue')
  const DoubleFilter = () => import('@/views/yqmmpro/components/ScreenPanel/DoubleFilter.vue')
  const OnceFilter = () => import('@/views/yqmmpro/components/ScreenPanel/OnceFilter.vue')
  const DateRange = () => import('@/views/yqmmpro/components/ScreenPanel/DateRange.vue')
  const ResultItem = () => import('@/views/yqmmpro/components/ScreenPanel/ResultItem.vue')
  const FoldController = () => import('@/views/yqmmpro/components/ScreenPanel/FoldController.vue')
  export default {
    name: 'YqmmproProjectPurchase',
    components: {
      PurchaseCard,
      YqmmproPageSearch,
      ResultSwitch,
      ScreenPanel,
      DoubleFilter,
      OnceFilter,
      DateRange,
      ResultItem,
      FoldController,
    },
    mixins: [
      tableMix,
      loadingMix(),
      exportMix({
        exportModule: 3,
        exportFieldNames:
          '项目名称、所属城市、采购单位、单位类型、采购品目、采购产品、预算、预计采购时间、项目概况。',
      }),
    ],
    data() {
      return {
        isExpanded: true,
        searchType: 7,
        /**已选条件 */
        screenResults: {
          companyType: '',
          city: '',
          purchaseTime: '',
        },
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
        /**卡片数据 */
        purchaseList: [],
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
          /**单位类型id */
          companyTypeIds: '',
          /**是否高亮 */
          isHighlight: 1,
          /**是否需要置顶 */
          isNeedTop: 1,
          /**0-相关度 1-发布时间倒叙 */
          sort: 1,
          /**城市id */
          cityId: '',
          /**最小采购预算*/
          minPurchaseBudget: 0,
          /**最大采购预算*/
          maxPurchaseBudget: 0,
          /**最小采购日期 */
          minPurchaseDate: '',
          /**最大采购日期 */
          maxPurchaseDate: '',
          /**采购品目id */
          purchaseItemIds: '',
        },
        /**是否处于筛选状态 */
        isSearchStatus: false,
        /** 展示方式 卡片-0 列表-1 */
        selectedDisplay: 0,
        columns: getPurchaseColumns(),
        /**权益卡采购意向剩余次数 */
        remainTotalTimes: 0,
        /**顶部搜索框高度 */
        yqmmPageSearchHeight: 0,
        /**筛选面板高度 */
        screenPanelHeight: 0,
      }
    },
    computed: {
      ...mapGetters(['companyTypeDict', 'cityDict', 'tableOffset']),
      // 筛选面板数据
      spLayout() {
        let spLayout = [
          [{ label: '单位类型', field: 'companyType' }],
          [{ label: '城市', field: 'city' }],
          [{ label: '预计采购时间', field: 'purchaseTime' }],
        ]
        return spLayout
      },
      /**已选筛选数量 */
      resultNum() {
        return Object.values(this.screenResults).filter(item => item).length
      },
      unionRequestParams() {
        this.pageRequestParams.isNeedTop = this.pageRequestParams.searchKey ? 0 : 1
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
      /**是否展示分页（当前模块是否有额度） */
      showPagination() {
        return this.remainTotalTimes > 0 || this.remainTotalTimes === -1
      },
      /**导出所需参数 */
      exportFilters() {
        return Object.assign({}, getPurchaseExportFilters(), {
          searchKey: this.pageRequestParams.searchKey,
          /**关键词范围 */
          searchType: this.pageRequestParams.searchType,
          searchTypeName: this.selectOptions.find(
            item => item.value === this.pageRequestParams.searchType
          ).label,
          sort: this.pageRequestParams.sort,
          /**是否置顶 */
          isNeedTop: this.pageRequestParams.isNeedTop,
          /**城市 */
          cityId: this.pageRequestParams.cityId,
          cityIdName: this.screenResults.city,
          /**单位类型 */
          companyTypeIds: this.pageRequestParams.companyTypeIds,
          companyTypeIdsName: this.screenResults.companyType,
          /**预计采购时间 */
          bidPurchaseDate: '',
          minPurchaseDate: this.pageRequestParams.minPurchaseDate,
          maxPurchaseDate: this.pageRequestParams.maxPurchaseDate,
        })
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
            this.setSearchStatus()
          }
        }
        this.selectedRowKeys = []
        this.toggleMixinLoading(false)
      },
      /**是否是搜索 */
      setSearchStatus() {
        this.isSearchStatus = !!(
          this.pageRequestParams.searchKey ||
          this.pageRequestParams.companyTypeIds ||
          this.pageRequestParams.cityId ||
          this.pageRequestParams.minPurchaseDate ||
          this.pageRequestParams.maxPurchaseDate
        )
      },
      /**执行顶部搜索*/
      onSearchConfirm() {
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = 20
        this.handleQuery()
      },
      /**
       * @description 更新筛选组件值
       * @param {object} e
       * @param {array} e.selectedItems
       * @param {array} e.selectedKeys
       * @param {boolean} e.isReset
       */
      handleSPChange(e, type) {
        // console.log(e, type)
        const { selectedKeys, selectedItems, isReset } = e
        if (isReset) return
        switch (type) {
          case 'companyType':
            this.pageRequestParams.companyTypeIds = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
            break
          case 'city':
            this.pageRequestParams.cityId = selectedKeys.join(',')
            this.screenResults[type] = selectedItems
              .map(item => {
                if (item.check) {
                  return item.name
                } else {
                  return item.children.map(d => d.name).join(',')
                }
              })
              .join(',')
            break
          case 'purchaseTime':
            this.pageRequestParams.minPurchaseDate = selectedKeys[0]
            this.pageRequestParams.maxPurchaseDate = selectedKeys[1]
            this.screenResults[type] = selectedKeys.join(' 至 ')
            break
          default:
            break
        }
        this.commonRequestParams.pageNum = 1
        this.handleQuery()
      },
      /** 重置筛选面板 */
      handleSPReset(type) {
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = 20
        if (!type) {
          // 重置所有
          for (let attr in this.screenResults) {
            this.$refs[attr].reset()
            this.screenResults[attr] = ''
          }
          this.pageRequestParams = Object.assign(this.pageRequestParams, {
            /**城市id */
            cityId: '',
            /**单位类型id */
            companyTypeIds: '',
            /**最小采购日期 */
            minPurchaseDate: '',
            /**最大采购日期 */
            maxPurchaseDate: '',
          })
        } else {
          this.$refs[type].reset()
          this.screenResults[type] = ''
          //重置某一项
          switch (type) {
            case 'companyType':
              this.pageRequestParams.companyTypeIds = ''
              break
            case 'city':
              this.pageRequestParams.cityId = ''
              break
            case 'purchaseTime':
              this.pageRequestParams.minPurchaseDate = ''
              this.pageRequestParams.maxPurchaseDate = ''

              break
            default:
              break
          }
        }
        this.handleQuery()
      },
      /**时间相关性排序 */
      handleSortChange(key) {
        this.pageRequestParams.sort = key
        this.commonRequestParams.pageNum = 1
        this.handleQuery()
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
    padding: 0 24px;
    background-color: #fff;
    border-radius: 4px 4px 0 0;

    /deep/.pagition-act {
      > span {
        display: none;
      }
    }
    /deep/ .mumuxili-table {
      .action {
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
