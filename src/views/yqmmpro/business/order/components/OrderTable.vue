<template>
  <div>
    <MuTable
      ref="mumuTable"
      :key="keys"
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
        <div class="left">
          <MuSearchGroup
            :ref="keys"
            :has-reset="hasReset"
            :placeholder="queryData.searchType === '0' ? '需求名称、需求编号' : '请输入搜索内容'"
            :options-list="searchOptionsList"
            @resetFilter="resetFilter"
            @search="handleSearch"
            @selectChange="handleSelectChange"
          ></MuSearchGroup>
        </div>
      </template>
    </MuTable>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { cloneDeep } from '@/utils/index'
  import { getUnLockList } from '@/api/index.js'
  import { tableMix } from '@/mixin/index'
  const OrderDetail = () => import('../detail')

  let commonColumns = [
    {
      dataIndex: 'title',
      title: '需求名称',
      type: 'action',
      default: true,
      fixed: 'left',
      width: 300,
    },
    {
      dataIndex: 'cata',
      title: '需求类型',
      filter: ['search'],
      filterKey: 'cata',
      checkOpts: [],
    },
    {
      dataIndex: 'projectStageName',
      title: '项目阶段',
      filter: ['search'],
      filterKey: 'projectStageName',
      checkOpts: [],
    },
    {
      dataIndex: 'bidCityName',
      title: '城市',
      filter: ['extendTree'],
      filterKey: 'bidCityName',
      checkOpts: [],
    },
    {
      dataIndex: 'bidPurchaseBudget',
      title: '预算(万元)',
    },
    {
      dataIndex: 'bidPurchaseDate',
      title: '预计采购时间',
      filter: ['sort', 'singleMonth'],
      filterKey: 'bidPurchaseDate',
      checkOpts: [],
      width: 140,
    },
    {
      dataIndex: 'deadLine',
      title: '截止日期',
      width: 140,
      filter: ['sort', 'month'],
      filterKey: 'deadLine',
      checkOpts: [],
    },
    {
      dataIndex: 'unLockTime',
      title: '接单时间',
      width: 180,
      filter: ['sort', 'date'],
      filterKey: 'unLockTime',
      checkOpts: [],
    },
    {
      dataIndex: 'publishUserName',
      title: '发布人',
      extend: true,
    },
    {
      dataIndex: 'publishTime',
      title: '发布时间',
      width: 200,
      filter: ['sort', 'date'],
      filterKey: 'publishTime',
      checkOpts: [],
      extend: true,
    },
    {
      dataIndex: 'businessNo',
      title: '需求编号',
      width: 200,
      extend: true,
    },
  ]
  let flexColumns = {
    dataIndex: 'unLockUserName',
    title: '接单人',
    filter: ['headSearch'],
    filterKey: 'unLockUserName',
    checkOpts: [],
  }
  export default {
    name: 'OrderTable',
    mixins: [tableMix],
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
          { value: '0', label: '综合搜索' },
          { value: '1', label: '需求名称' },
          { value: '2', label: '需求编号' },
        ],
        queryData: {
          module: 3,
          subModule: this.keys === 'mine' ? 1 : 2,
          searchType: '0',
          searchKey: '',
          affiliatedCompany: 30178,
          pageNum: 1,
          pageSize: 20,
        },
        dataSource: [],
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
        handler(val) {
          let mineColumns = cloneDeep(commonColumns)
          let allColumns = cloneDeep(commonColumns)
          allColumns.splice(-4, 0, flexColumns)
          this.columns = val === 'mine' ? mineColumns : allColumns
        },
        immediate: true,
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.defaultTableInit()
        this.initFilter()
      },
      //表头筛选数据
      initFilter() {
        this.columns.forEach(item => {
          if (item.dataIndex == 'bidCityName') {
            item.checkOpts = JSON.parse(localStorage.getItem('tablebCity'))
          }
        })
      },
      //表格公用方法
      async defaultTableInit() {
        if ((await this.$parent.checkListPower()) === 3 && this.$parent.tabList.length === 2) return

        this.queryData.affiliatedCompany = this.baseUserInfo.companyId
        this.isLoading = true
        const {
          cata,
          projectStageName,
          bidCityName,
          bidPurchaseDate,
          deadLine,
          unLockTime,
          publishTime,
          unLockUserName,
          bidPurchaseDateSortData,
          publishTimeSortData,
          unLockTimeSortData,
          deadLineSortData,
        } = this.filterObj
        if (bidPurchaseDateSortData) {
          if (bidPurchaseDateSortData.value === 'ascend') {
            //升序
            this.queryData.sort = 2
          } else {
            //降序
            this.queryData.sort = 1
          }
        } else if (deadLineSortData) {
          if (deadLineSortData.value === 'ascend') {
            //升序
            this.queryData.sort = 8
          } else {
            //降序
            this.queryData.sort = 7
          }
        } else if (unLockTimeSortData) {
          if (unLockTimeSortData.value === 'ascend') {
            //升序
            this.queryData.sort = 4
          } else {
            //降序
            this.queryData.sort = 3
          }
        } else if (publishTimeSortData) {
          if (publishTimeSortData.value === 'ascend') {
            //升序
            this.queryData.sort = 6
          } else {
            //降序
            this.queryData.sort = 5
          }
        } else {
          this.queryData.sort = 3
        }
        Object.assign(this.queryData, {
          cataId: cata && cata.value.join(','),
          projectStage: projectStageName && projectStageName.value.join(','),
          bidCityId: bidCityName && bidCityName.value.join(','),
          unLockUserName: unLockUserName && unLockUserName.value.searchKey,
          minPurchaseDate: bidPurchaseDate && bidPurchaseDate.value[0],
          maxPurchaseDate: bidPurchaseDate && bidPurchaseDate.value[1],
          minPublishTime: publishTime && publishTime.value[0],
          maxPublishTime: publishTime && publishTime.value[1],
          minUnLockTime: unLockTime && unLockTime.value[0],
          maxUnLockTime: unLockTime && unLockTime.value[1],
          minDeadLine: deadLine && deadLine.value[0],
          maxDeadLine: deadLine && deadLine.value[1],
          pageNum: this.page,
          pageSize: this.pageSize,
        })
        getUnLockList(this.queryData).then(res => {
          this.isLoading = false
          let dataList =
            res.data &&
            res.data.list.map(item => {
              item.title = {
                value: 'detail',
                label: item.title,
              }
              return item
            })
          this.dataSource = dataList || []
          this.total = res.data && res.data.total
          this.columns.forEach(item => {
            switch (item.dataIndex) {
              case 'cata':
                item.checkOpts =
                  res.data &&
                  res.data.searchList.businessType.map(item => {
                    return {
                      label: item.name,
                      value: item.id,
                    }
                  })
                break
              case 'projectStageName':
                item.checkOpts =
                  res.data &&
                  res.data.searchList.projectStage.map(item => {
                    return {
                      label: item.name,
                      value: item.id,
                    }
                  })
                break
              default:
                break
            }
          })
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
      handleRowClick(e, action, row) {
        this.$globalDrawer.show({
          component: OrderDetail,
          options: {
            name: 'OrderDetail',
            title: '需求详情',
            props: { articleId: row.articleId, unLockUserId: row.unLockUserId, rowId: row.id },
          },
        })
      },
    },
  }
</script>
<style></style>
