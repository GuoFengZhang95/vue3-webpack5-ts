<template>
  <div class="purchase-company-card-wrapper" @click="openCardDetail">
    <div class="purchase-company-card_inner">
      <div class="content">
        <MuLogo class="logo" :src="renderItem.logo" :name="renderItem.originCompanyName"></MuLogo>
        <div class="info-wrp">
          <div class="company" v-html="renderItem.companyName"></div>
          <div class="city">{{ renderItem.cityName }}</div>
        </div>
      </div>
      <div v-if="renderItem.bidProduct" class="product" v-html="renderItem.bidProduct"></div>
      <div class="statistics-wrp">
        <!-- 学校展示科研客户 -->
        <div v-if="renderItem.attribute === 1" class="statistics-item">
          <span class="dl">科研客户：</span>
          <span class="dt">{{ renderItem.customerNumber }}</span>
        </div>
        <div class="statistics-item">
          <span class="dl">采购联系人：</span>
          <span class="dt">{{ renderItem.contactsCount }}</span>
        </div>
        <div class="statistics-item">
          <span class="dl">招投标：</span>
          <span class="dt">{{ renderItem.biddingCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { replaceHtmlTag, cloneDeep } from '@/utils/index'
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  export default {
    name: 'PurchaseCompanyCard',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        renderItem: {},
      }
    },
    computed: {},
    watch: {
      info: {
        handler(val) {
          if (val) {
            let renderItem = cloneDeep(val)
            if (renderItem.customerNumber > 999999) {
              renderItem.customerNumber = 999999 + '+'
            }
            if (renderItem.contactsCount > 999999) {
              renderItem.contactsCount = 999999 + '+'
            }
            if (renderItem.biddingCount > 999999) {
              renderItem.biddingCount = 999999 + '+'
            }
            renderItem.companyName = replaceHtmlTag({ value: renderItem.companyName })
            renderItem.bidProduct = replaceHtmlTag({ value: renderItem.bidProduct })
            renderItem.originCompanyName = replaceHtmlTag({
              value: renderItem.companyName,
              targetTag: '',
            })
            this.renderItem = renderItem
          }
        },
        immediate: true,
      },
    },
    methods: {
      openCardDetail() {
        this.$globalDrawer.show({
          component: PurchaseCompanyDetail,
          options: {
            name: 'PurchaseCompanyDetail',
            title: '',
            props: { id: this.renderItem.companyTokenId },
          },
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .purchase-company-card-wrapper {
    padding: 12px 16px;
    border-radius: 4px;
    border: 1px solid #e9e9e9;
    box-sizing: border-box;
    cursor: pointer;
    background: #ffffff;

    .purchase-company-card_inner {
      .content {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .logo {
          width: 38px;
          height: 38px;
          border-radius: 2px;
        }

        .info-wrp {
          margin-left: 10px;
          flex: 1;

          .company {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #333333;

            .ellipsisLines(1);
          }

          .city {
            margin-top: 2px;
            height: 17px;
            line-height: 17px;
            font-size: 12px;
            color: #999999;

            .ellipsisLines(1);
          }
        }
      }

      .product {
        margin-top: 12px;
        color: #666666;
        font-size: 14px;
      }
      .statistics-wrp {
        margin-top: 12px;
        display: flex;
        align-items: center;

        .statistics-item {
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .dl {
            color: #666666;
          }

          .dt {
            max-width: 60px;
            font-size: 14px;
            color: #00c7db;
            .ellipsisLines(1);
          }
        }
      }
    }
  }
</style>
