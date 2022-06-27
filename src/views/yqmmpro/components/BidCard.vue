<template>
  <div class="bid-panel-wrapper" @click="toBidDetail">
    <div class="bid-panel-top">
      <div v-if="renderItem.isTop == 1" class="mask top">置顶</div>
      <div v-if="renderItem.isChoice == 1" class="mask right-choice">精选</div>
      <div class="title show-line_1" v-html="renderItem.title"></div>
    </div>
    <div v-if="renderItem.bidProduct || bidBudget || renderItem.content" class="bid-panel-content">
      <div v-if="renderItem.bidProduct || bidBudget" class="mask-wrap">
        <div v-if="renderItem.bidProduct" class="mask product show-line_1">
          {{ renderItem.bidProduct }}
        </div>
        <div v-if="bidBudget" class="mask price">{{ bidBudget }}万元</div>
      </div>
      <div
        v-if="renderItem.content"
        class="article-content show-line_2"
        v-html="renderItem.content"
      ></div>
    </div>
    <div class="bid-panel-content module-list">
      <div v-if="bidNoVisible" class="module-item">
        <div class="dl">项目编号：</div>
        <div class="dt">{{ renderItem.bidNo }}</div>
      </div>
      <!-- todo 采购单位id待确认 -->
      <div v-if="bidCompanyVisible" class="module-item">
        <div class="dl">采购单位：</div>
        <div
          class="dt"
          :class="{ clickable: !!renderItem.companyId }"
          @click.stop="goPurchaseCompanyDetail"
        >
          {{ renderItem.bidCompany }}
        </div>
      </div>
      <!-- todo 招标代理单位id待确认 -->
      <div v-if="agencyCompanyVisible" class="module-item">
        <div class="dl">代理单位：</div>
        <div class="dt">{{ renderItem.agencyCompany }}</div>
      </div>
      <div v-if="winBidStrVisible" class="module-item">
        <div class="dl">中标信息：</div>
        <div class="dt">{{ renderItem.winBidStr }}</div>
      </div>
    </div>
    <div class="bid-panel-footer">
      <div class="left">
        <div v-if="renderItem.bidTypeName" class="bid-type">
          {{ renderItem.bidTypeName }}
        </div>
        <template v-if="renderItem.bidCityName || renderItem.bidCity || renderItem.bidProvinceName">
          <div class="city show-line_1">
            {{ renderItem.bidCityName || renderItem.bidCity || renderItem.bidProvinceName }}
          </div>
          <!-- 因为城市超过4个字符省略所以分割线单独写 overflow:hidden会使伪元素消失 -->
          <div v-if="renderItem.bidCompany" class="split-line">|</div>
        </template>
        <template v-if="renderItem.bidCompany">
          <div
            v-if="renderItem.bidCompanySearch"
            class="company show-line_1"
            v-html="renderItem.bidCompanySearch"
          ></div>
        </template>
      </div>
      <div class="right">{{ renderItem.publishTime }}</div>
    </div>
    <!-- 是否未读 -->
    <div v-if="isRead == 0 && dealRead" class="icon-no-read"></div>
  </div>
</template>

<script>
  import { cloneDeep, replaceHtmlTag } from '@/utils/index.js'
  import BidDetail from './BidDetail/index.vue'
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  export default {
    name: 'BidCard',
    props: {
      /**外部传入的卡片信息 */
      info: {
        type: Object,
        default: () => {},
      },
      /**是否需要处理已读未读 */
      dealRead: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        renderItem: {},
        bidBudget: '',
        isRead: 1,
      }
    },
    computed: {
      bidNoVisible() {
        return this.renderItem.bidNo && this.renderItem.bidTypeId !== 820
      },
      bidCompanyVisible() {
        return this.renderItem.bidCompany && this.renderItem.bidTypeId !== 818
      },
      agencyCompanyVisible() {
        return (
          this.renderItem.agencyCompany &&
          (this.renderItem.bidTypeId === 802 || this.renderItem.bidTypeId === 811)
        )
      },
      winBidStrVisible() {
        return (
          this.renderItem.winBidStr &&
          this.renderItem.bidTypeId === 815 &&
          this.renderItem.bidTypeId === 810
        )
      },
    },
    watch: {
      info: {
        handler(newVal) {
          if (newVal) {
            // 是否已读
            this.isRead = this.renderItem.isRead
            // 正文（如果是搜索就展示）
            let content = newVal.content ?? ''
            if (content.includes('<em>')) {
              content = '...' + replaceHtmlTag({ value: content }) + '...'
            } else {
              content = ''
            }
            // 中标信息
            let winBidList = newVal.winBidList ?? []
            let winBidStr =
              winBidList
                .map(item => `${item.winBidCompany}，${item.winBidMoneyNum}万元`)
                .join('；') ?? ''

            this.renderItem = Object.assign({}, cloneDeep(newVal), {
              title: replaceHtmlTag({ value: newVal.title }),
              content,
              winBidStr,
              bidProduct: newVal.bidProduct.replace(/;/g, '、'),
              bidCompanySearch: replaceHtmlTag({ value: newVal.bidCompanySearch }),
            })
          }
        },
        immediate: true,
      },
      'renderItem.bidTypeId': {
        handler(val) {
          // 招标公告
          const arr1 = [801, 802, 803, 804, 805, 806, 807, 808, 809]
          // 招标结果及招标信用
          const arr2 = [810, 811, 812, 813, 814, 815, 816, 817]
          if (arr2.indexOf(val) !== -1) {
            this.bidBudget = this.renderItem.winBidMoneySum
          } else if (arr1.indexOf(val) !== -1) {
            this.bidBudget = this.renderItem.bidPurchaseBudget
          }
        },
        immediate: true,
      },
    },
    methods: {
      // 去标讯详情
      async toBidDetail() {
        this.isRead = 1
        const id =
          this.renderItem.tokenEncodeId ||
          this.renderItem.contentId ||
          this.renderItem.articleId ||
          this.renderItem.objectId
        this.$globalDrawer.show({
          component: BidDetail,
          options: { name: 'BidDetail', title: '标讯详情', props: { id: id } },
        })
      },
      /** 打开采购单位详情 */
      goPurchaseCompanyDetail() {
        if (this.renderItem.companyId) {
          this.$globalDrawer.show({
            component: PurchaseCompanyDetail,
            options: {
              name: 'PurchaseCompanyDetail',
              props: {
                id: this.renderItem.companyId,
              },
            },
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .bid-panel-wrapper {
    position: relative;
    padding: 12px 16px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    cursor: pointer;

    .mask {
      padding: 0 6px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      border-radius: 2px;
    }

    .bid-panel-top {
      display: flex;
      align-items: center;
      margin-bottom: 14px;

      .right-choice {
        margin-right: 8px;
        height: 20px;
        line-height: 20px;
        background: #ff9919;
        color: #ffffff;
      }

      .top {
        margin-right: 8px;
        background: #1aa7f1;
        height: 20px;
        line-height: 20px;
        color: #fff;
      }

      .title {
        line-height: 20px;
        color: #444444;
        font-weight: 700;
        flex: 1;
      }
    }

    .bid-panel-content {
      position: relative;
      margin-bottom: 22px;

      .mask-wrap {
        display: flex;
        margin-bottom: 12px;
        min-height: 24px;

        .product {
          max-width: 202px;
          background: rgba(0, 199, 219, 0.15);
          color: #00c7db;
          margin-right: 10px;
        }

        .price {
          background: rgba(255, 153, 25, 0.15);
          color: #ff9919;
        }
      }

      .article-content {
        color: #666666;
        font-size: 13px;
        line-height: 21px;
      }

      &:not(:nth-of-type(2))::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -12px;
        width: 100%;
        height: 1px;
        background: rgba(233, 233, 233, 0.5);
      }
    }

    .module-list {
      display: grid;
      grid-template-columns: repeat(2, calc(50% - 20px));
      column-gap: 21px;
      row-gap: 4;

      .module-item {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: #666666;

        .dl {
          width: 66px;
        }

        .dt {
          flex: 1;
          .ellipsisLines(1);
        }
      }
    }

    .bid-panel-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #999999;
      font-size: 12px;

      .left {
        display: flex;
        align-items: center;

        .bid-type {
          padding: 2px 6px;
          border: 1px solid #00c7db;
          border-radius: 2px;
          font-size: 12px;
          color: #00c7db;
          margin-right: 8px;
        }

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

        .short-company {
          max-width: 180px;
        }
      }
    }

    .icon-no-read {
      position: absolute;
      top: 5px;
      right: 5px;
      width: 10px;
      height: 10px;
      background-color: red;
      border-radius: 50%;
    }

    .clickable {
      cursor: pointer;
      color: #00c7db;
    }
  }
</style>
