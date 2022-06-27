/** * 用于详情页的分页组件 */
<template>
  <div class="detail-pagination">
    <a-pagination
      :current="currentNum"
      :page-size="pageSize"
      :default-current="defaultCurrent"
      :item-render="itemRender"
      :total="renderTotal"
      @change="handlePageNumChange"
    ></a-pagination>
  </div>
</template>

<script>
  // import { scrollAnimation } from '~/utils/index'
  export default {
    name: 'DetailPagination',
    props: {
      pageSize: {
        type: Number,
        default: 10,
      },
      total: {
        type: Number,
        default: 0,
      },
      defaultCurrent: {
        type: Number,
        default: 1,
      }, // 默认的当前页数
      currentNum: {
        type: Number,
        default: 1, // 当前页数
      },
    },
    data() {
      return {
        renderTotal: 0,
      }
    },
    watch: {
      total: {
        handler() {
          this.handleTotal()
        },
        immediate: true,
      },
      pageSize: {
        handler() {
          this.handleTotal()
        },
        immediate: true,
      },
    },
    methods: {
      itemRender(current, type, originalElement) {
        if (type === 'prev') {
          return <a class='page'>上一页</a>
        } else if (type === 'next') {
          return <a class='page'>下一页</a>
        }
        return originalElement
      },
      handleTotal() {
        if (this.total != undefined && this.pageSize != undefined) {
          let all = this.total > 5000 ? 5000 : this.total
          let count1 = Math.ceil(all / this.pageSize)
          let count2 = Math.floor(all / this.pageSize)
          this.renderTotal =
            this.pageSize * count1 > 5000
              ? this.pageSize * count2
              : this.pageSize * count1 > this.total
              ? this.total
              : this.pageSize * count1
        }
      },
      // 页数变化
      handlePageNumChange(page, pageSize) {
        // scrollAnimation(0)
        this.$emit('pageChange', { page, pageSize })
      },
    },
  }
</script>

<style lang="less" scoped>
  .detail-pagination {
    position: relative;
    /deep/ .ant-pagination {
      width: fit-content;
      margin: 32px auto;
      .ant-pagination-disabled {
        .page {
          color: #999;
        }
      }
    }
    /deep/.page {
      display: inline-block;
      width: 74px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      color: #666;
      text-align: center;
      border-radius: 4px 4px 4px 4px;
      background-color: white;
    }
  }
</style>
