<template>
  <div class="yqmmpro-mining-collection">
    <MuTab :tab-list="tabList" :active-key="activeKey" @handleTabChange="handleTabChange"></MuTab>
    <div class="collection-container">
      <result-switch
        :is-search="false"
        :total="total"
        :is-time-relate-show="false"
        :columns="columns"
        @setTableHeader="setTableHeader"
        @dragTableHeaderOver="dragTableHeaderOver"
        @handleDisplayChange="e => (selectedDisplay = e)"
      >
        <template #right>
          <div
            v-if="resultOperationsRightVisible && activeKeyVisible"
            class="result-switch-slot right"
          >
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
      <template v-if="selectedDisplay == 0">
        <template v-if="loadingStatus === 3">
          <!-- 采购意向 -->
          <template v-if="activeKey == 11">
            <div class="purchase-list">
              <PurchaseCard v-for="item in cardList" :key="item.itemId" :item="item"></PurchaseCard>
            </div>
          </template>
          <!-- 重大商情 -->
          <template v-if="activeKey == 1">
            <div class="news-list">
              <NewsCard v-for="item in cardList" :key="item.objectId" :item="item"></NewsCard>
            </div>
          </template>
          <!-- 基金课题 -->
          <template v-if="activeKey == 13">
            <div class="fund-list">
              <FundCard v-for="item in cardList" :key="item.objectId" :info="item"></FundCard>
            </div>
          </template>
          <!-- 科研客户 -->
          <template v-if="activeKey == 12">
            <div class="researcher-list">
              <ResearcherCard
                v-for="item in cardList"
                :key="item.objectId"
                :item="item"
              ></ResearcherCard>
            </div>
          </template>
          <!-- 招投标 -->
          <template v-if="activeKey == 10">
            <div class="bid-list">
              <BidCard v-for="item in cardList" :key="item.objectId" :info="item"></BidCard>
            </div>
          </template>
          <MuPagination
            :page="pageNum"
            :page-size="pageSize"
            :total="total"
            :total-visible="true"
            :page-size-options="pageSizeOptions"
            @pageChange="handlePageNumChange"
            @pageSizeChange="handlePageSizeChange"
          ></MuPagination>
        </template>
      </template>
      <MuTable
        v-else
        ref="mumuTable"
        :has-index="true"
        :selections-flag="selectionsFlag"
        :selections-all-flag="selectionsAllFlag"
        :selections-toggle-flag="false"
        row-key="objectId"
        :selected-row-keys="selectedRowKeys"
        :is-loading="mixinLoding"
        :page="pageNum"
        :page-size="pageSize"
        :page-size-options="pageSizeOptions"
        :total="total"
        :total-visible="true"
        :columns="columns"
        :data-source="dataSource"
        :resize-height-offset="tableOffset + 72 + 56"
        @pageChange="handlePageNumChange"
        @pageSizeChange="handlePageSizeChange"
        @reloadTable="reloadTable"
        @handleRowClick="handleRowClick"
      >
        <!-- 依托单位 -->
        <template #memberCompanySlot="slotProps">
          <TableCompanySlot :company-list="slotProps.text.list"></TableCompanySlot>
        </template>
        <!-- 负责人 -->
        <template #userSlot="slotProps">
          <i v-if="slotProps.text.list.length === 0">-</i>
          <a-tooltip v-else>
            <template slot="title">
              <i>{{ slotProps.text.string }}</i>
            </template>
            <i
              v-for="(user, index) in slotProps.text.list"
              :key="user.memberUserId"
              :class="user.disabled ? 'disabled' : ''"
              class="action-item-user"
              @click="handleUserClick(user)"
            >
              {{ user.memberUserName }}
              <i v-if="slotProps.text.list.length > index + 1">，</i>
            </i>
          </a-tooltip>
        </template>
      </MuTable>
    </div>
    <DefaultArea
      :loading-status="loadingStatus"
      desc="暂无收藏"
      :links="tabList"
      @handleLinksClick="handleLinksClick"
    ></DefaultArea>
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
</template>

<script>
  import { mapGetters } from 'vuex'
  import {
    researcherTableListFilter,
    fundTableListFilter,
    majorTableListFilter,
    purchaseTableListFilter,
    bidTableListFilter,
    getFundColumns,
    getResearcherColumns,
    getNewsColumns,
    getBidColumns,
    getPurchaseColumns,
    getResearcherExportFilters,
    getFundExportFilters,
    getPurchaseExportFilters,
  } from '@/service/index.js'
  import { loadingMix, tableMix, exportMix } from '@/mixin/index.js'
  import { getMyCollection } from '@/api/index.js'
  import { cloneDeep } from '@/utils/index.js'
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')
  const FundDetail = () => import('@/views/yqmmpro/components/FundDetail.vue')
  const NewsDetail = () => import('@/views/yqmmpro/components/NewsDetail.vue')
  const PurchaseDetail = () => import('@/views/yqmmpro/components/PurchaseDetail.vue')
  const BidDetail = () => import('@/views/yqmmpro/components/BidDetail/index.vue')
  const ResultSwitch = () => import('@/views/yqmmpro/components/ResultSwitch.vue')
  const PurchaseCard = () => import('@/views/yqmmpro/components/PurchaseCard.vue')
  const NewsCard = () => import('@/views/yqmmpro/components/NewsCard.vue')
  const FundCard = () => import('@/views/yqmmpro/components/FundCard.vue')
  const ResearcherCard = () => import('@/views/yqmmpro/components/ResearcherCard.vue')
  const BidCard = () => import('@/views/yqmmpro/components/BidCard.vue')
  export default {
    name: 'YqmmproMiningCollection',
    components: {
      BidCard,
      NewsCard,
      PurchaseCard,
      FundCard,
      ResearcherCard,
      ResultSwitch,
    },
    mixins: [loadingMix(), tableMix, exportMix()],
    data() {
      return {
        selectionsFlag: false,
        selectionsAllFlag: false,
        tabList: [
          {
            value: 12,
            label: '科研客户',
            name: 'YqmmproCustomerResearcher',
          },
          {
            value: 13,
            label: '基金课题',
            name: 'YqmmproCustomerFund',
          },
          {
            value: 1,
            label: '重大商情',
            name: 'YqmmproProjectMajor',
          },
          {
            value: 11,
            label: '采购意向',
            name: 'YqmmproProjectPurchase',
          },
          {
            value: 10,
            label: '招投标',
            name: 'YqmmproProjectBid',
          },
        ],
        pageSizeOptions: ['20', '30', '50'],
        activeKey: 12,
        cardList: [],
        dataSource: [],
        pageNum: 1,
        pageSize: 20,
        total: 0,
        /** 展示方式 卡片-0 列表-1 */
        selectedDisplay: 0,
        columns: [],
      }
    },
    computed: {
      ...mapGetters(['tableOffset']),
      /**导出所需参数 */
      exportFilters() {
        let exportFilters = {}
        switch (this.activeKey) {
          case 12:
            exportFilters = getResearcherExportFilters()
            break
          case 13:
            exportFilters = getFundExportFilters()
            break
          case 11:
            exportFilters = getPurchaseExportFilters()
            break
          default:
            break
        }
        return exportFilters
      },
      /**可以展示操作区域的模块 */
      activeKeyVisible() {
        return [12, 13, 11].includes(this.activeKey)
      },
    },
    watch: {
      activeKey: {
        handler(val) {
          this.pageSize = 20
          this.pageSizeOptions = ['20', '30', '50']
          switch (val) {
            case 12:
              this.pageSize = 15
              this.pageSizeOptions = ['15', '30', '45']
              this.columns = getResearcherColumns({
                extend: ['mobile2', 'mobile3', 'email2', 'email3'],
              })
              this.selectionsFlag = this.selectionsAllFlag = true
              this.setExportModule(6)
              this.setExportFieldNames(
                '个人主页、姓名、性别、学校、学院、办公地址、职称、行政职务、导师级别、邮箱、座机、手机、研究方向、基金课题。'
              )
              break
            case 13:
              this.columns = getFundColumns()
              this.selectionsFlag = this.selectionsAllFlag = true
              this.setExportModule(7)
              this.setExportFieldNames(
                '名称、类型、级别、项目来源、来源城市、类别、批准号、依托单位、依托单位所属城市、负责人、科研经费、立项时间、结项时间、学科、关键词、英文关键词、中文摘要、英文摘要、结题摘要。'
              )
              break
            case 1:
              this.columns = getNewsColumns()
              this.selectionsFlag = this.selectionsAllFlag = false
              break
            case 11:
              this.columns = getPurchaseColumns()
              this.selectionsFlag = this.selectionsAllFlag = true
              this.setExportModule(8)
              this.setExportFieldNames(
                '项目名称、所属城市、采购单位、单位类型、采购品目、采购产品、预算、预计采购时间、项目概况。'
              )
              break
            case 10:
              this.columns = getBidColumns()
              this.selectionsFlag = this.selectionsAllFlag = false
              break
            default:
              break
          }
        },
        immediate: true,
      },
    },
    mounted() {
      this.activeKey = this.tabList[0].value
      this.getMyCollection()
    },
    methods: {
      async getMyCollection() {
        this.toggleMixinLoading(true)
        let params = {
          pno: this.pageNum,
          perpage: this.pageSize,
          moduleType: this.activeKey,
        }
        let res = await getMyCollection(params)
        if (res.success) {
          this.total = res.totalCount
          this.cardList = this.filterCardData(this.activeKey, res.data)
          this.dataSource = this.filterTableData(this.activeKey, cloneDeep(res.data))
        } else {
          this.total = 0
          this.clearList()
        }
        this.selectedRowKeys = []
        this.toggleMixinLoading(false)
      },
      clearList() {
        this.cardList = []
        this.dataSource = []
      },
      handleTabChange(e) {
        this.activeKey = e.value
        this.pageNum = 1
        this.clearList()
        this.$nextTick(() => {
          this.getMyCollection()
        })
      },
      /**页码变更 */
      handlePageNumChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.pageNum = page
        this.getMyCollection()
      },
      /**每页数变更 */
      handlePageSizeChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.pageNum = 1
        this.pageSize = pageSize
        this.getMyCollection()
      },
      /**处理卡片数据 */
      filterCardData(activeKey, source) {
        if (activeKey === 12) {
          // 科研客户数据格式需要单独转换
          source = source.map(item => {
            return {
              ...item,
              headerImageUrl: item.customerHeadUrl,
              isConceal: 2,
            }
          })
        }
        return source
      },
      /**处理表格数据 */
      filterTableData(activeKey, source) {
        let dataSource = []
        switch (activeKey) {
          case 12:
            dataSource = researcherTableListFilter({ list: source })
            break
          case 13:
            dataSource = fundTableListFilter({ list: source })
            break
          case 1:
            dataSource = majorTableListFilter({ list: source })
            break
          case 11:
            dataSource = purchaseTableListFilter({ list: source })
            break
          case 10:
            dataSource = bidTableListFilter({ list: source })
            break
          default:
            break
        }
        return dataSource
      },
      handleLinksClick({ name }) {
        this.$router.push({
          name,
        })
      },
      /**表格操作 */
      handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          let component, name, title, id
          if (rowData.key === 'name' && this.activeKey === 12) {
            component = ResearcherDetail
            name = 'ResearcherDetail'
            title = '科研客户详情'
            id = record.customerId
          }
          if (rowData.key === 'projectName' && this.activeKey === 13) {
            component = FundDetail
            name = 'FundDetail'
            title = '基金课题详情'
            id = record.targetId
          }
          if (rowData.key === 'title' && this.activeKey === 1) {
            component = NewsDetail
            name = 'NewsDetail'
            title = '重大商情详情'
            id = record.objectId
          }
          if (rowData.key === 'bidName' && this.activeKey === 11) {
            component = PurchaseDetail
            name = 'PurchaseDetail'
            title = '采购意向详情'
            id = record.objectId
          }
          if (rowData.key === 'title' && this.activeKey === 10) {
            component = BidDetail
            name = 'BidDetail'
            title = '标讯详情'
            id = record.objectId
          }
          this.$globalDrawer.show({
            component,
            options: {
              name,
              title,
              props: { id },
            },
          })
        }
      },
      /**点击负责人 */
      handleUserClick(user) {
        if (user.customerId) {
          this.$globalDrawer.show({
            component: ResearcherDetail,
            options: {
              name: 'ResearcherDetail',
              title: '科研客户详情',
              props: {
                id: user.customerId,
              },
            },
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-mining-collection {
    border-radius: 4px 4px 0 0;
    overflow: hidden;
    background-color: #ffffff;

    .collection-container {
      padding: 0 24px;

      .purchase-list {
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 8px));
        column-gap: 16px;
        row-gap: 8px;
      }

      .news-list {
        display: grid;
        grid-template-columns: repeat(1, 100%);
        row-gap: 16px;
      }

      .fund-list {
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 8px));
        column-gap: 16px;
        row-gap: 12px;
      }

      .researcher-list {
        display: grid;
        grid-template-columns: repeat(3, calc((100% - 16px * 2) / 3));
        column-gap: 16px;
        row-gap: 16px;
      }

      .bid-list {
        display: grid;
        grid-template-columns: repeat(1);
        row-gap: 16px;
      }
    }

    .action-item-user {
      cursor: pointer;
      color: #00c7db;

      > i {
        color: #444;
        cursor: auto;
      }

      &.disabled {
        color: #444;
        cursor: auto;
      }
    }

    /deep/ .mumuxili-table {
      .action {
        display: none;
      }
    }
  }
</style>
