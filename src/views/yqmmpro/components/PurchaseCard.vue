<template>
  <div class="purchase-panel" @click="toPurchaseDetail">
    <div class="purchase-panel-top">
      <div class="left show-line_1">
        <div v-if="renderItem.isTop === 1" class="mark top">置顶</div>
        <div v-if="renderItem.isChoice === 1" class="mark right-choice">精选</div>
        <div class="title show-line_1" v-html="renderItem.bidName"></div>
      </div>
      <div class="right">
        <div v-if="renderItem.bidPurchaseBudget" class="mark price">
          {{ renderItem.bidPurchaseBudget }}万元
        </div>
        <div v-if="renderItem.bidPurchaseDate" class="mark date">
          {{ renderItem.bidPurchaseDate }}
        </div>
      </div>
    </div>
    <div class="purchase-panel-content">
      <div
        v-if="renderItem.purchaseItemStr"
        class="purchase-items show-line_1"
        v-html="'采购产品：' + renderItem.purchaseItemStr"
      ></div>
      <div
        v-if="renderItem.bidProduct"
        class="purchase-product show-line_1"
        v-html="'采购产品：' + renderItem.bidProduct"
      ></div>
    </div>
    <div class="purchase-panel-footer">
      <div class="left">
        <template v-if="renderItem.bidCityName || renderItem.bidCity || renderItem.bidProvinceName">
          <div class="city show-line_1">
            {{ renderItem.bidCityName || renderItem.bidCity || renderItem.bidProvinceName }}
          </div>
        </template>
        <!-- 因为城市超过4个字符省略所以分割线单独写 overflow:hidden会使伪元素消失 -->
        <template
          v-if="
            (renderItem.bidCityName || renderItem.bidCity || renderItem.bidProvinceName) &&
            renderItem.bidCompany
          "
        >
          <div class="split-line">|</div>
        </template>
        <template v-if="renderItem.bidCompany">
          <div class="company show-line_1" v-html="renderItem.bidCompany"></div>
        </template>
      </div>
      <div class="right">{{ renderItem.publishTime }}</div>
    </div>
    <div v-if="renderItem.isRead == 0 && dealRead" class="icon-no-read"></div>
  </div>
</template>

<script>
  import PurchaseDetail from '@/views/yqmmpro/components/PurchaseDetail.vue'
  import { cloneDeep, replaceHtmlTag } from '@/utils/index.js'
  export default {
    name: 'PurchaseCard',
    filters: {
      replaceSemiWithExcl(str) {
        if (str) {
          return str.replace(/;/g, '、')
        } else {
          return str
        }
      },
    },
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      /**是否需要处理已读未读 */
      dealRead: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        renderItem: {}, // 需要高亮的对象
      }
    },
    watch: {
      item: {
        handler(newVal) {
          this.renderItem = cloneDeep(newVal)
          this.renderItem.bidName = replaceHtmlTag({ value: newVal.bidName })
          // 因为要满足搜索高亮所以后端新加了xxxSearch字段
          this.renderItem.bidCompany = replaceHtmlTag({ value: newVal.bidCompanySearch || newVal.bidCompany })
          this.renderItem.bidProduct = replaceHtmlTag({
            value: newVal.bidProductSearch || newVal.bidProduct,
          }).replace(/;/g, '、')
          this.renderItem.purchaseItemStr = replaceHtmlTag({
            value: newVal.purchaseItemStrSearch || newVal.purchaseItemStr,
          }).replace(/,/g, '、')
        },
        immediate: true,
      },
    },
    methods: {
      // 去采购意向详情页
      async toPurchaseDetail() {
        this.renderItem.isRead = 1
        const id =
          this.renderItem.tokenEncodeId ||
          this.renderItem.contentId ||
          this.renderItem.articleId ||
          this.renderItem.objectId
        this.$globalDrawer.show({
          component: PurchaseDetail,
          options: {
            name: 'PurchaseDetail',
            title: '采购意向详情',
            props: { id: id },
          },
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .purchase-panel {
    position: relative;
    padding: 16px;
    width: auto;
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 12px;
    border: 1px solid #ececec;
    cursor: pointer;

    .purchase-panel-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      height: 24px;
      .mark {
        padding: 0 6px;
        height: 20px;
        line-height: 20px;
        background: #ff9919;
        font-size: 12px;
        color: #ffffff;
        border-radius: 2px;
        min-width: max-content;
        white-space: nowrap;
      }
      .left {
        display: flex;
        align-items: center;
        flex: auto;
        padding-right: 24px;
        .top {
          margin-right: 8px;
          background: #1aa7f1;
        }
        .right-choice {
          margin-right: 8px;
        }
        .title {
          color: #444444;
          // max-width: 632px;
          line-height: 20px;
          font-weight: 700;
        }
      }
      .right {
        display: flex;
        min-width: max-content;
        white-space: nowrap;
        .price,
        .date {
          height: 24px;
          line-height: 24px;
        }
        .price {
          background: rgba(255, 153, 25, 0.15);
          color: #ff9919;
        }
        .date {
          background: rgba(27, 168, 241, 0.15);
          color: #1ba8f1;
          margin-left: 10px;
        }
      }
    }
    .purchase-panel-content {
      position: relative;
      color: #666666;
      font-size: 13px;
      line-height: 21px;
      margin-bottom: 22px;
      // height: 42px;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -12px;
        width: 100%;
        height: 1px;
        background: rgba(233, 233, 233, 0.5);
      }
    }
    .purchase-panel-footer {
      display: flex;
      justify-content: space-between;
      color: #999999;
      font-size: 12px;
      line-height: 14px;
      .left {
        display: flex;
        align-items: center;
        .city {
          position: relative;
          margin-right: 10px;
          max-width: 58px;
        }
        .split-line {
          margin-right: 10px;
          color: rgba(233, 233, 233, 0.5);
        }
        .company {
          max-width: 252px;
        }
      }
    }
    // 未读小红点
    .icon-no-read {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 50%;
    }
  }
</style>
