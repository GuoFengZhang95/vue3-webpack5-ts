<template>
  <div id="yqmmpro-business-customer-table-wrapper">
    <MuTable
      ref="mumuTable"
      :key="keys"
      :selections-flag="true"
      :selections-all-flag="true"
      :selections-toggle-flag="false"
      row-key="tokenEncodeId"
      :selected-row-keys="selectedRowKeys"
      :is-loading="isLoading"
      :total="total"
      :page="page"
      :page-size="pageSize"
      :columns="columns"
      :data-source="dataSource"
      :setting-act-flag="true"
      :resize-height-offset="210"
      @handleRowClick="handleRowClick"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
      @dragTableHeaderOver="dragTableHeaderOver"
      @setTableHeader="setTableHeader"
      @handleFilter="handleFilter"
      @reloadTable="reloadTable"
    >
      <template slot="action">
        <div class="actions-wrapper">
          <div class="left">
            <MuSearchGroup
              :ref="keys"
              :select-visible="false"
              :has-reset="hasReset"
              placeholder="姓名、学校、研究方向、手机、座机、邮箱"
              :options-list="[]"
              @resetFilter="resetFilter"
              @search="handleSearch"
              @selectChange="handleSelectChange"
            ></MuSearchGroup>
          </div>
          <div class="right">
            <ExportButton
              v-if="resultOperationsVisible"
              :loading="exportLoading"
              :type="1"
              @click.native="beforeExport"
            ></ExportButton>
            <ExportButton v-if="resultOperationsRightVisible" :type="2"></ExportButton>
          </div>
        </div>
      </template>
    </MuTable>
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
  import { getCollegeData, getUnLockList } from '@/api/index'
  import { tableMix, exportMix } from '@/mixin/index'
  import { addExportSortDataSuffix } from '@/tools/index.js'
  import {
    getResearcherColumns,
    getResearcherExportFilters,
    researcherTableListFilter,
    updateTableColumns,
  } from '@/service/index.js'
  import { cloneDeep } from '@/utils/index.js'
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')

  export default {
    name: 'CustomerTable',
    components: {},
    mixins: [
      tableMix,
      exportMix({
        exportFieldNames:
          '个人主页、姓名、性别、学校、学院、办公地址、职称、行政职务、导师级别、邮箱、座机、手机、研究方向、基金课题。',
      }),
    ],
    props: {
      keys: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isLoading: false,
        queryData: {
          module: 6,
          subModule: this.keys === 'mine' ? 1 : 2,
          searchType: 0,
          searchKey: '',
          affiliatedCompany: 0,
          pageNum: 1,
          pageSize: 20,
          sort: 3,
        },
        columns: [],
        dataSource: [],
      }
    },
    computed: {
      ...mapGetters(['baseUserInfo']),
      hasReset() {
        return this.columns.some(c => c.filtered)
      },
      /**导出所需参数 */
      exportFilters() {
        let schoolIds = this.filterObj?.schoolName?.value.join(',') ?? ''
        let collegeIds = this.filterObj?.departName?.value.join(',') ?? ''
        let schoolIdsName = ''
        // 如果有学校的话，要把学校学院关联在仪器处理
        let targetSchools = []
        if (schoolIds) {
          targetSchools = this.filterObj.schoolName.data
        } else if (collegeIds) {
          targetSchools = this.columns.find(item => item.dataIndex === 'schoolName').checkOpts
        }
        schoolIdsName = targetSchools
          .map(schoolItem => {
            let schoolName = schoolItem.label
            if (collegeIds) {
              let currentSchoolCollegeName = this.filterObj.departName.data
                .filter(collegeItem => collegeItem.companyId == schoolItem.value)
                .map(collegeItem => collegeItem.label)
                .join(',')
              schoolName += `:${currentSchoolCollegeName}`
            }
            return schoolName
          })
          .join(';')

        return Object.assign({}, getResearcherExportFilters(), {
          /**关键词 */
          searchKey: this.queryData.searchKey ?? '',
          /**关键词范围 */
          searchType: this.queryData.searchType,
          searchTypeName: '综合搜索',
          sort: this.queryData.sort,
          /**学校 */
          schoolIds,
          schoolIdsName,
          /**学院 */
          collegeIds,
          /**行政职务 */
          atpIds: this.filterObj?.atpsName?.value.join(',') ?? '',
          atpIdsName: this.filterObj?.atpsName?.selectedItems.map(item => item.name).join(',') ?? '',
          /**职称 */
          titleIds: this.filterObj?.titleName?.value.join(',') ?? '',
          titleIdsName:
            this.filterObj?.titleName?.selectedItems.map(item => item.name).join(',') ?? '',
          /**城市 */
          cityIds: this.filterObj?.cityName?.value.join(',') ?? '',
          cityIdsName: this.filterObj?.cityName?.selectedItems.map(item => item.name).join(',') ?? '',
          /**导师级别 */
          tutorLevel: this.filterObj?.tutorLevelName?.value.join(',') ?? '',
          tutorLevelName:
            this.filterObj?.tutorLevelName?.data.map(item => item.label).join(',') ?? '',
          /**解锁时间 */
          unLockTime: addExportSortDataSuffix(this.filterObj?.unLockTimeSort?.value ?? ''),
          minUnLockTime: this.filterObj?.unLockTime?.value[0] ?? '',
          maxUnLockTime: this.filterObj?.unLockTime?.value[1] ?? '',
          /**解锁人 */
          unLockUserName: this.filterObj?.unLockUserName?.value?.searchKey ?? '',
        })
      },
    },
    watch: {
      keys: {
        immediate: true,
        handler(val) {
          let columns = cloneDeep([
            ...getResearcherColumns({
              extend: [
                'mobile2',
                'mobile3',
                'email2',
                'email3',
                'atpsName',
                'titleName',
                'tutorLevelName',
              ],
              filterVisible: ['schoolName', 'atpsName', 'titleName', 'tutorLevelName', 'cityName'],
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
            this.setExportModule(9)
          } else {
            columns.splice(-1, 0, {
              dataIndex: 'unLockUserName',
              title: '解锁人',
              filter: ['headSearch'],
              filterKey: 'unLockUserName',
              checkOpts: [],
              columns: [],
            })
            this.columns = columns
            this.setExportModule(10)
          }
          this.columns = updateTableColumns(this.columns, [
            {
              dataIndex: 'schoolName',
              checkOpts: JSON.parse(localStorage.getItem('schoolData')),
            },
            {
              dataIndex: 'atpsName',
              checkOpts: JSON.parse(localStorage.getItem('aptsData')),
            },
            {
              dataIndex: 'titleName',
              checkOpts: JSON.parse(localStorage.getItem('titleData')),
            },
            {
              dataIndex: 'cityName',
              checkOpts: JSON.parse(localStorage.getItem('tableCity')),
            },
          ])
        },
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.defaultTableInit()
      },
      //加载学校学院筛选项
      loadShoolData(id) {
        getCollegeData({
          page: 1,
          pageSize: 999999,
          schoolId: id || '',
        }).then(res => {
          this.columns.forEach(item => {
            if (item.dataIndex == 'departName') {
              item.checkOpts = res.data.map(item => {
                return {
                  companyId: item.companyId,
                  value: item.id,
                  label: item.name,
                }
              })
            }
          })
        })
      },
      //表格公用方法
      async defaultTableInit() {
        if ((await this.$parent.checkListPower()) === 3 && this.$parent.tabList.length === 2) return

        this.queryData.affiliatedCompany = this.baseUserInfo.companyId
        this.isLoading = true
        const {
          schoolName,
          departName,
          atpsName,
          titleName,
          cityName,
          tutorLevelName,
          unLockTime,
          unLockUserName,
          unLockTimeSort,
        } = this.filterObj
        if (unLockTimeSort) {
          if (unLockTimeSort.value === 'ascend') {
            //升序
            this.queryData.sort = 4
          } else {
            //降序
            this.queryData.sort = 3
          }
        } else {
          //降序
          this.queryData.sort = 3
        }
        Object.assign(this.queryData, {
          companyId: schoolName && schoolName.value.join(','),
          depart: departName && departName.value.join(','),
          atps: atpsName && atpsName.value.join(','),
          professionalLevel: titleName && titleName.value.join(','),
          bidCityId: cityName && cityName.value.join(','),
          tutorLevel: tutorLevelName && tutorLevelName.value.join(','),
          unLockUserName: unLockUserName && unLockUserName.value.searchKey,
          minUnLockTime: unLockTime && unLockTime.value[0],
          maxUnLockTime: unLockTime && unLockTime.value[1],
          pageNum: this.page,
          pageSize: this.pageSize,
        })
        this.loadShoolData(this.queryData.companyId)
        getUnLockList(this.queryData).then(res => {
          this.isLoading = false
          this.total = res.data.total
          this.dataSource = researcherTableListFilter({ list: res.data.list })
          this.columns = updateTableColumns(this.columns, [
            {
              dataIndex: 'tutorLevelName',
              checkOpts: res.data.searchList.tutorLevel.map(item => {
                return {
                  value: item.id,
                  label: item.name,
                }
              }),
            },
          ])
        })
      },
      //表格搜索
      handleSearch(e) {
        this.page = 1
        this.queryData.searchKey = e
        this.selectedRowKeys = []
        this.defaultTableInit()
      },
      //搜索类型选择
      handleSelectChange(e) {
        this.queryData.searchType = e
      },
      //表格点击事件
      async handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          if (rowData.key === 'name') {
            this.$globalDrawer.show({
              component: ResearcherDetail,
              options: {
                name: 'ResearcherDetail',
                title: '科研客户详情',
                props: { id: record.articleId },
              },
            })
          }
        }
      },
    },
  }
</script>

<style lang="less">
  #yqmmpro-business-customer-table-wrapper {
    .group-wrap {
      > .search-input {
        width: 332px !important;
      }
    }
  }
</style>
