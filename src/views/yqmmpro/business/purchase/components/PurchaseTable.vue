<template>
  <div>
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
      :setting-act-flag="false"
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
              placeholder="项目名称"
              :options-list="searchOptionsList"
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
  import { getUnLockList } from '@/api/index.js'
  import PurchaseDetail from '@/views/yqmmpro/components/PurchaseDetail.vue'
  import { tableMix, exportMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { addExportSortDataSuffix } from '@/tools/index.js'
  import {
    getPurchaseColumns,
    getPurchaseExportFilters,
    purchaseTableListFilter,
    updateTableColumns,
  } from '@/service/index.js'
  export default {
    name: 'PurchaseTable',
    mixins: [
      tableMix,
      exportMix({
        exportFieldNames:
          '项目名称、所属城市、采购单位、单位类型、采购品目、采购产品、预算、预计采购时间、项目概况。',
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
        searchOptionsList: [
          {
            value: 0,
            label: '综合搜索',
          },
          {
            value: 1,
            label: '项目名称',
          },
        ],
        queryData: {
          module: 1,
          subModule: this.keys === 'mine' ? 1 : 2,
          searchType: 1,
          searchKey: '',
          affiliatedCompany: 30178,
          pageNum: 1,
          pageSize: 20,
          sort: 3,
        },
        dataSource: [],
        columns: [],
      }
    },
    computed: {
      ...mapGetters(['baseUserInfo', 'companyTypeDict']),
      hasReset() {
        return this.columns.some(c => c.filtered)
      },
      /**导出所需参数 */
      exportFilters() {
        return Object.assign({}, getPurchaseExportFilters(), {
          searchKey: this.queryData.searchKey,
          /**关键词范围 */
          searchType: this.queryData.searchType,
          searchTypeName: '综合搜索',
          sort: this.queryData.sort,
          /**城市 */
          cityId: this.filterObj?.bidCityName?.value.join(',') ?? '',
          cityIdName:
            this.filterObj?.bidCityName?.selectedItems.map(item => item.name).join(',') ?? '',
          /**采购单位 */
          bidCompany: this.filterObj?.bidCompany?.value?.searchKey ?? '',
          /**单位类型 */
          companyTypeIds: this.filterObj?.companyType?.value.join(',') ?? '',
          companyTypeIdsName:
            this.filterObj?.companyType?.data.map(item => item.label).join(',') ?? '',
          /**采购品目 */
          purchaseItemStr: this.filterObj?.purchaseItemStr?.value?.searchKey ?? '',
          /**采购产品 */
          bidProduct: this.filterObj?.bidProduct?.value?.searchKey ?? '',
          /**预计采购时间 */
          bidPurchaseDate: addExportSortDataSuffix(this.filterObj?.bidPurchaseDateSort?.value ?? ''),
          minPurchaseDate: this.filterObj?.bidPurchaseDate?.value[0] ?? '',
          maxPurchaseDate: this.filterObj?.bidPurchaseDate?.value[1] ?? '',
          /**发布时间 */
          publishTime: addExportSortDataSuffix(this.filterObj?.publishTimeSort?.value ?? ''),
          minPublishTime: this.filterObj?.publishTime?.value[0] ?? '',
          maxPublishTime: this.filterObj?.publishTime?.value[1] ?? '',
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
            ...getPurchaseColumns({
              filterVisible: [
                'bidCityName',
                'bidCompany',
                'companyType',
                'purchaseItemStr',
                'bidProduct',
                'bidPurchaseDate',
                'publishTime',
              ],
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
            this.setExportModule(13)
          } else {
            columns.splice(-1, 0, {
              dataIndex: 'unLockUserName',
              title: '解锁人',
              filter: ['headSearch'],
              filterKey: 'unLockUserName',
            })
            this.columns = columns
            this.setExportModule(14)
          }
        },
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.defaultTableInit()
        this.columns = updateTableColumns(this.columns, [
          {
            dataIndex: 'bidCityName',
            checkOpts: JSON.parse(localStorage.getItem('tablebCity')),
          },
          {
            dataIndex: 'companyType',
            checkOpts: this.companyTypeDict.map(item => {
              return {
                label: item.name,
                value: item.id,
              }
            }),
          },
        ])
      },
      //表格公用方法
      async defaultTableInit() {
        if ((await this.$parent.checkListPower()) === 3 && this.$parent.tabList.length === 2) return

        this.queryData.affiliatedCompany = this.baseUserInfo.companyId
        this.isLoading = true
        const {
          bidCityName,
          bidCompany,
          companyType,
          purchaseItemStr,
          bidProduct,
          bidPurchaseDate,
          publishTime,
          unLockTime,
          unLockUserName,
          bidPurchaseDateSort,
          publishTimeSort,
          unLockTimeSort,
        } = this.filterObj
        if (bidPurchaseDateSort) {
          if (bidPurchaseDateSort.value === 'ascend') {
            //升序
            this.queryData.sort = 2
          } else {
            //降序
            this.queryData.sort = 1
          }
        } else if (publishTimeSort) {
          if (publishTimeSort.value === 'ascend') {
            //升序
            this.queryData.sort = 6
          } else {
            //降序
            this.queryData.sort = 5
          }
        } else if (unLockTimeSort) {
          if (unLockTimeSort.value === 'ascend') {
            //升序
            this.queryData.sort = 4
          } else {
            //降序
            this.queryData.sort = 3
          }
        } else {
          this.queryData.sort = 3
        }
        Object.assign(this.queryData, {
          bidCityId: bidCityName && bidCityName.value.join(','),
          bidCompany: bidCompany && bidCompany.value.searchKey,
          companyType: companyType && companyType.value.join(','),
          purchaseItemStr: purchaseItemStr && purchaseItemStr.value.searchKey,
          bidProduct: bidProduct && bidProduct.value.searchKey,
          unLockUserName: unLockUserName && unLockUserName.value.searchKey,
          minPurchaseDate: bidPurchaseDate && bidPurchaseDate.value[0],
          maxPurchaseDate: bidPurchaseDate && bidPurchaseDate.value[1],
          minPublishTime: publishTime && publishTime.value[0],
          maxPublishTime: publishTime && publishTime.value[1],
          minUnLockTime: unLockTime && unLockTime.value[0],
          maxUnLockTime: unLockTime && unLockTime.value[1],
          pageNum: this.page,
          pageSize: this.pageSize,
        })
        getUnLockList(this.queryData).then(res => {
          this.isLoading = false
          this.dataSource = purchaseTableListFilter({ list: res.data.list })
          this.total = res.data.total
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
<style></style>
