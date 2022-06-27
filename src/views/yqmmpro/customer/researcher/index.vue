<template>
  <div class="yqmmpro-customer-research">
    <YqmmproPageSearch
      ref="YqmmproPageSearch"
      :options="researchSearchOptions"
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
      <template #school>
        <a-popover
          placement="bottomLeft"
          :get-popup-container="triggerNode => triggerNode.parentNode"
          :visible="schoolVisible"
        >
          <template slot="content">
            <SchoolScreen
              ref="school"
              :visible="true"
              @change="handleSPChange($event, 'school')"
              @close="schoolVisible = false"
            ></SchoolScreen>
          </template>
          <div
            class="school-slot"
            :class="{ active: schoolVisible, selected: isSchoolSelected }"
            @click="schoolVisible = !schoolVisible"
          >
            <span>{{ screenSchoolName }}</span>
            <i class="mmxlicon mi-arrow-down icon-arrow"></i>
          </div>
        </a-popover>
      </template>
      <template #contactType>
        <CheckArea
          ref="contactType"
          :list="contactList"
          @change="handleSPChange($event, 'contactType')"
        ></CheckArea>
      </template>
      <template #topics>
        <CheckArea
          ref="topics"
          :list="[
            { id: 1, name: '有研究方向' },
            { id: 2, name: '有基金课题' },
          ]"
          @change="handleSPChange($event, 'topics')"
        ></CheckArea>
      </template>
      <template #adminPost>
        <DoubleFilter
          ref="adminPost"
          :list="adminiPostDict"
          @change="handleSPChange($event, 'adminPost')"
        ></DoubleFilter>
      </template>
      <template #title>
        <DoubleFilter
          ref="title"
          :list="titleDict"
          @change="handleSPChange($event, 'title')"
        ></DoubleFilter>
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
          label="学校/学院"
          :value="screenResults.school"
          @delete="handleSPReset('school')"
        ></ResultItem>
        <ResultItem
          label="联系方式"
          :value="screenResults.contactType"
          @delete="handleSPReset('contactType')"
        ></ResultItem>
        <ResultItem
          label="学术课题"
          :value="screenResults.topics"
          @delete="handleSPReset('topics')"
        ></ResultItem>
        <ResultItem
          label="行政职务"
          :value="screenResults.adminPost"
          @delete="handleSPReset('adminPost')"
        ></ResultItem>
        <ResultItem
          label="职称"
          :value="screenResults.title"
          @delete="handleSPReset('title')"
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
    <div class="customer-list-wrap">
      <result-switch
        :is-search="isSearchStatus"
        :total="total"
        :is-time-relate-show="false"
        :columns="columns"
        @setTableHeader="setTableHeader"
        @dragTableHeaderOver="dragTableHeaderOver"
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
          <div class="customer-list">
            <ResearcherCard
              v-for="item in customerList"
              :key="item.customerId"
              :item="item"
            ></ResearcherCard>
          </div>
          <MuPagination
            v-if="showPagination"
            :page="commonRequestParams.pageNum"
            :page-size="commonRequestParams.pageSize"
            :page-size-options="['15', '30', '45']"
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
        :page-size-options="['15', '30', '45']"
        :total="total"
        :total-visible="false"
        :columns="columns"
        :data-source="dataSource"
        :resize-height-offset="tableOffset + yqmmPageSearchHeight + screenPanelHeight + 10 + 56"
        :pagination-flag="showPagination"
        :highlight="true"
        @pageChange="handlePageNumChange"
        @pageSizeChange="handlePageSizeChange"
        @reloadTable="reloadTable"
        @handleRowClick="handleRowClick"
      ></MuTable>
      <EquityPaginationMask v-if="!showPagination && loadingStatus === 3"></EquityPaginationMask>
    </div>
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
  import { tableMix, loadingMix, exportMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { addYqmmSearchLog, getResearcherList, getRemainCardTimes } from '@/api/index.js'
  import { getResearcherColumns, researcherTableListFilter } from '@/service/index.js'
  import { getResearcherExportFilters } from '@/service/index.js'
  const ResearcherCard = () => import('@/views/yqmmpro/components/ResearcherCard.vue')
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')
  const YqmmproPageSearch = () => import('@/views/yqmmpro/components/PageSearch.vue')
  const ResultSwitch = () => import('@/views/yqmmpro/components/ResultSwitch.vue')
  const ScreenPanel = () => import('@/views/yqmmpro/components/ScreenPanel/index.vue')
  const DoubleFilter = () => import('@/views/yqmmpro/components/ScreenPanel/DoubleFilter.vue')
  const ResultItem = () => import('@/views/yqmmpro/components/ScreenPanel/ResultItem.vue')
  const CheckArea = () => import('@/views/yqmmpro/components/ScreenPanel/CheckArea.vue')
  const FoldController = () => import('@/views/yqmmpro/components/ScreenPanel/FoldController.vue')
  const SchoolScreen = () => import('@/views/yqmmpro/components/ScreenPanel/SchoolScreen.vue')
  export default {
    name: 'YqmmproCustomerResearcher',
    components: {
      ResearcherCard,
      YqmmproPageSearch,
      ResultSwitch,
      ScreenPanel,
      DoubleFilter,
      ResultItem,
      CheckArea,
      FoldController,
      SchoolScreen,
    },
    mixins: [
      tableMix,
      loadingMix(),
      exportMix({
        exportModule: 1,
        exportFieldNames:
          '个人主页、姓名、性别、学校、学院、办公地址、职称、行政职务、导师级别、邮箱、座机、手机、研究方向、基金课题。',
      }),
    ],
    data() {
      return {
        schoolVisible: false,
        isExpanded: true,
        searchType: 9,
        /**已选条件 */
        screenResults: {
          contactType: '',
          topics: '',
          adminPost: '',
          title: '',
          city: '',
          school: '',
        },
        contactList: [
          { id: 1, name: '有手机' },
          { id: 3, name: '有座机' },
          { id: 2, name: '有邮箱' },
        ],
        /**卡片数据 */
        customerList: [],
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
          /**学校 */
          schoolIds: '',
          /**学院 */
          collegeIds: '',
          /**	联系方式 1有电话 2有邮箱 */
          contactWayType: '',
          /**	学术课题 1有研究方向 2有基金课题 */
          scholarshipType: '',
          /**行政职务 */
          atpIds: '',
          /**职称 */
          titleIds: '',
          /**城市id */
          cityIds: '',
          /**是否高亮 */
          isHighlight: 1,
          /**0-相关度 1-发布时间倒叙 */
          sort: 0,
        },
        /**是否处于筛选状态 */
        isSearchStatus: false,
        /** 展示方式 卡片-0 列表-1 */
        selectedDisplay: 0,
        columns: getResearcherColumns({ extend: ['mobile2', 'mobile3', 'email2', 'email3'] }),
        /**权益卡科研客户剩余次数 */
        remainTotalTimes: 0,
        /**顶部搜索框高度 */
        yqmmPageSearchHeight: 0,
        /**筛选面板高度 */
        screenPanelHeight: 0,
      }
    },
    computed: {
      ...mapGetters([
        'adminiPostDict',
        'cityDict',
        'titleDict',
        'tableOffset',
        'researchSearchOptions',
      ]),
      // 筛选面板数据
      spLayout() {
        let screenPanelLayout = [
          [
            { label: '所在学校', field: 'school' },
            { label: '联系方式', field: 'contactType' },
            { label: '学术课题', field: 'topics' },
          ],
          [{ label: '行政职务', field: 'adminPost' }],
          [{ label: '职称', field: 'title' }],
          [{ label: '城市', field: 'city' }],
        ]
        return screenPanelLayout
      },
      /**已选筛选数量 */
      resultNum() {
        return Object.values(this.screenResults).filter(item => item).length
      },
      unionRequestParams() {
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
      isSchoolSelected() {
        return !!(this.pageRequestParams.schoolIds || this.pageRequestParams.collegeIds)
      },
      /**是否展示分页（当前模块是否有额度） */
      showPagination() {
        return this.remainTotalTimes > 0 || this.remainTotalTimes === -1
      },
      /**筛选中的学校展示的文字 */
      screenSchoolName() {
        let text = '学校/学院'
        let num = this.screenResults.school.split(';').filter(item => item).length
        if (num > 0) {
          text = `已选${num}项`
        }
        return text
      },
      /**导出所需参数 */
      exportFilters() {
        return Object.assign({}, getResearcherExportFilters(), {
          /**关键词 */
          searchKey: this.pageRequestParams.searchKey,
          /**关键词范围 */
          searchType: this.pageRequestParams.searchType,
          searchTypeName: this.researchSearchOptions.find(
            item => item.value === this.pageRequestParams.searchType
          ).label,
          sort: this.pageRequestParams.sort,
          /**学校 */
          schoolIds: this.pageRequestParams.schoolIds,
          schoolIdsName: this.screenResults.school,
          /**学院 */
          collegeIds: this.pageRequestParams.collegeIds,
          /**联系方式 */
          contactWayType: this.pageRequestParams.contactWayType,
          contactWayTypeName: this.screenResults.contactType,
          /**学术课题 */
          scholarshipType: this.pageRequestParams.scholarshipType,
          scholarshipTypeName: this.screenResults.topics,
          /**行政职务 */
          atpIds: this.pageRequestParams.atpIds,
          atpIdsName: this.screenResults.adminPost,
          /**职称 */
          titleIds: this.pageRequestParams.titleIds,
          titleIdsName: this.screenResults.title,
          /**城市 */
          cityIds: this.pageRequestParams.cityIds,
          cityIdsName: this.screenResults.city,
        })
      },
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
            if (logRes.code === '0') {
              this.$refs['YqmmproPageSearch'].updateSearchLog(this.searchType)
            }
          }
          if (res.data && res.data.customers) {
            this.customerList = cloneDeep(res.data.customers)
            this.dataSource = researcherTableListFilter({ list: res.data.customers })
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
          this.pageRequestParams.schoolIds ||
          this.pageRequestParams.collegeIds ||
          this.pageRequestParams.contactWayType ||
          this.pageRequestParams.scholarshipType ||
          this.pageRequestParams.atpIds ||
          this.pageRequestParams.titleIds ||
          this.pageRequestParams.cityIds
        )
      },
      /**执行顶部搜索*/
      onSearchConfirm() {
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = 15
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
        // console.log(e)
        const { selectedKeys, selectedItems, isReset } = e
        if (isReset) return
        switch (type) {
          case 'contactType':
            this.pageRequestParams.contactWayType = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
            break
          case 'topics':
            this.pageRequestParams.scholarshipType = selectedKeys.join(',')
            this.screenResults[type] = selectedItems.map(item => item.name).join(',')
            break
          case 'adminPost':
            this.pageRequestParams.atpIds = selectedKeys.join(',')
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
          case 'title':
            this.pageRequestParams.titleIds = selectedKeys.join(',')
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
          case 'school':
            {
              const {
                selectedCollegeItems,
                selectedCollegeKeys,
                selectedSchoolItems,
                selectedSchoolKeys,
              } = e
              this.pageRequestParams.schoolIds = selectedSchoolKeys.join(',')
              this.pageRequestParams.collegeIds = selectedCollegeKeys.join(',')
              this.screenResults[type] = selectedSchoolItems
                .map(school => {
                  let schoolName = school.name
                  let collegeNames = selectedCollegeItems
                    .filter(college => college.companyId == school.id)
                    .map(college => college.name)
                    .join(',')
                  if (collegeNames) {
                    return `${schoolName}:${collegeNames}`
                  } else {
                    return schoolName
                  }
                })
                .join(';')
            }
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
        this.commonRequestParams.pageSize = 15
        if (!type) {
          // 重置所有
          for (let attr in this.screenResults) {
            this.$refs[attr]?.reset()
            this.screenResults[attr] = ''
          }
          this.pageRequestParams = Object.assign(this.pageRequestParams, {
            /**	联系方式 1有电话 2有邮箱 */
            contactWayType: '',
            /**	学术课题 1有研究方向 2有基金课题 */
            scholarshipType: '',
            /**行政职务 */
            atpIds: '',
            /**职称 */
            titleIds: '',
            /**城市id */
            cityIds: '',
            /**学校 */
            schoolIds: '',
            /**学院 */
            collegeIds: '',
          })
        } else {
          this.$refs[type].reset()
          this.screenResults[type] = ''
          //重置某一项
          switch (type) {
            case 'contactType':
              this.pageRequestParams.contactWayType = ''
              break
            case 'topics':
              this.pageRequestParams.scholarshipType = ''
              break
            case 'adminPost':
              this.pageRequestParams.atpIds = ''
              break
            case 'title':
              this.pageRequestParams.titleIds = ''
              break
            case 'city':
              this.pageRequestParams.cityIds = ''
              break
            case 'school':
              this.pageRequestParams.schoolIds = ''
              this.pageRequestParams.collegeIds = ''
              break
            default:
              break
          }
        }
        this.handleQuery()
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
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-customer-research {
    .customer-list-wrap {
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
