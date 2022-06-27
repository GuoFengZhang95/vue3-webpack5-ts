<template>
  <div class="fund-table">
    <div class="table-pad">
      <MuTable
        ref="mumuTable"
        :key="keys"
        :has-index="true"
        :selections-flag="false"
        :selections-all-flag="false"
        :selections-toggle-flag="false"
        row-key="tokenEncodeId"
        :selected-row-keys="selectedRowKeys"
        :is-loading="isLoading"
        :setting-act-flag="true"
        :page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        :total="total"
        :columns="columns"
        :data-source="dataSource"
        :resize-height-offset="210"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        @reloadTable="reloadTable"
        @handleFilter="handleFilter"
        @handleRowClick="handleRowClick"
        @dragTableHeaderOver="dragTableHeaderOver"
        @setTableHeader="setTableHeader"
      >
        <template slot="action">
          <div class="actions-wrapper">
            <div class="left">
              <MuSearchGroup
                :ref="keys"
                :placeholder="searchPlaceholder"
                :select-visible="true"
                :has-reset="hasReset"
                :options-list="selectOptions"
                @resetFilter="resetFilter"
                @search="handleSearch"
                @selectChange="e => (queryParams.searchType = e)"
              ></MuSearchGroup>
            </div>
          </div>
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { tableMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { getUnLockList } from '@/api/index.js'
  import { fundTableListFilter, getFundColumns, updateTableColumns } from '@/service/index.js'
  const FundDetail = () => import('@/views/yqmmpro/components/FundDetail.vue')
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')

  export default {
    name: 'FundTable',
    mixins: [tableMix],
    props: {
      keys: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        searchPlaceholder: '请输入搜索内容',
        queryParams: {
          module: 7,
          subModule: 1, // 1我的 2全部
          pageNum: 1,
          pageSize: 20,
          searchKey: '',
          searchType: '0',
          sort: 3,
        },
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
            value: '2',
          },
          {
            label: '依托单位',
            value: '3',
          },
        ],
        columns: [],
        projectTypeList: [
          {
            label: '纵向基金',
            value: '1',
          },
          {
            label: '横向课题',
            value: '2',
          },
        ],
      }
    },
    computed: {
      ...mapGetters(['cityDict', 'projectCategoryTreeDict', 'projectSubjectTreeDict']),
      hasReset() {
        return this.columns.some(c => c.filtered)
      },
    },
    watch: {
      keys: {
        immediate: true,
        handler(val) {
          let columns = cloneDeep([
            ...getFundColumns({
              filterVisible: ['projectTypeName', 'startTime', 'endTime'],
            }),
            {
              dataIndex: 'unLockTime',
              title: '解锁时间',
              filter: ['sort', 'date'],
              filterKey: ['unLockTimeSort', 'unLockTime'],
            },
          ])
          if (val === 'mine') {
            this.columns = columns
          } else {
            columns.splice(-1, 0, {
              dataIndex: 'unLockUserName',
              title: '解锁人',
              filter: ['headSearch'],
              filterKey: 'unLockUserName',
            })
            this.columns = columns
          }
          this.columns = updateTableColumns(this.columns, [
            {
              dataIndex: 'projectTypeName',
              checkOpts: this.projectTypeList,
            },
            {
              dataIndex: 'projectCategoryName',
              checkOpts: this.projectCategoryTreeDict,
            },
            {
              dataIndex: 'projectSourceCityName',
              checkOpts: this.cityDict,
            },
            {
              dataIndex: 'projectSubjectName',
              checkOpts: this.projectSubjectTreeDict,
            },
            {
              dataIndex: 'memberCityNames',
              checkOpts: this.cityDict,
            },
          ])
        },
      },
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.queryParams.subModule = this.keys === 'mine' ? 1 : 2
        this.loadFilterData()
        this.defaultTableInit()
      },
      // 加载表头筛选数据
      async loadFilterData() {
        this.$store.dispatch('dictionary/getTargetDicts', [
          'getProjectCategoryTree',
          'getProjectSubjectTree',
        ])
      },
      // 列表数据
      async defaultTableInit() {
        this.queryParams.pageNum = 1
        await this.handleQuery()
      },
      // 加载列表
      async handleQuery() {
        if ((await this.$parent.checkListPower()) === 3 && this.$parent.tabList.length === 2) return
        const {
          projectTypeName,
          projectCategoryName,
          projectSourceCityName,
          projectSubjectName,
          projectCity,
          projectCompany,
          memberUserName,
          projectFunds,
          projectFundsSort,
          startTime,
          startTimeSort,
          endTime,
          endTimeSort,
          unLockTime,
          unLockTimeSort,
          unLockUserName,
        } = this.filterObj
        let sort = 3 //默认解锁时间倒序
        if (projectFundsSort?.filtered) {
          if (projectFundsSort.value === 'descend') {
            sort = 9
          } else {
            sort = 10
          }
        } else if (startTimeSort?.filtered) {
          if (startTimeSort.value === 'descend') {
            sort = 11
          } else {
            sort = 12
          }
        } else if (endTimeSort?.filtered) {
          if (endTimeSort.value === 'descend') {
            sort = 13
          } else {
            sort = 14
          }
        } else if (unLockTimeSort?.filtered) {
          if (unLockTimeSort.value === 'descend') {
            sort = 3
          } else {
            sort = 4
          }
        }
        // console.log(this.filterObj)
        this.isLoading = true
        Object.assign(this.queryParams, {
          projectType: projectTypeName?.value?.join(',') ?? '',
          projectCategory: projectCategoryName?.value?.join(',') ?? '',
          projectSourceCity: projectSourceCityName?.value?.join(',') ?? '',
          projectSubjectIds: projectSubjectName?.value?.join(',') ?? '',
          projectCityIds: projectCity?.value?.join(',') ?? '',
          projectCompany: projectCompany?.value?.searchKey ?? '',
          projectMember: memberUserName?.value?.searchKey ?? '',
          minProjectFunds: projectFunds?.value[0] ?? '',
          maxProjectFunds: projectFunds?.value[1] ?? '',
          minStartTime: startTime?.value[0] ?? '',
          maxStartTime: startTime?.value[1] ?? '',
          minEndTime: endTime?.value[0] ?? '',
          maxEndTime: endTime?.value[1] ?? '',
          minUnLockTime: unLockTime?.value[0] ?? '',
          maxUnLockTime: unLockTime?.value[1] ?? '',
          unLockUserName: unLockUserName?.value?.searchKey ?? '',
          sort: sort,
        })
        let { code, data } = await getUnLockList(this.queryParams)
        this.isLoading = false
        if (code === '0') {
          if (!data.list) return false
          this.total = data.total
          this.dataSource = fundTableListFilter({
            list: data.list.map(item => {
              item.projectName = item.title
              return item
            }),
          })
        }
      },
      // 查询条件更新，查询结果
      handleSearch(e) {
        this.queryParams.pageNum = 1
        this.queryParams.searchKey = e
        this.selectedRowKeys = []
        this.handleQuery()
      },
      /**页码变更 */
      pageChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.queryParams.pageNum = page
        this.handleQuery()
      },
      /**每页数变更 */
      pageSizeChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.queryParams.pageNum = 1
        this.queryParams.pageSize = pageSize
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
                props: { id: record.tokenEncodeId },
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
  .fund-table {
    .table-pad {
      .actions-wrapper {
        .reset-search-btn {
          width: 104px;
          height: 32px;
          opacity: 1;
          border: 1px solid #00c7db;
          border-radius: 17px;
          text-align: center;
          line-height: 32px;
          margin-left: 24px;
          font-weight: 400;
          color: #00c7db;
          font-size: 14px;
          cursor: pointer;
          img {
            height: 12px;
            opacity: 0.65;
            vertical-align: -1px;
          }
        }
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
  }
</style>
