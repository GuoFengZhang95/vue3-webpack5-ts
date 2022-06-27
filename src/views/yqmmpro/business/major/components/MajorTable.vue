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
        <div class="left">
          <MuSearchGroup
            :ref="keys"
            :select-visible="false"
            :has-reset="hasReset"
            placeholder="标题"
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
  import NewsDetail from '@/views/yqmmpro/components/NewsDetail'
  import { tableMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { getUnLockList } from '@/api/index.js'
  import { deleteTableColumns, getNewsColumns, majorTableListFilter } from '@/service/index.js'
  export default {
    name: 'MajorTable',
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
          {
            value: 0,
            label: '综合搜索',
          },
          {
            value: 1,
            label: '标题',
          },
        ],
        queryData: {
          module: 4,
          subModule: this.keys === 'mine' ? 1 : 2,
          searchType: 1,
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
        immediate: true,
        handler(val) {
          let columns = cloneDeep([
            ...deleteTableColumns(getNewsColumns({ filterVisible: ['publishTime'] }), [
              'cityName',
              'companyName',
              'companyType',
            ]),
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
    mounted() {
      this.init()
    },
    methods: {
      //初始化数据
      init() {
        this.defaultTableInit()
      },
      //表格公用方法
      async defaultTableInit() {
        if ((await this.$parent.checkListPower()) === 3 && this.$parent.tabList.length === 2) return

        this.queryData.affiliatedCompany = this.baseUserInfo.companyId
        this.isLoading = true
        const { publishTime, unLockTime, unLockUserName, unLockTimeSort, publishTimeSort } =
          this.filterObj
        if (publishTimeSort) {
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
          unLockUserName: unLockUserName && unLockUserName.value.searchKey,
          minPublishTime: publishTime && publishTime.value[0],
          maxPublishTime: publishTime && publishTime.value[1],
          minUnLockTime: unLockTime && unLockTime.value[0],
          maxUnLockTime: unLockTime && unLockTime.value[1],
          pageNum: this.page,
          pageSize: this.pageSize,
        })
        getUnLockList(this.queryData).then(res => {
          this.isLoading = false
          this.total = res.data.total
          this.dataSource = majorTableListFilter({ list: res.data.list })
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
        console.log(clickType, rowData, record)
        if (clickType === 'action') {
          if (rowData.key === 'title') {
            this.$globalDrawer.show({
              component: NewsDetail,
              options: {
                name: 'NewsDetail',
                title: '重大商情详情',
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
