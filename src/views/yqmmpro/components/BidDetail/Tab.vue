<template>
  <div v-if="isShow" class="mumu-tab">
    <MuDivid></MuDivid>
    <div class="tab-header">
      <div class="tab-header-topic">相关商机</div>
      <div class="tab-header-catalog">
        <template v-for="(item, index) in contentList">
          <span
            v-if="item.list && item.list.length"
            :key="index"
            :class="activeTab === index ? 'active-tab' : ''"
            @click="changeTab(index)"
          >
            {{ item.catalog }}
          </span>
        </template>
      </div>
    </div>
    <div class="tab-content">
      <template v-for="(item, index) in contentList">
        <div
          v-if="activeTab == index && item.list && item.list.length"
          :key="index"
          class="tab-content-item"
        >
          <!-- 这里使用标讯的卡片 -->
          <template v-if="pageType == 1">
            <PurchaseCard v-for="(e, i) in item.list" :key="i" :item="e"></PurchaseCard>
          </template>
          <template v-if="pageType == 2">
            <BidCard v-for="(e, i) in item.list" :key="i" :info="e"></BidCard>
          </template>
        </div>
      </template>
    </div>
    <!-- 分页器 -->
    <template v-if="showPagination">
      <template v-for="(item, index) in contentList">
        <DetailPagination
          v-if="activeTab == index && item.total > pageSize"
          :key="index"
          :total="item.total"
          :current-num="page"
          :page-size="pageSize"
          @pageChange="changePageNum"
        ></DetailPagination>
      </template>
    </template>
    <EquityPaginationMask v-if="!showPagination"></EquityPaginationMask>
  </div>
</template>

<script>
  import { getRemainCardTimes, getBidRelatdBusiness } from '@/api/index.js'
  import DetailPagination from '../DetailPagination.vue'
  const PurchaseCard = () => import('../PurchaseCard.vue')
  const BidCard = () => import('../BidCard.vue')
  import { cloneDeep } from '@/utils/index'
  export default {
    name: 'BidPurchaseDetailTab',
    components: {
      DetailPagination,
      PurchaseCard,
      BidCard,
    },
    props: {
      id: {
        type: [Number, String],
        default: '',
      },
      size: {
        type: String,
        default: 'default',
      },
      /** 1-采购意向 2-标讯 */
      pageType: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        isShow: false,
        activeTab: 0,
        page: 1,
        pageSize: 10,
        recommendType: 0,
        recommendTypes: [],
        tabList: [
          {
            id: 0,
            catalog: '',
            list: [],
            total: 0,
          },
          {
            id: 0,
            catalog: '',
            list: [],
            total: 0,
          },
          {
            id: 0,
            catalog: '',
            list: [],
            total: 0,
          },
        ],
        contentList: [],
        flag: true,
        /**权益卡采购意向剩余次数 */
        remainTotalTimes: 0,
      }
    },
    computed: {
      /**是否展示分页（当前模块是否有额度） */
      showPagination() {
        if (this.pageType === 1) {
          if (this.contentList[this.activeTab].total <= this.pageSize) {
            return true
          } else {
            return this.remainTotalTimes > 0 || this.remainTotalTimes === -1
          }
        } else {
          return true
        }
      },
    },
    watch: {
      id: {
        handler(val) {
          if (val) {
            this.init()
          }
        },
        immediate: false,
      },
      activeTab: {
        handler(i) {
          this.page = 1
        },
        immediate: true,
      },
      tabList: {
        handler(val) {
          let i = val.findIndex(e => e.list && e.list.length)
          this.isShow = i !== -1

          let arr = []
          val.forEach(e => {
            if (e.list && e.list.length) {
              arr.push(e)
            }
          })
          if (arr && arr.length) {
            this.contentList = cloneDeep(arr)
            if (i !== -1 && this.flag) {
              this.activeTab = 0
              this.flag = false
            }
          }
        },
        immediate: true,
        deep: true,
      },
    },
    created() {
      this.init()
    },
    methods: {
      // 获取相关商机
      async getBusinessChances(recommendType, index) {
        let data = {
          tokenEncodeId: this.id,
          pageType: this.pageType,
          recommendType: recommendType ? recommendType : this.recommendType,
          pageNum: this.page,
          pageSize: this.pageSize,
        }
        let res = await getBidRelatdBusiness(data)
        if (res.code === '0') {
          if (recommendType && (index === 0 || index === 1 || index === 2)) {
            if (res.data && res.data.list && res.data.list.length) {
              this.tabList[index].list = res.data.list
              this.tabList[index].id = recommendType
              this.recommendTypes.forEach(e => {
                if (e.id == recommendType) {
                  this.tabList[index].catalog = e.value
                }
              })
              this.tabList[index].total = res?.data?.total ?? 0
            } else {
              this.tabList[index].list = []
            }
          } else {
            this.tabList.forEach(e => {
              if (e.id === this.recommendType) {
                e.list = res.data && res.data.list ? res.data.list : []
              }
            })
          }
        } else {
          if (index === 0 || index === 1 || index === 2) {
            this.tabList[index].list = []
          }
        }
      },
      // 页面初始化
      init() {
        if (this.pageType == 1) {
          getRemainCardTimes({ type: 1 }).then(({ code, data: { remainCardTimes } }) => {
            if (code === '0') {
              this.remainTotalTimes = remainCardTimes
            }
          })
          this.recommendTypes = [
            {
              id: 1,
              value: '采购品目',
            },
            {
              id: 2,
              value: '采购产品',
            },
            {
              id: 3,
              value: '采购单位',
            },
          ]
        } else if (this.pageType == 2) {
          this.recommendTypes = [
            {
              id: 2,
              value: '采购产品',
            },
            {
              id: 3,
              value: '采购单位',
            },
            {
              id: 5,
              value: '中标单位',
            },
          ]
        }
        if (this.recommendTypes.length) {
          // 循环获取所有的推荐列表
          this.recommendTypes.forEach((e, i) => {
            this.recommendType = e.id
            this.getBusinessChances(e.id, i)
          })
        }
      },
      changeTab(i) {
        this.activeTab = i
        this.page = 1
        this.handleRecommendTypechange()
        this.getBusinessChances()
      },
      changePageNum(val) {

        this.$emit('pageChange')
        this.page = val.page
        if (this.contentList.length > this.activeTab) {
          this.recommendType = this.contentList[this.activeTab].id
        }
        this.getBusinessChances()
      },
      handleRecommendTypechange() {
        if (this.pageType == 1) {
          this.recommendTypes = [
            {
              id: 1,
              value: '采购品目',
            },
            {
              id: 2,
              value: '采购产品',
            },
            {
              id: 3,
              value: '采购单位',
            },
          ]
        } else if (this.pageType == 2) {
          this.recommendTypes = [
            {
              id: 2,
              value: '采购产品',
            },
            {
              id: 3,
              value: '采购单位',
            },
            {
              id: 5,
              value: '中标单位',
            },
          ]
        }
        this.recommendType = this.recommendTypes[this.activeTab].id
      },
    },
  }
</script>

<style lang="less" scoped>
  .mumu-tab {
    width: 100%;

    .tab-header {
      width: 100%;
      padding: 24px 24px 0 24px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 2px;
      margin-bottom: 12px;
      .tab-header-topic {
        position: relative;
        height: 22px;
        line-height: 22px;
        padding-left: 12px;
        margin-right: 40px;
        font-size: 16px;
        color: #444;
        font-weight: 600;
        &::before {
          position: absolute;
          left: 0;
          top: 2px;
          content: '';
          width: 4px;
          height: 20px;
          background-color: #00c7db;
        }
      }
      .tab-header-catalog {
        display: flex;
        margin: 16px 0;
        border-bottom: 1px solid #ebebeb;
        > span {
          position: relative;
          height: 45px;
          line-height: 45px;
          padding: 0 16px;
          font-size: 16px;
          color: #666;
          cursor: pointer;
          font-weight: 600;
          &.active-tab {
            color: #00c7db;
            &::before {
              position: absolute;
              bottom: -1px;
              left: 16px;
              content: '';
              width: calc(100% - 32px);
              height: 2px;
              background: #00c7db;
              border-radius: 2px;
            }
          }
        }
      }
    }
    .tab-content {
      padding: 0 24px;
      width: 100%;
      box-sizing: border-box;
      background-color: white;

      .tab-content-item {
        > div {
          margin-bottom: 12px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .pagination {
      width: fit-content;
      margin: 32px auto;
    }
  }
</style>
