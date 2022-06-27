<template>
  <div class="yqmmpro-customer-purchase-company">
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
      <template #contactType>
        <CheckArea
          ref="contactType"
          :list="contactList"
          @change="handleSPChange($event, 'contactType')"
        ></CheckArea>
      </template>
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
      <template #result>
        <ResultItem
          label="联系人"
          :value="screenResults.contactType"
          @delete="handleSPReset('contactType')"
        ></ResultItem>
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
      </template>
      >
    </ScreenPanel>
    <MuDivid></MuDivid>
    <div class="purchase-company-list-wrap">
      <result-switch
        :is-search="isSearchStatus"
        :total="total"
        :is-time-relate-show="false"
        :columns="columns"
        @setTableHeader="setTableHeader"
        @dragTableHeaderOver="dragTableHeaderOver"
        @handleDisplayChange="e => (selectedDisplay = e)"
      ></result-switch>
      <!-- 卡片 -->
      <template v-if="selectedDisplay == 0">
        <template v-if="loadingStatus === 3">
          <div class="purchase-company-list">
            <PurchaseCompanyCard
              v-for="item in cardList"
              :key="item.tokenEncodeId"
              :high-light="true"
              :info="item"
            ></PurchaseCompanyCard>
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
        row-key="companyTokenId"
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
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { loadingMix, tableMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { getPurchaseCompanyList, addYqmmSearchLog, getRemainCardTimes } from '@/api/index.js'
  import { purchaseCompanyTableListFilter, getPurchaseCompanyColumns } from '@/service/index.js'
  const PurchaseCompanyCard = () => import('@/views/yqmmpro/components/PurchaseCompanyCard.vue')
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  const YqmmproPageSearch = () => import('@/views/yqmmpro/components/PageSearch.vue')
  const ResultSwitch = () => import('@/views/yqmmpro/components/ResultSwitch.vue')
  const ScreenPanel = () => import('@/views/yqmmpro/components/ScreenPanel/index.vue')
  const DoubleFilter = () => import('@/views/yqmmpro/components/ScreenPanel/DoubleFilter.vue')
  const OnceFilter = () => import('@/views/yqmmpro/components/ScreenPanel/OnceFilter.vue')
  const CheckArea = () => import('@/views/yqmmpro/components/ScreenPanel/CheckArea.vue')
  const ResultItem = () => import('@/views/yqmmpro/components/ScreenPanel/ResultItem.vue')
  const FoldController = () => import('@/views/yqmmpro/components/ScreenPanel/FoldController.vue')
  export default {
    name: 'YqmmproCustomerPurchaseComapny',
    components: {
      PurchaseCompanyCard,
      YqmmproPageSearch,
      ResultSwitch,
      ScreenPanel,
      DoubleFilter,
      OnceFilter,
      CheckArea,
      ResultItem,
      FoldController,
    },
    mixins: [loadingMix(), tableMix],
    data() {
      return {
        isExpanded: true,
        searchType: 8,
        /**已选条件 */
        screenResults: {
          contactType: '',
          companyType: '',
          city: '',
        },
        /**卡片数据 */
        cardList: [],
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
          /**搜索类型  */
          searchType: '1',
          /**是否高亮 */
          isHighlight: 1,
          /** 联系人 */
          contactFilter: '',
          /** 单位类型 */
          companyType: '',
          /** 城市 */
          cityIds: '',
          /**排序 */
          sort: 1,
        },
        /**是否处于筛选状态 */
        isSearchStatus: false,
        /** 展示方式 卡片-0 列表-1 */
        selectedDisplay: 0,
        selectOptions: [
          {
            label: '综合搜索',
            value: '1',
          },
          {
            label: '单位名称',
            value: '2',
          },
          {
            label: '产品名称',
            value: '3',
          },
        ],
        contactList: [
          { id: 1, name: '有科研客户' },
          { id: 2, name: '有采购联系人' },
        ],
        columns: getPurchaseCompanyColumns(),
        /**权益卡基金剩余次数 */
        remainTotalTimes: 0,
        /**顶部搜索框高度 */
        yqmmPageSearchHeight: 0,
        /**筛选面板高度 */
        screenPanelHeight: 0,
      }
    },
    computed: {
      ...mapGetters(['cityDict', 'companyTypeDict', 'tableOffset']),
      // 筛选面板数据
      spLayout() {
        let spLayout = [
          [{ label: '联系人', field: 'contactType' }],
          [{ label: '单位类型', field: 'companyType' }],
          [{ label: '城市', field: 'city' }],
        ]
        return spLayout
      },
      /**已选筛选数量 */
      resultNum() {
        return Object.values(this.screenResults).filter(item => item).length
      },
      unionRequestParams() {
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
        this.$store.dispatch('dictionary/getTargetDicts', [
          'getProjectCategoryTree',
          'getProjectSubjectTree',
        ])
        this.getRemainTimes()
        this.handleQuery()
      },
      getRemainTimes() {
        getRemainCardTimes({ type: 5 }).then(({ code, data: { remainCardTimes } }) => {
          if (code === '0') {
            this.remainTotalTimes = remainCardTimes
          }
        })
      },
      async handleQuery() {
        this.toggleMixinLoading(true)
        const res = await getPurchaseCompanyList(this.unionRequestParams)
        if (res.code === '0') {
          if (this.unionRequestParams.searchKey) {
            const logRes = await addYqmmSearchLog({
              isHotSearch: !!res?.data?.list?.length,
              searchClient: 1,
              searchKey: this.unionRequestParams.searchKey,
              searchPlatform: 8,
              searchType: this.searchType,
            })
            if (logRes.code === '0') {
              this.$refs['YqmmproPageSearch'].updateSearchLog(this.searchType)
            }
          }
          if (res.data && res.data.list) {
            this.cardList = cloneDeep(res.data.list)
            this.dataSource = purchaseCompanyTableListFilter({ list: res.data.list })
            this.total = res.data && res.data.total ? res.data.total : 0
            this.setSearchStatus()
          }
        }
        this.selectedRowKeys = []
        this.toggleMixinLoading(false)
      },
      /**是否是搜索 */
      setSearchStatus() {
        this.isSearchStatus =
          !!(this.pageRequestParams.searchKey ||
          this.pageRequestParams.contactFilter ||
          this.pageRequestParams.companyType ||
          this.pageRequestParams.cityIds)
      },
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
       */
      handleSPChange(e, type) {
        // console.log(e, type)
        const { selectedKeys, selectedItems, isReset } = e
        if (isReset) {
          return
        }
        switch (type) {
          case 'contactType':
            this.pageRequestParams.contactFilter = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
            break
          case 'companyType':
            this.pageRequestParams.companyType = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
            break
          case 'city':
            this.pageRequestParams.cityIds = selectedKeys.join(',')
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
            this.$refs[attr]?.reset()
            this.screenResults[attr] = ''
          }
          this.pageRequestParams = Object.assign(this.pageRequestParams, {
            /** 联系人 */
            contactFilter: '',
            /** 单位类型 */
            companyType: '',
            /** 城市 */
            cityIds: '',
          })
        } else {
          this.screenResults[type] = ''
          //重置某一项
          switch (type) {
            case 'contactType':
              this.pageRequestParams.contactFilter = ''
              this.$refs[type].reset()
              break
            case 'companyType':
              this.pageRequestParams.companyType = ''
              this.$refs[type].reset()
              break
            case 'city':
              this.pageRequestParams.cityIds = ''
              this.$refs[type].reset()
              break
            default:
              break
          }
        }
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
      /**表格操作 */
      handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          if (rowData.key === 'companyName') {
            this.$globalDrawer.show({
              component: PurchaseCompanyDetail,
              options: {
                name: 'PurchaseCompanyDetail',
                title: '',
                props: { id: record.companyTokenId },
              },
            })
          }
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-customer-purchase-company {
    .purchase-company-list-wrap {
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

      .purchase-company-list {
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 8px));
        column-gap: 16px;
        row-gap: 12px;
      }
    }
  }
</style>
