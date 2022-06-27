<template>
  <div id="order-list">
    <MuTable
      :has-index="true"
      :is-loading="isLoading"
      :page="page"
      :page-size="pageSize"
      :total="total"
      :page-size-options="pageSizeOptions"
      table-model="simple"
      :columns="columns"
      :data-source="dataSource"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
      @setTableHeader="setTableHeader"
      @dragTableHeaderOver="dragTableHeaderOver"
      @reloadTable="reloadTable"
      @handleFilter="handleFilter"
      @handleRowClick="handleRowClick"
    ></MuTable>
  </div>
</template>

<script>
  import { getBusinessList } from '@/api/index.js'
  import { tableMix } from '@/mixin/index'
  const ReceiveOrderDetail = () => import('./receiveOrderDetail.vue')
  export default {
    name: 'DemandList',
    mixins: [tableMix],
    props: {
      businessId: {
        type: Number,
        default: 0,
      },
      rowId: {
        type: Number,
        default: 0,
      },
      lockId: {
        type: [Number, String],
        default: 0,
      },
    },
    data() {
      return {
        addOrderKey: new Date().getTime(),
        pageSizeOptions: ['20', '30', '50'],
        columns: [
          {
            dataIndex: 'userName',
            title: '用户名',
            ellipsis: true,
            align: 'left',
            default: true,
          },
          {
            dataIndex: 'companyName',
            title: '所属企业',
            ellipsis: true,
            align: 'left',
            default: true,
          },
          {
            dataIndex: 'status',
            title: '状态',
            ellipsis: true,
            align: 'left',
            default: true,
          },
          {
            dataIndex: 'demandType',
            title: '接单详情',
            ellipsis: true,
            align: 'left',
            default: true,
            type: 'action',
          },
        ],
      }
    },
    computed: {},
    watch: {
      rowId: {
        handler(newVal) {
          if (newVal) {
            this.init()
          }
        },
        immediate: true,
      },
    },
    methods: {
      init() {
        this.defaultTableInit()
      },
      // table组件统一方法
      async defaultTableInit() {
        this.queryObj = {
          businessId: this.businessId,
          page: this.page,
          pageSize: this.pageSize,
        }
        await this.handleQuery()
      },
      // 获取列表信息
      async handleQuery() {
        this.isLoading = true
        getBusinessList(this.queryObj).then(res => {
          this.isLoading = false
          this.total = res.data.total
          if (!res.data.list) {
            this.dataSource = []
          } else {
            this.dataSource = res.data.list.map((e, i) => {
              return {
                id: e.id,
                userId: e.userId,
                status: e.orderStatusName,
                companyName: e.companyName,
                userName: e.userName,
                demandType:
                  this.lockId === e.userId
                    ? {
                        value: 'action',
                        label: '查看',
                      }
                    : {
                        value: '',
                        label: '',
                      },
              }
            })
          }
        })
      },
      //点击详情
      async handleRowClick(clickType, rowData, record) {
        if (rowData.value === 'action') {
          this.addOrderKey = new Date().getTime()
          this.$globalDrawer.show({
            component: ReceiveOrderDetail,
            options: {
              name: 'ReceiveOrderDetail',
              title: '接单详情',
              props: { acceptId: record.id },
            },
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  #order-list {
    /deep/ .mumuxili-table {
      .action {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    }
  }
</style>
