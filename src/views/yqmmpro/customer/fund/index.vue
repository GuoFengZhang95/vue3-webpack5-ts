<template>
  <div class="yqmmpro-customer-fund">
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
      <template #subject>
        <a-popover
          placement="bottomLeft"
          :get-popup-container="triggerNode => triggerNode.parentNode"
          :visible="subjectVisible"
        >
          <template slot="content">
            <CardExtendTree
              ref="subject"
              :column="subjectList"
              @change="handleSPChange($event, 'subject')"
              @close="subjectVisible = false"
            ></CardExtendTree>
          </template>
          <div
            class="subject-slot"
            :class="{ active: subjectVisible, selected: isSubjectSelected }"
            @click.stop="
              subjectVisible = !subjectVisible
              levelVisible = false
            "
          >
            <span>{{ screenSubjectName }}</span>
            <i class="mmxlicon mi-arrow-down icon-arrow"></i>
          </div>
        </a-popover>
      </template>
      <template #level>
        <a-popover
          placement="bottomLeft"
          :get-popup-container="triggerNode => triggerNode.parentNode"
          :visible="levelVisible"
        >
          <template slot="content">
            <CardExtendTree
              ref="level"
              :column="levelList"
              @change="handleSPChange($event, 'level')"
              @close="levelVisible = false"
            ></CardExtendTree>
          </template>
          <div
            class="level-slot"
            :class="{ active: levelVisible, selected: isLevelSelected }"
            @click.stop="
              levelVisible = !levelVisible
              subjectVisible = false
            "
          >
            <span>{{ screenLevelName }}</span>
            <i class="mmxlicon mi-arrow-down icon-arrow"></i>
          </div>
        </a-popover>
      </template>
      <template #city>
        <DoubleFilter
          ref="city"
          :list="cityDict"
          @change="handleSPChange($event, 'city')"
        ></DoubleFilter>
      </template>
      <template #funds>
        <TextRange
          ref="customFunds"
          :units="{ l: '万', r: '万' }"
          :placeholders="{ l: '最低', r: '最高' }"
          label="自定义"
          @change="handleSPChange($event, 'funds', '123')"
        >
          <template #left>
            <OnceFilter
              ref="defaultFunds"
              :list="fundsList"
              :multiple="false"
              @change="handleDefaultFundsChange($event, 'funds')"
            ></OnceFilter>
          </template>
        </TextRange>
      </template>
      <template #startTime>
        <DateRange
          ref="customStartTime"
          :mode="['month', 'month']"
          format="YYYY-MM"
          label="自定义"
          @change="handleSPChange($event, 'startTime')"
        >
          <template #left>
            <OnceFilter
              ref="defaultStartTime"
              :list="defaultStartTimeList"
              :multiple="false"
              @change="handleDefaultTimeChange($event, 'startTime')"
            ></OnceFilter>
          </template>
        </DateRange>
      </template>
      <template #endTime>
        <DateRange
          ref="customEndTime"
          :mode="['month', 'month']"
          format="YYYY-MM"
          label="自定义"
          @change="handleSPChange($event, 'endTime')"
        >
          <template #left>
            <OnceFilter
              ref="defaultEndTime"
              :list="defaultEndTimeList"
              :multiple="false"
              @change="handleDefaultTimeChange($event, 'endTime')"
            ></OnceFilter>
          </template>
        </DateRange>
      </template>
      <template #result>
        <ResultItem
          label="学科"
          :value="screenResults.subject"
          @delete="handleSPReset('subject')"
        ></ResultItem>
        <ResultItem
          label="级别-来源-类别"
          :value="screenResults.level"
          @delete="handleSPReset('level')"
        ></ResultItem>
        <ResultItem
          label="科研经费"
          :value="screenResults.funds"
          @delete="handleSPReset('funds')"
        ></ResultItem>
        <ResultItem
          label="城市"
          :value="screenResults.city"
          @delete="handleSPReset('city')"
        ></ResultItem>
        <ResultItem
          label="立项时间"
          :value="screenResults.startTime"
          @delete="handleSPReset('startTime')"
        ></ResultItem>
        <ResultItem
          label="结项时间"
          :value="screenResults.endTime"
          @delete="handleSPReset('endTime')"
        ></ResultItem>
      </template>
      >
    </ScreenPanel>
    <MuDivid></MuDivid>
    <div class="fund-list-wrap">
      <result-switch
        :is-search="isSearchStatus"
        :total="total"
        :is-time-relate-show="true"
        :selected-sort="pageRequestParams.sort"
        :sort-key="{ relate: 8, time: 2 }"
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
          <div class="fund-list">
            <FundCard
              v-for="item in cardList"
              :key="item.tokenEncodeId"
              :high-light="true"
              :info="item"
            ></FundCard>
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
        row-key="targetId"
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
  import { loadingMix, tableMix, exportMix } from '@/mixin/index'
  import { cloneDeep, filterRecentDate } from '@/utils/index'
  import { getFundList, addYqmmSearchLog, getRemainCardTimes } from '@/api/index.js'
  import { getFundExportFilters, fundTableListFilter, getFundColumns } from '@/service/index.js'
  const FundCard = () => import('@/views/yqmmpro/components/FundCard.vue')
  const FundDetail = () => import('@/views/yqmmpro/components/FundDetail.vue')
  const YqmmproPageSearch = () => import('@/views/yqmmpro/components/PageSearch.vue')
  const ResultSwitch = () => import('@/views/yqmmpro/components/ResultSwitch.vue')
  const ScreenPanel = () => import('@/views/yqmmpro/components/ScreenPanel/index.vue')
  const DoubleFilter = () => import('@/views/yqmmpro/components/ScreenPanel/DoubleFilter.vue')
  const OnceFilter = () => import('@/views/yqmmpro/components/ScreenPanel/OnceFilter.vue')
  const DateRange = () => import('@/views/yqmmpro/components/ScreenPanel/DateRange.vue')
  const TextRange = () => import('@/views/yqmmpro/components/ScreenPanel/TextRange.vue')
  const ResultItem = () => import('@/views/yqmmpro/components/ScreenPanel/ResultItem.vue')
  const FoldController = () => import('@/views/yqmmpro/components/ScreenPanel/FoldController.vue')
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')
  const CardExtendTree = () =>
    import('@/views/yqmmpro/components/ScreenPanel/CardExtendTreeFilter.vue')
  const TableCompanySlot = () => import('@/views/yqmmpro/components/TableSlot/CompanySlot.vue')
  const fundsMap = new Map([
    [1, ['0', '10']],
    [2, ['10', '50']],
    [3, ['50', '100']],
    [4, ['100', '']],
  ])
  export default {
    name: 'YqmmproCustomerFund',
    components: {
      FundCard,
      YqmmproPageSearch,
      ResultSwitch,
      ScreenPanel,
      DoubleFilter,
      OnceFilter,
      DateRange,
      TextRange,
      ResultItem,
      FoldController,
      CardExtendTree,
      TableCompanySlot,
    },
    mixins: [
      loadingMix(),
      tableMix,
      exportMix({
        exportModule: 2,
        exportFieldNames:
          '名称、类型、级别、项目来源、来源城市、类别、批准号、依托单位、依托单位所属城市、负责人、科研经费、立项时间、结项时间、学科、关键词、英文关键词、中文摘要、英文摘要、结题摘要。',
      }),
    ],
    data() {
      return {
        subjectVisible: false,
        levelVisible: false,
        isExpanded: true,
        searchType: 11,
        /**已选条件 */
        screenResults: {
          subject: '',
          level: '',
          city: '',
          funds: '',
          startTime: '',
          endTime: '',
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
          searchType: '0',
          /**是否高亮 */
          isHighlight: 1,
          /**学科id */
          projectSubject: '',
          /**项目类别id */
          projectCategory: '',
          /**最小科研经费 */
          minProjectFunds: '',
          /**最大科研经费 */
          maxProjectFunds: '',
          /**所属城市 */
          projectCity: '',
          /**立项开始时间 */
          minStartTime: '',
          /**立项结束时间 */
          maxStartTime: '',
          /**结项开始时间 */
          minEndTime: '',
          /**结项结束时间 */
          maxEndTime: '',
          /**排序 */
          sort: 2,
        },
        /**是否处于筛选状态 */
        isSearchStatus: false,
        /** 展示方式 卡片-0 列表-1 */
        selectedDisplay: 0,
        selectOptions: [
          {
            label: '综合搜索',
            value: '0',
          },
          {
            label: '名称',
            value: '1',
          },
          {
            label: '负责人',
            value: '3',
          },
          {
            label: '依托单位',
            value: '4',
          },
        ],
        columns: getFundColumns(),
        defaultStartTimeList: [
          { id: filterRecentDate({ days: 30, format: 'YYYY-MM' }), name: '近1个月' },
          { id: filterRecentDate({ days: 90, format: 'YYYY-MM' }), name: '近3个月' },
          { id: filterRecentDate({ days: 365, format: 'YYYY-MM' }), name: '近1年' },
        ],
        defaultEndTimeList: [
          { id: 'allNotEnd', name: '全部未结项' },
          {
            id: filterRecentDate({ days: 30, format: 'YYYY-MM', direction: 'next' }),
            name: '近1个月',
          },
          {
            id: filterRecentDate({ days: 90, format: 'YYYY-MM', direction: 'next' }),
            name: '近3个月',
          },
          {
            id: filterRecentDate({ days: 365, format: 'YYYY-MM', direction: 'next' }),
            name: '近1年',
          },
        ],
        fundsList: [
          { id: 1, name: '10万以内' },
          { id: 2, name: '10-50万' },
          { id: 3, name: '50-100万' },
          { id: 4, name: '100万以上' },
        ],
        /**权益卡基金剩余次数 */
        remainTotalTimes: 0,
        /**顶部搜索框高度 */
        yqmmPageSearchHeight: 0,
        /**筛选面板高度 */
        screenPanelHeight: 0,
      }
    },
    computed: {
      ...mapGetters(['cityDict', 'tableOffset', 'projectCategoryTreeDict', 'projectSubjectTreeDict']),
      // 筛选面板数据
      spLayout() {
        let spLayout = [
          [
            { label: '学科', field: 'subject' },
            { label: '级别-来源-类别', field: 'level' },
          ],
          [{ label: '科研经费', field: 'funds' }],
          [{ label: '城市', field: 'city' }],
          [{ label: '立项时间', field: 'startTime' }],
          [{ label: '结项时间', field: 'endTime' }],
        ]
        return spLayout
      },
      subjectList() {
        return { checkOpts: this.projectSubjectTreeDict }
      },
      levelList() {
        return { checkOpts: this.projectCategoryTreeDict }
      },
      /**已选筛选数量 */
      resultNum() {
        return Object.values(this.screenResults).filter(item => item).length
      },
      unionRequestParams() {
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
      currentDate() {
        return filterRecentDate({ days: 0, format: 'YYYY-MM', direction: 'next' })
      },
      isSubjectSelected() {
        return !!this.pageRequestParams.projectSubject
      },
      isLevelSelected() {
        return !!this.pageRequestParams.projectCategory
      },
      /**是否展示分页（当前模块是否有额度） */
      showPagination() {
        return this.remainTotalTimes > 0 || this.remainTotalTimes === -1
      },
      /**筛选中的学科展示的文字 */
      screenSubjectName() {
        let text = '学科'
        let num = this.screenResults.subject.split(',').filter(item => item).length
        if (num > 0) {
          text = `已选${num}项`
        }
        return text
      },
      /**筛选中的学科展示的文字 */
      screenLevelName() {
        let text = '级别-来源-类别'
        let num = this.screenResults.level.split(',').filter(item => item).length
        if (num > 0) {
          text = `已选${num}项`
        }
        return text
      },
      /**导出所需参数 */
      exportFilters() {
        return Object.assign({}, getFundExportFilters(), {
          /**关键词 */
          searchKey: this.pageRequestParams.searchKey,
          /**关键词范围 */
          searchType: this.pageRequestParams.searchType,
          searchTypeName: this.selectOptions.find(
            item => item.value === this.pageRequestParams.searchType
          ).label,
          sort: this.pageRequestParams.sort,
          /**学科 */
          projectSubject: this.pageRequestParams.projectSubject,
          projectSubjectName: this.screenResults.subject,
          /**级别 */
          projectCategory: this.pageRequestParams.projectCategory,
          projectCategoryName: this.screenResults.level,
          /**依托单位所属城市 */
          projectCity: this.pageRequestParams.projectCity,
          projectCityName: this.screenResults.city,
          /**科研经费 */
          minProjectFunds: this.pageRequestParams.minProjectFunds,
          maxProjectFunds: this.pageRequestParams.maxProjectFunds,
          projectFundsName: this.screenResults.funds,
          // /**立项时间 */
          startTime: '',
          minStartTime: this.pageRequestParams.minStartTime,
          maxStartTime: this.pageRequestParams.maxStartTime,
          /**结项时间 */
          endTime: '',
          minEndTime: this.pageRequestParams.minEndTime,
          maxEndTime: this.pageRequestParams.maxEndTime,
        })
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
        getRemainCardTimes({ type: 7 }).then(({ code, data: { remainCardTimes } }) => {
          if (code === '0') {
            this.remainTotalTimes = remainCardTimes
          }
        })
      },
      async handleQuery() {
        this.toggleMixinLoading(true)
        const res = await getFundList(this.unionRequestParams)
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
            this.dataSource = fundTableListFilter({ list: res.data.list })
            this.total = res.data && res.data.total ? res.data.total : 0
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
          this.pageRequestParams.projectSubject ||
          this.pageRequestParams.projectCategory ||
          this.pageRequestParams.minProjectFunds ||
          this.pageRequestParams.maxProjectFunds ||
          this.pageRequestParams.projectCity ||
          this.pageRequestParams.minStartTime ||
          this.pageRequestParams.maxStartTime ||
          this.pageRequestParams.minEndTime ||
          this.pageRequestParams.maxEndTime
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
        // console.log(e, type)
        const { selectedKeys, selectedItems, isReset } = e
        if (isReset) {
          // type === 'funds'
          // this.screenResults[type] = ''
          return
        }
        switch (type) {
          case 'subject':
            this.pageRequestParams.projectSubject = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
            break
          case 'level':
            this.pageRequestParams.projectCategory = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
            break
          case 'funds':
            this.pageRequestParams.minProjectFunds = String(Number(selectedKeys[0]))
            this.pageRequestParams.maxProjectFunds = String(Number(selectedKeys[1]))
            this.screenResults[type] = selectedKeys.join(' 至 ') + '万'
            this.$refs['defaultFunds'].reset()
            break
          case 'city':
            this.pageRequestParams.projectCity = selectedKeys.join(',')
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
          case 'startTime':
            this.pageRequestParams.minStartTime = selectedKeys[0]
            this.pageRequestParams.maxStartTime = selectedKeys[1]
            this.screenResults[type] = selectedKeys.join(' 至 ')
            this.$refs['defaultStartTime'].reset()
            break
          case 'endTime':
            this.pageRequestParams.minEndTime = selectedKeys[0]
            this.pageRequestParams.maxEndTime = selectedKeys[1]
            this.screenResults[type] = selectedKeys.join(' 至 ')
            this.$refs['defaultEndTime'].reset()
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
          case 'startTime':
            if (!selectedKeys[0]) {
              this.pageRequestParams.minStartTime = ''
              this.pageRequestParams.maxStartTime = ''
              this.screenResults[type] = ''
            } else {
              this.pageRequestParams.minStartTime = selectedKeys[0]
              this.pageRequestParams.maxStartTime = this.currentDate
              this.screenResults[type] = `${selectedKeys[0]} 至 ${this.currentDate}`
            }
            this.$refs['customStartTime'].reset()
            break
          case 'endTime':
            if (!selectedKeys[0]) {
              this.pageRequestParams.minEndTime = ''
              this.pageRequestParams.maxEndTime = ''
              this.screenResults[type] = ''
            } else if (selectedKeys[0] === 'allNotEnd') {
              this.pageRequestParams.minEndTime = this.currentDate
              this.pageRequestParams.maxEndTime = ''
              this.screenResults[type] = `${this.currentDate} 至 ~`
            } else {
              this.pageRequestParams.minEndTime = this.currentDate
              this.pageRequestParams.maxEndTime = selectedKeys[0]
              this.screenResults[type] = `${this.currentDate} 至 ${selectedKeys[0]}`
            }
            this.$refs['customEndTime'].reset()
            break
          default:
            break
        }
        this.commonRequestParams.pageNum = 1
        this.handleQuery()
      },
      /**默认科研经费变化 */
      handleDefaultFundsChange(e, type) {
        const { selectedKeys, selectedItems, isReset } = e
        if (isReset) return
        switch (type) {
          case 'funds':
            if (!selectedKeys[0]) {
              this.pageRequestParams.minProjectFunds = ''
              this.pageRequestParams.maxProjectFunds = ''
              this.screenResults[type] = ''
            } else {
              this.pageRequestParams.minProjectFunds = fundsMap.get(selectedKeys[0])[0]
              this.pageRequestParams.maxProjectFunds = fundsMap.get(selectedKeys[0])[1]
              this.screenResults[type] = `${selectedItems[0].name}`
            }
            this.$refs['customFunds'].reset()
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
            if (attr === 'startTime') {
              this.$refs['defaultStartTime'].reset()
              this.$refs['customStartTime'].reset()
            } else if (attr === 'endTime') {
              this.$refs['defaultEndTime'].reset()
              this.$refs['customEndTime'].reset()
            } else if (attr === 'funds') {
              this.$refs['defaultFunds'].reset()
              this.$refs['customFunds'].reset()
            } else {
              this.$refs[attr]?.reset()
            }
            this.screenResults[attr] = ''
          }
          this.pageRequestParams = Object.assign(this.pageRequestParams, {
            /**学科id */
            projectSubject: '',
            /**项目类别id */
            projectCategory: '',
            /**最小科研经费 */
            minProjectFunds: '',
            /**最大科研经费 */
            maxProjectFunds: '',
            /**所属城市 */
            projectCity: '',
            /**立项开始时间 */
            minStartTime: '',
            /**立项结束时间 */
            maxStartTime: '',
            /**结项开始时间 */
            minEndTime: '',
            /**结项结束时间 */
            maxEndTime: '',
          })
        } else {
          this.screenResults[type] = ''
          //重置某一项
          switch (type) {
            case 'subject':
              this.pageRequestParams.projectSubject = ''
              this.$refs[type].reset()
              break
            case 'level':
              this.pageRequestParams.projectCategory = ''
              this.$refs[type].reset()
              break
            case 'funds':
              this.pageRequestParams.minProjectFunds = ''
              this.pageRequestParams.maxProjectFunds = ''
              this.$refs['defaultFunds'].reset()
              this.$refs['customFunds'].reset()
              break
            case 'city':
              this.pageRequestParams.projectCity = ''
              this.$refs[type].reset()
              break
            case 'startTime':
              this.pageRequestParams.minStartTime = ''
              this.pageRequestParams.maxStartTime = ''
              this.$refs['defaultStartTime'].reset()
              this.$refs['customStartTime'].reset()
              break
            case 'endTime':
              this.pageRequestParams.minEndTime = ''
              this.pageRequestParams.maxEndTime = ''
              this.$refs['defaultEndTime'].reset()
              this.$refs['customEndTime'].reset()
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
          if (rowData.key === 'projectName') {
            this.$globalDrawer.show({
              component: FundDetail,
              options: {
                name: 'FundDetail',
                title: '基金课题详情',
                props: { id: record.targetId },
              },
            })
          }
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
              parent: this.$parent,
            },
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-customer-fund {
    .fund-list-wrap {
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

      .fund-list {
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 8px));
        column-gap: 16px;
        row-gap: 12px;
      }
    }

    /deep/ .ant-popover-inner-content {
      padding: 0px;
    }

    .subject-slot,
    .level-slot {
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
</style>
