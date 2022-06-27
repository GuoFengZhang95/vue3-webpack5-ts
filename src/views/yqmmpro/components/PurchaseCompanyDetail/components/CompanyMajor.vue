<template>
  <div class="company-major-wrap">
    <div class="news-list-wrap">
      <!-- 列表 -->
      <MuTable
        ref="mumuTable"
        :has-index="true"
        :is-loading="mixinLoding"
        :page="commonRequestParams.pno"
        :page-size="commonRequestParams.perpage"
        :total="total"
        :total-visible="false"
        :columns="columns"
        :data-source="dataSource"
        @pageChange="handlePageNumChange"
        @pageSizeChange="handlePageSizeChange"
        @reloadTable="reloadTable"
        @handleRowClick="handleRowClick"
      >
        <template slot="action">
          <MuSearchGroup
            :select-visible="false"
            :placeholder="searchPlaceholder"
            @search="handleSearchConfirm"
            @selectChange="handleSearchSelectChange"
          ></MuSearchGroup>
        </template>
      </MuTable>
    </div>
  </div>
</template>

<script>
  import { tableMix, loadingMix } from '@/mixin/index'
  import { cloneDeep } from '@/utils/index'
  import { getNewsList, addYqmmSearchLog } from '@/api/index.js'
  import { getNewsColumns, majorTableListFilter } from '@/service/index.js'
  const NewsDetail = () => import('@/views/yqmmpro/components/NewsDetail.vue')
  export default {
    name: 'CompanyMajor',
    components: {},
    mixins: [tableMix, loadingMix()],
    data() {
      return {
        searchType: 6,
        /**搜索框下拉数据 */
        selectOptions: [],
        /**表格公共入参 */
        commonRequestParams: {
          /**页码 */
          pno: 1,
          /**每页数 */
          perpage: 20,
        },
        searchPlaceholder: '',
        /**页面特有的列表入参 */
        pageRequestParams: {
          /**搜索条件 */
          keyword: '',
          /**是否高亮 */
          isHighlight: 1,
          /**是否需要置顶 */
          isNeedTop: 1,
          /**是否热点 */
          isHot: 0,
          /**0-相关度 1-发布时间倒叙 */
          sort: 1,
        },
        columns: getNewsColumns()
      }
    },
    computed: {
      unionRequestParams() {
        this.pageRequestParams.isNeedTop = this.pageRequestParams.keyword ? 0 : 1
        return Object.assign({}, this.commonRequestParams, this.pageRequestParams)
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.handleQuery()
      },
      async handleQuery() {
        this.toggleMixinLoading(true)
        const res = await getNewsList(this.unionRequestParams)
        if (res.success) {
          if (this.unionRequestParams.keyword) {
            const logRes = await addYqmmSearchLog({
              isHotSearch: !!res?.data?.list?.length,
              searchClient: 1,
              searchKey: this.unionRequestParams.keyword,
              searchPlatform: 8,
              searchType: 6,
            })
            if (logRes.code === '0') {
              this.$refs['YqmmproPageSearch'].updateSearchLog(this.searchType)
            }
          }
          if (res.data) {
            this.newsList = cloneDeep(res.data)
            this.dataSource = majorTableListFilter({ list: res.data })
            this.total = res.totalCount ? res.totalCount : 0
          }
        }
        this.toggleMixinLoading(false)
      },
      handleSearchSelectChange() {

      },
      /**执行顶部搜索*/
      handleSearchConfirm() {
        this.commonRequestParams.pno = 1
        this.commonRequestParams.perpage = 20
        this.handleQuery()
      },
      /**页码变更 */
      handlePageNumChange(page) {
        this.commonRequestParams.pno = page
        this.handleQuery()
      },
      /**每页数变更 */
      handlePageSizeChange(page, pageSize) {
        this.commonRequestParams.pno = 1
        this.commonRequestParams.perpage = pageSize
        this.handleQuery()
      },
      // 表格操作
      handleRowClick(clickType, rowData, record) {
        if (clickType === 'action') {
          if (rowData.key === 'title') {
            this.$globalDrawer.show({
              component: NewsDetail,
              options: {
                name: 'NewsDetail',
                title: '重大商情详情',
                props: { id: record.articleId },
              },
            })
          }
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .news-list-wrap {
    > .mumuxili-table {
      /deep/ .action {
        padding: 0 0 12px!important;
      }
    }
    .news-list {
      display: grid;
      grid-template-columns: repeat(1, 100%);
      row-gap: 16px;
    }
  }

  /deep/.pagition-act {
    > span {
      display: none;
    }
  }
</style>
