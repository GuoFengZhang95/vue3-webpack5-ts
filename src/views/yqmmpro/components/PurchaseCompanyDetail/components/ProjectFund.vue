<template>
  <div class="yqmmpro-customer-fund">
    <div class="fund-list-wrap">
      <!-- 列表 -->
      <MuTable
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
        :total="total"
        :total-visible="false"
        :columns="columns"
        :scroll="{ y: 500 }"
        :data-source="dataSource"
        :pagination-flag="showPagination"
        @pageChange="handlePageNumChange"
        @pageSizeChange="handlePageSizeChange"
        @reloadTable="reloadTable"
        @handleRowClick="handleRowClick"
      >
        <template slot="action">
          <div class="search-action">
            <MuSearchGroup
              :options-list="selectOptions"
              :placeholder="searchPlaceholder"
              @search="handleSearchConfirm"
              @selectChange="handleSearchSelectChange"
            ></MuSearchGroup>
          </div>
        </template>
        <!-- 名称 -->
        <template #projectNameSlot="slotProps">
          <a-tooltip>
            <template slot="title">
              <i>{{ slotProps.text.text }}</i>
            </template>
            <span style="color: #00c7db" v-html="slotProps.text.html"></span>
          </a-tooltip>
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
      <EquityPaginationMask v-if="!showPagination && loadingStatus === 3"></EquityPaginationMask>
    </div>
  </div>
</template>

<script>
  import { loadingMix, tableMix } from '@/mixin/index'
  import { getFundList, addYqmmSearchLog, getRemainCardTimes } from '@/api/index.js'
  import { fundTableListFilter } from '@/service/index.js'
  const FundDetail = () => import('@/views/yqmmpro/components/FundDetail.vue')
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')
  export default {
    name: 'ProjectFund',
    components: {},
    mixins: [
      loadingMix(),
      tableMix,
    ],
    data() {
      return {
        /**表格公共入参 */
        commonRequestParams: {
          /**页码 */
          pageNum: 1,
          /**每页数 */
          pageSize: 20,
        },
        /**页面特有的列表入参 */
        pageRequestParams: {
          /**搜索条件 */
          searchKey: '',
          /**搜索类型  */
          searchType: '0',
          /**是否高亮 */
          isHighlight: 1,
          /**排序 */
          sort: 2,
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
            value: '3',
          },
          {
            label: '依托单位',
            value: '4',
          },
        ],
        searchPlaceholder: '请输入搜索内容',
        columns: [
          {
            dataIndex: 'projectName',
            title: '名称',
            default: true,
            width: 250,
            type: 'slot',
            slotName: 'projectNameSlot',
          },
          {
            dataIndex: 'projectNum',
            title: '批准号',
            extend: true
          },
          {
            dataIndex: 'projectTypeName',
            title: '类型',
            extend: true
          },
          {
            dataIndex: 'projectCategoryName',
            title: '级别-来源-类别',
            width: 150,
          },
          {
            dataIndex: 'projectSourceCityName',
            title: '来源城市',
            extend: true
          },
          {
            dataIndex: 'projectSubjectName',
            title: '学科',
            extend: true
          },
          {
            dataIndex: 'projectFunds',
            title: '科研经费（万元）',
          },
          {
            dataIndex: 'memberCityNames',
            title: '依托单位所属城市',
          },
          {
            dataIndex: 'memberCompanyNames',
            title: '依托单位',
          },
          {
            dataIndex: 'memberUserName',
            title: '负责人',
            type: 'slot',
            slotName: 'userSlot',
          },
          {
            dataIndex: 'approveYear',
            title: '批准年份',
            extend: true
          },
          {
            dataIndex: 'startTime',
            title: '立项时间',
          },
          {
            dataIndex: 'endTime',
            title: '结项时间',
            extend: true
          },
        ],
        /**权益卡基金剩余次数 */
        remainTotalTimes: 0,
      }
    },
    computed: {
      /**是否展示分页（当前模块是否有额度） */
      showPagination() {
        return this.remainTotalTimes > 0 || this.remainTotalTimes === -1
      },
      unionRequestParams() {
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.getRemainTimes()
        this.handleQuery()
      },
      getRemainTimes() {
        getRemainCardTimes({ type: 7 }).then(({ code, data: { remainCardTimes } }) => {
          if (code === '0') {
            this.remainTotalTimes = remainCardTimes
          }
        })
      },
      async handleQuery() {
        this.toggleMixinLoading(true)
        const res = await getFundList(this.unionRequestParams)
        if (res.code === '0') {
          // if (this.unionRequestParams.searchKey) {
          //   const logRes = await addYqmmSearchLog({
          //     isHotSearch: !!res?.data?.list?.length,
          //     searchClient: 1,
          //     searchKey: this.unionRequestParams.searchKey,
          //     searchPlatform: 8,
          //     searchType: this.searchType,
          //   })
          //   if (logRes.code === '0') {
          //     this.$refs['YqmmproPageSearch'].updateSearchLog(this.searchType)
          //   }
          // }
          if (res.data && res.data.list) {
            this.dataSource = fundTableListFilter({ list: res.data.list })
            // this.dataSource = res.data.list.map(item => {
            //   item.projectName = {
            //     key: 'projectName',
            //     html: this.highLightEm(item.projectName),
            //     text: item.projectName
            //   }
            //   return item
            // })
            console.log(this.dataSource)
            this.total = res.data && res.data.total ? res.data.total : 0
          }
        }
        this.selectedRowKeys = []
        this.toggleMixinLoading(false)
      },
      // 给em标签增加高亮
      highLightEm(str) {
        return str.replaceAll('<em>', '<em style="color: #FF4433">')
      },
      handleSearchSelectChange(type) {
        this.pageRequestParams.searchType = type
      },
      handleSearchConfirm(key) {
        this.pageRequestParams.searchKey = key
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = 20
        this.handleQuery()
      },
      /**页码变更 */
      handlePageNumChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.getRemainTimes()
        this.commonRequestParams.pageNum = page
        this.handleQuery()
      },
      /**每页数变更 */
      handlePageSizeChange(page, pageSize) {
        this.selectAll = false
        this.selectedRowKeys = []
        this.getRemainTimes()
        this.commonRequestParams.pageNum = 1
        this.commonRequestParams.pageSize = pageSize
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
                props: { id: record.targetId },
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
  .yqmmpro-customer-fund {
    .fund-list-wrap {
      > .mumuxili-table {
        /deep/ .action {
          padding: 0 0 12px!important;
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

      // /deep/ .mumuxili-table {
      //   .action {
      //     display: none;
      //   }
      // }

      .fund-list {
        display: grid;
        grid-template-columns: repeat(2, calc(50% - 8px));
        column-gap: 16px;
        row-gap: 12px;
      }
    }

    /deep/ .ant-popover-inner-content {
      padding: 0px;
    }

    .subject-slot,
    .level-slot {
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
</style>
