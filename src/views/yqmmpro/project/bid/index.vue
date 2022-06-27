<template>
  <div class="yqmmpro-project-bid">
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
      <template #bidType>
        <DoubleFilter
          ref="bidType"
          :list="bidTypeDict"
          @change="handleSPChange($event, 'bidType')"
        ></DoubleFilter>
      </template>
      <template #city>
        <DoubleFilter
          ref="city"
          :list="cityDict"
          @change="handleSPChange($event, 'city')"
        ></DoubleFilter>
      </template>
      <template #publishTime>
        <DateRange
          ref="customPublishTime"
          label="自定义"
          @change="handleSPChange($event, 'publishTime')"
        >
          <template #left>
            <OnceFilter
              ref="defaultPublishTime"
              :list="defaultPublishTime"
              :multiple="false"
              @change="handleDefaultTimeChange($event, 'publishTime')"
            ></OnceFilter>
          </template>
        </DateRange>
      </template>
      <template #result>
        <ResultItem
          label="标讯类型"
          :value="screenResults.bidType"
          @delete="handleSPReset('bidType')"
        ></ResultItem>
        <ResultItem
          label="城市"
          :value="screenResults.city"
          @delete="handleSPReset('city')"
        ></ResultItem>
        <ResultItem
          label="发布时间"
          :value="screenResults.publishTime"
          @delete="handleSPReset('publishTime')"
        ></ResultItem>
      </template>
      >
    </ScreenPanel>
    <MuDivid></MuDivid>
    <div class="bid-list-wrap">
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
      ></result-switch>
      <!-- 卡片 -->
      <template v-if="selectedDisplay == 0">
        <template v-if="loadingStatus === 3">
          <div class="bid-list">
            <BidCard v-for="item in bidList" :key="item.tokenEncodeId" :info="item"></BidCard>
          </div>
          <MuPagination
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
        :is-loading="mixinLoding"
        :page="commonRequestParams.pageNum"
        :page-size="commonRequestParams.pageSize"
        :total="total"
        :total-visible="false"
        :columns="columns"
        :data-source="dataSource"
        :resize-height-offset="tableOffset + yqmmPageSearchHeight + screenPanelHeight + 10 + 56"
        @pageChange="handlePageNumChange"
        @pageSizeChange="handlePageSizeChange"
        @reloadTable="reloadTable"
        @handleRowClick="handleRowClick"
      ></MuTable>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { loadingMix, tableMix } from '@/mixin/index'
  import { cloneDeep, filterRecentDate } from '@/utils/index'
  import { getBidList, addYqmmSearchLog } from '@/api/index.js'
  import { bidTableListFilter, getBidColumns } from '@/service/index.js'
  const BidCard = () => import('@/views/yqmmpro/components/BidCard.vue')
  const BidDetail = () => import('@/views/yqmmpro/components/BidDetail/index.vue')
  const YqmmproPageSearch = () => import('@/views/yqmmpro/components/PageSearch.vue')
  const ResultSwitch = () => import('@/views/yqmmpro/components/ResultSwitch.vue')
  const ScreenPanel = () => import('@/views/yqmmpro/components/ScreenPanel/index.vue')
  const DoubleFilter = () => import('@/views/yqmmpro/components/ScreenPanel/DoubleFilter.vue')
  const OnceFilter = () => import('@/views/yqmmpro/components/ScreenPanel/OnceFilter.vue')
  const DateRange = () => import('@/views/yqmmpro/components/ScreenPanel/DateRange.vue')
  const ResultItem = () => import('@/views/yqmmpro/components/ScreenPanel/ResultItem.vue')
  const FoldController = () => import('@/views/yqmmpro/components/ScreenPanel/FoldController.vue')
  export default {
    name: 'YqmmproProjectBid',
    components: {
      BidCard,
      YqmmproPageSearch,
      ResultSwitch,
      ScreenPanel,
      DoubleFilter,
      OnceFilter,
      DateRange,
      ResultItem,
      FoldController,
    },
    mixins: [loadingMix(), tableMix],
    data() {
      return {
        isExpanded: true,
        searchType: 2,
        /**已选条件 */
        screenResults: {
          bidType: '',
          city: '',
          publishTime: '',
        },
        /**卡片数据 */
        bidList: [],
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
          /**排除关键词 */
          excludeKeyword: '',
          /**对应模块 1招标明细 */
          module: '',
          /**标讯分类id */
          typeId: '',
          /**城市id */
          cityId: '',
          /**省id */
          provinceId: '',
          /**单位类型id */
          companyId: '',
          /**是否高亮 */
          isHighlight: 1,
          /**是否需要置顶 */
          isNeedTop: 1,
          /**最小发布时间 */
          minPublishTime: '',
          /**最大发布时间 */
          maxPublishTime: '',
          /**0-相关度 1-发布时间倒叙 */
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
            label: '标题搜索',
            value: '4',
          },
          {
            label: '采购单位',
            value: '2',
          },
        ],
        columns: getBidColumns(),
        /**顶部搜索框高度 */
        yqmmPageSearchHeight: 0,
        /**筛选面板高度 */
        screenPanelHeight: 0,
      }
    },
    computed: {
      ...mapGetters(['bidTypeDict', 'cityDict', 'tableOffset']),
      // 筛选面板数据
      spLayout() {
        let spLayout = [
          [{ label: '标讯类型', field: 'bidType' }],
          [{ label: '城市', field: 'city' }],
          [{ label: '发布时间', field: 'publishTime' }],
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
      currentDate() {
        return filterRecentDate({ days: 0 })
      },
      defaultPublishTime() {
        return [
          { id: `${filterRecentDate({ days: 3 })}`, name: '近3天' },
          { id: filterRecentDate({ days: 7 }), name: '近7天' },
          { id: filterRecentDate({ days: 30 }), name: '近1个月' },
          { id: filterRecentDate({ days: 90 }), name: '近3个月' },
          { id: filterRecentDate({ days: 365 }), name: '近1年' },
        ]
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
            this.setSearchStatus()
          }
        }
        this.toggleMixinLoading(false)
      },
      /**是否是搜索 */
      setSearchStatus() {
        this.isSearchStatus = !!(
          this.pageRequestParams.searchKey ||
          this.pageRequestParams.cityId ||
          this.pageRequestParams.typeId ||
          this.pageRequestParams.minPublishTime ||
          this.pageRequestParams.maxPublishTime
        )
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
        const { selectedKeys, selectedItems, isReset } = e
        const ids = []
        if (isReset) return
        switch (type) {
          case 'bidType':
            if (selectedItems && selectedItems.length && selectedItems[0].children) {
              selectedItems.forEach(item => {
                item.children.forEach(e => {
                  ids.push(e.id)
                })
              })
            }
            this.pageRequestParams.typeId = ids.join(',')
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
          case 'publishTime':
            this.pageRequestParams.minPublishTime = selectedKeys[0]
            this.pageRequestParams.maxPublishTime = selectedKeys[1]
            this.screenResults[type] = selectedKeys.join(' 至 ')
            this.$refs['defaultPublishTime'].reset()
            break
          default:
            break
        }
        this.commonRequestParams.pageNum = 1
        this.handleQuery()
      },
      /**默认时间变化 */
      handleDefaultTimeChange(e, type) {
        const { selectedKeys, isReset } = e
        if (isReset) return
        switch (type) {
          case 'publishTime':
            if (!selectedKeys[0]) {
              this.pageRequestParams.minPublishTime = ''
              this.pageRequestParams.maxPublishTime = ''
              this.screenResults[type] = ''
            } else {
              this.pageRequestParams.minPublishTime = selectedKeys[0]
              this.pageRequestParams.maxPublishTime = this.currentDate
              this.screenResults[type] = `${selectedKeys[0]} 至 ${this.currentDate}`
            }
            this.$refs['customPublishTime'].reset()
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
            if (attr === 'publishTime') {
              this.$refs['defaultPublishTime'].reset()
              this.$refs['customPublishTime'].reset()
            } else {
              this.$refs[attr].reset()
            }
            this.screenResults[attr] = ''
          }
          this.pageRequestParams = Object.assign(this.pageRequestParams, {
            /**标讯分类id */
            typeId: '',
            /**城市id */
            cityId: '',
            /**最小发布时间 */
            minPublishTime: '',
            /**最大发布时间 */
            maxPublishTime: '',
          })
        } else {
          this.screenResults[type] = ''
          //重置某一项
          switch (type) {
            case 'bidType':
              this.pageRequestParams.typeId = ''
              this.$refs[type].reset()
              break
            case 'city':
              this.pageRequestParams.cityId = ''
              this.$refs[type].reset()
              break
            case 'publishTime':
              this.pageRequestParams.minPublishTime = ''
              this.pageRequestParams.maxPublishTime = ''
              this.$refs['defaultPublishTime'].reset()
              this.$refs['customPublishTime'].reset()
              break
            default:
              break
          }
        }
        this.handleQuery()
      },
      // 时间相关性排序
      handleSortChange(key) {
        this.pageRequestParams.sort = key
        this.commonRequestParams.pageNum = 1
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

    .bid-list {
      display: grid;
      grid-template-columns: repeat(1);
      row-gap: 16px;
    }
  }
</style>
