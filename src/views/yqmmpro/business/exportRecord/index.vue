<template>
  <div class="yqmmpro-business-export-record">
    <MuTable
      ref="mumuTable"
      row-key="id"
      :has-index="true"
      :is-loading="isLoading"
      :page="page"
      :page-size="pageSize"
      :total="total"
      :columns="columns"
      :data-source="dataSource"
      :resize-height-offset="163"
      :selected-row-keys="selectedRowKeys"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
      @selectChange="selectChange"
      @reloadTable="reloadTable"
      @handleFilter="handleFilter"
      @handleRowClick="handleRowClick"
    ></MuTable>
  </div>
</template>

<script>
  import { tableMix } from '@/mixin/index'
  import { getExportList, retryExport } from '@/api/index.js'
  // import { yqmmBusinessMix } from '@/mixin/index'
  export default {
    name: 'YqmmproExportRecord',
    components: {},
    mixins: [tableMix],
    // mixins: [yqmmBusinessMix({ moduleId: 6 })],
    data() {
      return {
        columns: [
          {
            dataIndex: 'taskCode',
            title: '任务编码',
          },
          {
            dataIndex: 'exportType',
            title: '分类',
            filter: ['search'],
            filterKey: 'exportType',
            checkOpts: [],
          },
          {
            dataIndex: 'operationName',
            title: '操作人',
            filter: ['search'],
            filterKey: 'operationName',
            checkOpts: [],
          },
          {
            dataIndex: 'operationTime',
            title: '操作时间',
            filter: ['sort', 'date'],
            filterKey: ['operationTimeSort', 'operationTime'],
          },
          {
            dataIndex: 'status',
            title: '状态',
            type: 'status',
            filter: ['search'],
            filterKey: 'status',
            checkOpts: [],
          },
          {
            dataIndex: 'operate',
            title: '操作',
            type: 'action',
            tips: '导出记录仅为您保留1年，一年后下载链接会失效。',
          },
        ],
        /**页面特有的列表入参 */
        pageRequestParams: {
          exportType: '',
          operationStartTime: '',
          operationEndTime: '',
          operationIds: '',
          sort: 0,
          status: '',
        },
        exportStatusMap: new Map([
          ['等待中', 'warning'],
          ['进行中', 'warning'],
          ['已完成', 'success'],
          ['异常终止', 'error'],
        ]),
      }
    },
    computed: {
      unionRequestParams() {
        return Object.assign(
          {},
          { pageNum: this.page, pageSize: this.pageSize },
          this.pageRequestParams
        )
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.defaultTableInit()
      },
      //表格公用方法
      async defaultTableInit() {
        this.isLoading = true
        // console.log('filterObj', this.filterObj)
        let sort = this.filterObj?.operationTimeSort?.value
        if (sort === undefined) {
          sort = 0
        } else if (sort === 'descend') {
          sort = 0
        } else if (sort === 'ascend') {
          sort = 1
        } else {
          sort = 0
        }
        this.pageRequestParams.exportType = this.filterObj
        this.pageRequestParams = Object.assign(this.pageRequestParams, {
          exportType: this.filterObj?.exportType?.value?.join(','),
          operationStartTime: this.filterObj?.operationTime?.value[0],
          operationEndTime: this.filterObj?.operationTime?.value[1],
          operationIds: this.filterObj?.operationName?.value?.join(','),
          sort,
          status: this.filterObj?.status?.value?.join(','),
        })
        const res = await getExportList(this.unionRequestParams)
        this.isLoading = false
        this.total = res.data.total
        this.dataSource = res.data.list.map(item => {
          let operateLabel = ''
          if (item.status === '异常终止') {
            operateLabel = '重试'
          } else {
            operateLabel = item.exportName
          }
          return {
            ...item,
            operate: {
              key: 'operate',
              label: operateLabel,
              disabled: (!item.exportFileUrl || item.isExpired === 1) && item.status !== '异常终止',
            },
            status: {
              label: item.status,
              status: this.exportStatusMap.get(item.status),
            },
          }
        })
        this.columns = this.columns.map(item => {
          if (item.dataIndex === 'exportType') {
            item.checkOpts = res.data.searchList.exportType.map(item => {
              return {
                label: item.name,
                value: item.id,
              }
            })
          }
          if (item.dataIndex === 'status') {
            item.checkOpts = res.data.searchList.status.map(item => {
              return {
                label: item.name,
                value: item.id,
              }
            })
          }
          if (item.dataIndex === 'operationName') {
            item.checkOpts = res.data.searchList.operation.map(item => {
              return {
                label: item.name,
                value: item.id,
              }
            })
          }
          return item
        })
      },
      // 表格操作
      handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          if (rowData.key === 'operate') {
            if (record.exportFileUrl) {
              if (record.isExpired === 1) {
                this.$message.error('链接已失效！')
              } else {
                window.open(record.exportFileUrl)
                // const a = document.createElement('a')
                // a.download = record.exportName
                // a.href = record.exportFileUrl
                // a.target = '_sefl'
                // // a.type = type
                // const event = new MouseEvent('click')
                // a.dispatchEvent(event)
              }
            } else if (record.status.label === '异常终止') {
              retryExport({ retryId: record.id }).then(res => {
                if (res.code === '0') {
                  this.$message.success('已重新导出，刷新页面查看最新导出状态')
                }
              })
            }
          }
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  // .yqmmpro-business-export-record {
  // }
</style>
