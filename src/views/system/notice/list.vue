<template>
  <MuTable
    ref="mumuTable"
    row-key="noticeId"
    :is-loading="isLoading"
    :total="total"
    :page="queryParams.pageNum"
    :page-size="queryParams.pageSize"
    :columns="columns"
    :data-source="dataSource"
    :setting-act-flag="false"
    :resize-height-offset="163"
    :highlight="true"
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
          :select-visible="false"
          :has-reset="hasReset"
          placeholder="请输入标题"
          :options-list="[]"
          @resetFilter="resetFilter"
          @search="handleSearch"
        ></MuSearchGroup>
      </div>
    </template>
    <template #title="slotProps">
      <div v-if="slotProps.record" class="notice-tittle" @click="openNoticeDetail(slotProps)">
        <div class="title" :class="{ 'no-read': slotProps.record.isRead !== 1 }">
          {{ slotProps.text }}
        </div>
      </div>
    </template>
  </MuTable>
</template>

<script>
  import { getSystemNoticeList } from '@/api/index.js'
  import NoticeDetail from './components/detail'
  import { tableMix } from '@/mixin/index'
  export default {
    name: 'SystemNotice',
    mixins: [tableMix],
    data() {
      return {
        columns: [
          {
            title: '标题',
            dataIndex: 'title',
            type: 'slot',
          },
          {
            title: '通知类型',
            dataIndex: 'type',
            filter: ['search'],
            filterKey: ['type'],
            checkOpts: [],
          },
          {
            title: '发送人',
            dataIndex: 'senderName',
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
          },
        ],
        queryParams: {
          pageNum: 1,
          pageSize: 20,
          searchKey: '',
          type: '',
        },
        total: 0,
      }
    },
    computed: {
      hasReset() {
        return this.columns.some(c => c.filtered)
      },
    },
    mounted() {
      this.init()
      this.$bus.$on('noticeDetailLoaded', id => {
        this.dataSource = this.dataSource.map(item => {
          if (item.noticeId === id) {
            item.isRead = 1
          }
          return item
        })
      })
    },
    methods: {
      init() {
        this.defaultTableInit()
      },
      // 列表数据
      defaultTableInit() {
        this.queryParams.pageNum = 1
        this.handleQuery()
      },
      async handleQuery() {
        this.loading = true
        this.queryParams.type = this.filterObj?.type?.value.join(',') ?? ''
        const res = await getSystemNoticeList(this.queryParams)
        if (res.code === '0') {
          const noticeTypeList = res.data.searchList.noticeTypeList
          this.dataSource = res.data.list.map(item => {
            item.type = noticeTypeList.find(noticeItem => noticeItem.value === item.type).label
            return item
          })
          this.total = res.data.totalCount
          this.columns.forEach(item => {
            if (item.dataIndex === 'type') {
              item.checkOpts = res.data.searchList.noticeTypeList
            }
          })
        }
        this.loading = false
      },
      // 表格操作
      openNoticeDetail(slotProps) {
        this.$globalDrawer.show({
          component: NoticeDetail,
          options: {
            name: 'NoticeDetail',
            title: '消息详情',
            props: { id: slotProps.record.noticeId },
          },
        })
      },
      // 全局搜索
      handleSearch(e) {
        this.queryParams.pageNum = 1
        this.queryParams.searchKey = e
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
    },
  }
</script>

<style lang="less" scoped>
  .notice-tittle {
    color: #00c7db;
    cursor: pointer;

    .title {
      position: relative;
      display: inline-block;

      &.no-read::after {
        position: absolute;
        content: '';
        right: -10px;
        top: 14px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #ff4433;
        overflow: hidden;
      }
    }
  }
</style>

<style lang="less"></style>
