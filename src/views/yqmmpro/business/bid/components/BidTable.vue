<template>
  <div class="bid-table">
    <div class="table-pad">
      <MuTable
        ref="mumuTable"
        :key="keys"
        :has-index="true"
        :is-loading="isLoading"
        :setting-act-flag="false"
        :page="page"
        :page-size="pageSize"
        :total="total"
        :columns="columns"
        :data-source="dataSource"
        :resize-height-offset="210"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        @reloadTable="reloadTable"
        @handleFilter="handleFilter"
        @handleRowClick="handleRowClick"
      >
        <template slot="action">
          <div class="search-action">
            <MuSearchGroup
              :ref="keys"
              :placeholder="searchPlaceholder"
              :select-visible="false"
              :has-reset="hasReset"
              @resetFilter="resetFilter"
              @search="handleSearch"
            ></MuSearchGroup>
          </div>
        </template>
      </MuTable>
    </div>
  </div>
</template>

<script>
  const BidDetail = () => import('@/views/yqmmpro/components/BidDetail/index.vue')
  import { tableMix } from '@/mixin/index'
  import { getCountryList, getUnLockList } from '@/api/index'
  import { mapGetters } from 'vuex'
  import { cloneDeep } from '@/utils/index'
  import { getBidColumns, updateTableColumns, bidTableListFilter } from '@/service/index.js'
  export default {
    name: 'BidTable',
    mixins: [tableMix],
    props: {
      keys: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        searchPlaceholder: '标题',
        queryObj: {
          module: 2, // 0未知 1采购意向 2标讯 3需求 4重大商情 5客户分析 6客源
          subModule: 1, // 1我的 2全部
          affiliatedCompany: '',
          searchType: 1, // 只有标题搜索
          searchKey: '', // 搜索值
          bidProvinceId: '',
          bidCityId: '',
          bidCompany: '',
          bidProduct: '',
          unLockUserName: '',
          bidTypeId: '',
          minPublishTime: '',
          maxPublishTime: '',
          minUnLockTime: '',
          maxUnLockTime: '',
          sort: 3,
          pageNum: 1,
          pageSize: 20,
        },
        companyId: '',
        columns: [],
      }
    },
    computed: {
      ...mapGetters(['baseUserInfo']),
      hasReset() {
        return this.columns.some(c => c.filtered)
      },
    },
    watch: {
      keys: {
        immediate: true,
        handler(val) {
          let columns = cloneDeep([
            ...getBidColumns({
              filterVisible: [
                'bidTypeName',
                'bidCityName',
                'bidCompany',
                'bidProduct',
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
          } else {
            columns.splice(-1, 0, {
              dataIndex: 'unLockUserName',
              title: '解锁人',
              filter: ['headSearch'],
              filterKey: 'unLockUserName',
            })
            this.columns = columns
          }
        },
      },
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        let { companyId } = this.baseUserInfo
        this.companyId = companyId
        this.queryObj.subModule = this.keys === 'mine' ? 1 : 2
        this.loadFilterData()
        this.defaultTableInit()
      },
      // 加载表头筛选数据
      async loadFilterData() {
        await this.setCityOpts()
      },
      async setCityOpts() {
        // 所属城市
        let { code, data } = await getCountryList()
        if (code === '0') {
          this.columns = updateTableColumns(this.columns, [
            {
              dataIndex: 'bidCityName',
              checkOpts: data,
            },
          ])
        }
      },
      // 列表数据
      async defaultTableInit() {
        if ((await this.$parent.checkListPower()) === 3 && this.$parent.tabList.length === 2) return
        Object.assign(this.queryObj, {
          bidTypeId: this.filterObj?.bidType?.value.join(',') ?? '',
          bidCityId: this.filterObj?.bidCityName?.value.join(',') ?? '',
          bidCompany: this.filterObj?.bidCompany?.value.searchKey ?? '',
          bidProduct: this.filterObj?.bidProduct?.value.searchKey ?? '',
          unLockUserName: this.filterObj?.unLockUserName?.value.searchKey ?? '',
          minPublishTime: this.filterObj?.publishTime?.value[0] ?? '',
          maxPublishTime: this.filterObj?.publishTime?.value[1] ?? '',
          minUnLockTime: this.filterObj?.unLockTime?.value[0] ?? '',
          maxUnLockTime: this.filterObj?.unLockTime?.value[1] ?? '',
          pageNum: this.page,
          pageSize: this.pageSize,
        })
        if (this.filterObj?.publishTimeSort) {
          let { value } = this.filterObj.publishTimeSort
          Object.assign(this.queryObj, {
            sort: value === 'ascend' ? 6 : value === 'descend' ? 5 : 0,
          })
        } else if (this.filterObj?.unLockTimeSort) {
          let { value } = this.filterObj.unLockTimeSort
          Object.assign(this.queryObj, {
            sort: value === 'ascend' ? 4 : value === 'descend' ? 3 : 0,
          })
        } else {
          Object.assign(this.queryObj, {
            sort: 3,
          })
        }
        await this.handleQuery()
      },
      // 加载列表
      async handleQuery() {
        if ((await this.$parent.checkListPower()) === 3 && this.$parent.tabList.length === 2) return

        this.isLoading = true
        this.queryObj.affiliatedCompany = this.companyId
        let { code, data } = await getUnLockList(this.queryObj)
        this.isLoading = false
        if (code === '0') {
          if (!data.list) return false
          this.total = data.total
          let { bidTypeList } = data.searchList
          this.dataSource = bidTableListFilter({ list: data.list })
          // 筛选项
          this.columns = updateTableColumns(this.columns, [
            {
              dataIndex: 'bidTypeName',
              checkOpts: bidTypeList,
            },
          ])
        }
      },
      // 表格操作
      handleRowClick(clickType, rowData, record) {
        console.log(rowData)
        console.log(record)
        if (clickType === 'action') {
          if (rowData.key === 'title' && rowData.label) {
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
      // 查询条件更新，查询结果
      handleSearch(e) {
        this.queryObj.searchKey = e
        this.queryObj.pageNum = this.page = 1
        this.selectedRowKeys = []
        this.handleQuery()
      },
      // 页面变更
      pageChange(current, pageSize, tableKey) {
        this.page = current
        this.defaultTableInit()
      },
      // 每页展示条数
      pageSizeChange(current, pageSize, tableKey) {
        this.page = 1
        this.pageSize = pageSize
        this.defaultTableInit()
      },
    },
  }
</script>

<style lang="less" scoped>
  .bid-table {
    .table-pad {
      .search-action {
        display: flex;
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
  }
</style>
