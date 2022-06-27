<template>
  <div class="bid-subscription">
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
      <template #subscription>
        <OnceFilter
          ref="subscription"
          :list="subscriptionTypeList"
          @change="handleSPChange($event, 'subscription')"
        ></OnceFilter>
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
          label="订阅项"
          :value="screenResults.subscription"
          @delete="handleSPReset('subscription')"
        ></ResultItem>
      </template>
    </ScreenPanel>
    <MuDivid></MuDivid>
    <!-- 搜索结果 -->
    <div class="search-result">
      <result-switch
        :is-search="isSearchStatus"
        :total="total"
        :is-display-switch-show="true"
        :columns="columns"
        @setTableHeader="setTableHeader"
        @dragTableHeaderOver="dragTableHeaderOver"
        @handleDisplayChange="e => (selectedDisplay = e)"
      ></result-switch>
      <!-- 标讯搜索结果展示 -->
      <!-- 卡片 -->
      <template v-if="selectedDisplay == 0">
        <template v-if="loadingStatus === 3">
          <div class="bid-list">
            <BidCard
              v-for="item in bidList"
              :key="item.objectId"
              :deal-read="true"
              :info="item"
            ></BidCard>
            <MuPagination
              :page="commonRequestParams.pageNum"
              :page-size="commonRequestParams.pageSize"
              :total="total"
              @pageChange="handlePageNumChange"
              @pageSizeChange="handlePageSizeChange"
            ></MuPagination>
          </div>
        </template>
        <DefaultArea
          :loading-status="loadingStatus"
          :default-img="require('@/assets/images/common/list-default.svg')"
        >
          <template #desc>
            <div class="defaultarea-slot-desc">
              更多订阅内容请到
              <a-dropdown
                placement="topCenter"
                :trigger="['click']"
                overlay-class-name="bid-dropdown-menu"
              >
                <span class="mini-btn">小程序</span>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <img src="@/assets/images/common/subscription-bid-qrcode.png" alt="" />
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
              添加更多关键词~
            </div>
          </template>
        </DefaultArea>
      </template>
      <!-- 列表 -->
      <MuTable
        v-else
        ref="mumuTable"
        :has-index="true"
        :selections-flag="false"
        :selections-all-flag="false"
        :selections-toggle-flag="false"
        row-key="tokenEncodeId"
        :selected-row-keys="selectedRowKeys"
        :page="commonRequestParams.pageNum"
        :page-size="commonRequestParams.pageSize"
        :total="total"
        :columns="columns"
        :data-source="dataSource"
        :resize-height-offset="tableOffset + 72 + screenPanelHeight + 10 + 56"
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
  import { tableMix, loadingMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { getBidSubscriptionList } from '@/api/index.js'
  import { getBidColumns, bidTableListFilter } from '@/service/index.js'
  const BidDetail = () => import('@/views/yqmmpro/components/BidDetail/index.vue')
  const BidCard = () => import('@/views/yqmmpro/components/BidCard.vue')
  const ResultSwitch = () => import('@/views/yqmmpro/components/ResultSwitch.vue')
  const ScreenPanel = () => import('@/views/yqmmpro/components/ScreenPanel/index.vue')
  const DoubleFilter = () => import('@/views/yqmmpro/components/ScreenPanel/DoubleFilter.vue')
  const OnceFilter = () => import('@/views/yqmmpro/components/ScreenPanel/OnceFilter.vue')
  const ResultItem = () => import('@/views/yqmmpro/components/ScreenPanel/ResultItem.vue')
  export default {
    name: 'BidSubscription',
    components: {
      BidCard,
      ResultSwitch,
      ScreenPanel,
      DoubleFilter,
      OnceFilter,
      ResultItem,
    },
    mixins: [tableMix, loadingMix()],
    props: {
      isExpanded: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        selectedDisplay: 0,
        /**订阅项 */
        subscriptionTypeList: [],
        /**已选条件 */
        screenResults: {
          bidType: '',
          city: '',
          subscription: '',
        },
        /**表格公共入参 */
        commonRequestParams: {
          /**页码 */
          pageNum: 1,
          /**每页数 */
          pageSize: 20,
        },
        /**页面特有的列表入参 */
        pageRequestParams: {
          cityId: '',
          bidTypeId: '',
          subscriptionId: '',
        },
        /**是否处于筛选状态 */
        isSearchStatus: false,
        bidList: [],
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
        let spLayout = [[{ label: '标讯类型', field: 'bidType' }], [{ label: '城市', field: 'city' }]]
        if (this.subscriptionTypeList.length) {
          spLayout.push([{ label: '订阅项', field: 'subscription' }])
        }
        return spLayout
      },
      /**已选筛选数量 */
      resultNum() {
        const num = Object.values(this.screenResults).filter(item => item).length
        this.$emit('update:resultNum', num)
        return num
      },
      unionRequestParams() {
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.handleQuery({ init: true })
      },
      async handleQuery(opt) {
        this.toggleMixinLoading(true)
        let res = await getBidSubscriptionList(this.unionRequestParams)
        if (res.code === '0') {
          this.bidList = cloneDeep(res.data.list)
          this.dataSource = bidTableListFilter({ list: res.data.list })
          this.total = res.data.totalCount
          if (opt?.init) {
            if (res?.data?.searchList?.titleList?.length) {
              this.subscriptionTypeList = res.data.searchList.titleList.slice(0, 60).map(e => {
                return {
                  id: Object.keys(e)[0],
                  name: Object.values(e)[0],
                }
              })
            }
          }
          this.setSearchStatus()
        }
        this.toggleMixinLoading(false)
      },
      /**是否是搜索 */
      setSearchStatus() {
        this.isSearchStatus = !!(
          this.pageRequestParams.cityId ||
          this.pageRequestParams.bidTypeId ||
          this.pageRequestParams.subscriptionId
        )
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
          case 'bidType':
            this.pageRequestParams.bidTypeId = selectedKeys.join(',')
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
          case 'subscription':
            this.pageRequestParams.subscriptionId = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
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
            cityId: '',
            bidTypeId: '',
            subscriptionId: '',
          })
        } else {
          this.$refs[type].reset()
          this.screenResults[type] = ''
          //重置某一项
          switch (type) {
            case 'bidType':
              this.pageRequestParams.bidTypeId = ''
              break
            case 'city':
              this.pageRequestParams.cityId = ''
              break
            case 'subscription':
              this.pageRequestParams.subscriptionId = ''
              break
            default:
              break
          }
        }
        this.handleQuery()
      },
      /**页码变更 */
      handlePageNumChange(page, pageSize) {
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
  .bid-subscription {
    background: #ebebeb;

    .search-result {
      padding: 0 24px;
      background-color: #fff;
      border-radius: 4px;
      /deep/ .mumuxili-table {
        .action {
          display: none;
        }
      }
      .bid-list {
        .bid-panel {
          margin-bottom: 16px;
          &:nth-last-child(2) {
            margin-bottom: 0;
          }
        }
      }
      .defaultarea-slot-desc {
        .mini-btn {
          color: #00c7db;
          cursor: pointer;
        }
      }
    }
  }
</style>

<style lang="less">
  .bid-dropdown-menu {
    .ant-dropdown-menu {
      padding: 0;
      .ant-dropdown-menu-item {
        padding: 15px;
        img {
          width: 150px;
          height: 150px;
        }
      }
    }
  }
</style>
