<template>
  <div class="news-detail-wrapper">
    <!-- 已被删除 -->
    <template v-if="isDelete">
      <LoadStep :loading-satus="2" :result-status="1" style="margin-top: 55px"></LoadStep>
    </template>
    <template v-else>
      <MuPageHeader
        :title="
          businessDetail.cataList[0] && businessDetail.cataList[0].id == 822
            ? '商情解读详情'
            : '重大商情详情'
        "
      >
        <div class="detail-title-buttons-wrp">
          <DetailShareButton
            :id="pageId"
            :name="businessDetail.titleDetail.title"
            :query="'articleId=' + pageId"
            browser-url="yqmmpro/detail/news"
            wx-url="pages/content/news/detail/detail"
          ></DetailShareButton>
          <template v-if="!isUnlock">
            <!-- <a-button :type="likeButtonStatus.type" @click="like">
              {{ likeButtonStatus.text }}
            </a-button> -->
            <a-button :type="collectButtonStatus.type" @click="collect">
              {{ collectButtonStatus.text }}
            </a-button>
            <a-button v-if="businessDetail.operateDetail.originAddress" @click="viewSource">
              查看原文
            </a-button>
          </template>
        </div>
      </MuPageHeader>
      <!-- 重大商情/解读详情 -->
      <div class="business-container">
        <!-- 标题 -->
        <div class="detail-title">
          <div class="common-title">
            <div class="title">{{ businessDetail.titleDetail.title }}</div>
            <div class="detail">
              <div class="detail-left show-line_1">
                <div v-if="businessDetail.titleDetail.origin" class="news">
                  {{ businessDetail.titleDetail.origin }}
                </div>
                <div v-if="businessDetail.titleDetail.city" class="city">
                  {{ businessDetail.titleDetail.city }}
                </div>
                <div v-if="businessDetail.titleDetail.unit" class="unit show-line_1">
                  {{ businessDetail.titleDetail.unit }}
                </div>
                <div class="publish-time">
                  {{ businessDetail.titleDetail.time }}
                </div>
              </div>
              <div class="detail-right">
                <div class="browse">{{ formatBrowseNum }}浏览</div>
                <div class="collect">{{ formatCollectNum }}收藏</div>
              </div>
            </div>
          </div>
        </div>
        <div class="news-info">
          <!-- 商情解读 -->
          <div
            v-if="
              businessDetail.cataList[0] &&
              businessDetail.cataList[0].id != 822 &&
              businessDetail.articleId
            "
            class="business-analysis"
          >
            <div class="left">
              <img src="@/assets/images/icon/report.svg" alt="icon" />
              商情解读
            </div>
            <div class="right" @click="toBusinessAnalysis">
              立即查看
              <img src="@/assets/images/icon/arrow-right.svg" alt="icon" />
            </div>
          </div>
          <!-- 摘要 -->
          <div v-if="businessDetail.abstract" class="business-abstract">
            <img src="@/assets/images/icon/quota.svg" alt="icon" />
            <div>摘要：{{ businessDetail.abstract }}</div>
          </div>
          <!-- 新闻源 -->
          <div v-if="newsListVisible" class="news-list">
            <template v-for="(newsDetail, index) in businessDetail.newsDetailList">
              <NewsCard v-if="newsDetail.bidTypeId == 0" :key="index" :item="newsDetail"></NewsCard>
              <PurchaseCard
                v-else-if="newsDetail.bidTypeId == 820"
                :key="index"
                :item="newsDetail"
              ></PurchaseCard>
              <BidCard v-else :key="index" :info="newsDetail"></BidCard>
            </template>
          </div>
        </div>
        <!-- 模糊 -->
        <Blur v-if="isUnlock" module="news" :qrcode="'data:image/png;base64,' + qrCode"></Blur>
        <!-- 展示 -->
        <div v-else class="news-detail">
          <DownloadFilePanel
            :files="businessDetail.fileList"
            :custom-fields="{
              fileName: 'attachment_name',
              fileSize: 'size',
              fileTime: 'time',
              fileExt: 'suffix',
              filePath: 'attachment_url',
            }"
          ></DownloadFilePanel>
          <!-- 正文 -->
          <!-- <div class="business-detail" v-html="businessDetail.articleDetail"></div> -->
          <!-- 相关单位/城市 -->
          <div v-if="businessDetail.companyList.length" class="relate-module">
            <div class="dl">相关单位：</div>
            <div class="dt">
              <div
                v-for="(item, index) in businessDetail.companyList"
                :key="index"
                class="module-item"
                :class="{ active: !!item.id }"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div v-if="businessDetail.cityList.length" class="relate-module">
            <div class="dl">相关城市：</div>
            <div class="dt">
              <div
                v-for="(item, index) in businessDetail.cityList"
                :key="index"
                class="module-item"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { formateNum } from '@/utils/index.js'
  import { getNewsDetail, collect, getYqmmQrCode } from '@/api/index.js'
  // 用于侧拉框中的组件的子组件，如果不是全局组件，需要使用异步组件
  const NewsCard = () => import('./NewsCard.vue')
  const NewsDetail = () => import('./NewsDetail.vue')
  const Blur = () => import('./Blur.vue')
  const PurchaseCard = () => import('./PurchaseCard.vue')
  const BidCard = () => import('./BidCard.vue')
  const DownloadFilePanel = () => import('@/components/local/DownloadFilePanel/index.vue')
  const LoadStep = () => import('@/views/yqmmpro/components/LoadStep/index.vue')
  const DetailShareButton = () => import('@/views/yqmmpro/components/DetailShareButton.vue')
  export default {
    name: 'NewsDetail',
    components: {
      Blur,
      NewsCard: NewsCard,
      PurchaseCard,
      BidCard,
      DownloadFilePanel,
      LoadStep,
      DetailShareButton,
    },
    props: {
      id: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        pageId: '',
        /**是否删除 */
        isDelete: false,
        isUnlock: false, // 控制是否模糊
        isUnitShow: false,
        isCityShow: false,
        unitFlag: false,
        cityFlag: false,
        isUnitAfterShow: false,
        isCityAfterShow: false,
        businessDetail: {
          titleDetail: {},
          abstract: '',
          newsDetailList: [],
          articleDetail: '',
          operateDetail: {
            isLike: 0,
            isCollect: 0,
            originAddress: '',
          },
          articleId: '',
          cataList: [],
          fileList: [],
          companyList: [],
          cityList: [],
        },
        qrCode: '',
        clampText: ['收起<', '展开>'],
      }
    },
    computed: {
      collectButtonStatus() {
        let status = { text: '收藏', type: 'default' }
        if (this.businessDetail.operateDetail.isCollect) {
          status.text = '已收藏'
          status.type = 'primary'
        } else {
          status.text = '收藏'
          status.type = 'default'
        }
        return status
      },
      newsListVisible() {
        return (
          this.businessDetail.cataList[0] &&
          this.businessDetail.cataList[0].id == 822 &&
          this.businessDetail.newsDetailList &&
          this.businessDetail.newsDetailList.length
        )
      },
      formatBrowseNum() {
        return formateNum(this.businessDetail.titleDetail.browse ?? 0)
      },
      formatLikeNum() {
        return formateNum(this.businessDetail.titleDetail.like ?? 0)
      },
      formatCollectNum() {
        return formateNum(this.businessDetail.titleDetail.collect ?? 0)
      },
    },
    watch: {
      $route: {
        handler(val) {
          const id = val?.params?.id
          if (id) {
            this.pageId = id
          }
        },
        immediate: true,
      },
      id: {
        handler(val) {
          if (val) {
            this.pageId = val
          }
        },
        immediate: true,
      },
      pageId: {
        handler: async function (newVal, oldVal) {
          if (!newVal) return
          this.$store.dispatch('app/setDrawerLayoutLoading', { flag: true })
          await this.getBusinessDetail(newVal)
          this.$store.dispatch('app/setDrawerLayoutLoading', { flag: false })
        },
        immediate: true,
      },
    },
    methods: {
      // 获取商情详情
      async getBusinessDetail(pageId) {
        let data = {
          articleId: pageId,
        }
        let res = await getNewsDetail(data)
        if (res.success) {
          let e = res.data
          if (e && JSON.stringify(e) != '{}') {
            let titleDetail = {
              title: e.title,
              city: '',
              unit: '',
              time: e.publishTime,
              origin: e.origin,
              browse: e.viewCount,
              like: e.likeCount,
              collect: e.collectCount,
            }
            this.$set(this.businessDetail, 'titleDetail', titleDetail)
            this.$set(this.businessDetail, 'cataList', e?.cataList ?? [])

            if (e.unlock === 1 || e.unlock === -1) {
              this.isUnlock = false
              if (e.unlock === 1) {
                let str =
                  this.businessDetail.cataList[0] && this.businessDetail.cataList[0].id == 822
                    ? '商情解读'
                    : '重大商情'
                this.$message.info(`${str}查看额度-1`)
              }
              let newsDetailList = []
              let id1 = [801, 802, 803, 804, 805, 806, 807, 808, 809, 820] //招标公告类&采购意向
              let id2 = [810, 811, 812, 813, 814, 815, 816, 817] //招标结果及招标信用类
              if (e.articleArticleList && e.articleArticleList.length) {
                e.articleArticleList.forEach(item => {
                  let bidTypeId = Number(item.bidTypeId)
                  let price = ''
                  if (id1.indexOf(bidTypeId) !== -1) {
                    price = item.bidPurchaseBudget
                  } else if (id2.indexOf(bidTypeId) !== -1) {
                    price = item.winBidMoneySum
                  }
                  // todo bidProduct的处理应该放在卡片中
                  item.bidProduct = item.bidProduct.replaceAll(';', '、')
                  newsDetailList.push(item)
                })
              }
              Object.assign(this.businessDetail, {
                titleDetail: this.businessDetail.titleDetail,
                abstract: e.abstract,
                newsDetailList,
                articleDetail: e.content,

                operateDetail: {
                  isLike: e.hadLike,
                  isCollect: e.hadCollect,
                  originAddress: e.originAddress,
                },
                articleId: e.businessInfo ? e.businessInfo.articleId : '', //商情解读信息id
                cataList: this.businessDetail.cataList,
                fileList: e.attachmentList ?? [],
                cityList: e.articleCityList ?? [],
                // todo 相关单位可跳转
                companyList:
                  e.articleCompanyList.map((item, index) => {
                    return {
                      name: item,
                      id: index,
                    }
                  }) ?? [],
              })
              this.$set(this.businessDetail, 'newsDetailList', this.businessDetail.newsDetailList)
            } else {
              this.isUnlock = true
              //无法解锁 获取小程序二维码
              await this.handleQRCode()
            }
          }
        } else {
          this.isDelete = true
          this.$message.error('该内容已被删除或下架')
        }
      },
      // 获取小程序码回调
      async handleQRCode() {
        let opts = {
          page: 'pages/content/news/detail/detail',
          scene: `id=${this.pageId}&platform=saas`,
        }
        let { code, data } = await getYqmmQrCode(opts)
        if (code === '0') {
          this.qrCode = data
        }
      },
      // 立即查看
      toBusinessAnalysis() {
        this.$globalDrawer.show({
          component: NewsDetail,
          options: {
            name: 'NewsDetail',
            title: '重大商情详情',
            props: { id: this.businessDetail.articleId },
          },
        })
      },

      // 控制是否显示“展开、收起”
      handleUnitAfterShow(e) {
        this.unitFlag = e
      },
      handleCityAfterShow(e) {
        this.cityFlag = e
      },
      // 控制“展开、收起”的切换
      handleUnitToggle() {
        this.isUnitShow = !this.isUnitShow
        this.isUnitAfterShow = true
      },
      handleCityToggle() {
        this.isCityShow = !this.isCityShow
        this.isCityAfterShow = true
      },
      async collect() {
        let action = this.businessDetail.operateDetail.isCollect == 1 ? 2 : 1
        let params = {
          targetId: this.pageId,
          module: 1,
          action,
        }
        const res = await collect(params)
        if (res.success) {
          let deltaCount = action === 1 ? 1 : -1
          this.businessDetail.titleDetail.collect += deltaCount
          this.businessDetail.operateDetail.isCollect = action === 1 ? 1 : 0
        }
      },
      // 查看原文
      async viewSource() {
        window.open(this.businessDetail.operateDetail.originAddress, '_blank')
      },
    },
  }
</script>

<style lang="less" scoped>
  .news-detail-wrapper {
    padding-bottom: 24px;
    // display: flex;
    // justify-content: space-between;
    width: 100%;
    // flex-wrap: wrap;
    // padding: 28px 0 32px;
    .business-container {
      width: 100%;
      margin-bottom: 40px;
      background-color: #fff;
      border-radius: 4px;
      .news-detail,
      .news-info {
        padding: 0 24px;
      }
      .detail-title {
        width: 100%;
        padding: 24px 24px 0;
        background-color: #fff;
        .common-title {
          width: 100%;
          padding-bottom: 20px;
          margin-bottom: 20px;
          background-color: #fff;
          border-bottom: 1px dashed #ebebeb;
          .title {
            width: 100%;
            font-size: 22px;
            font-weight: bold;
            color: #444;
            line-height: 26px;
          }
          .detail {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-top: 10px;
            .detail-left,
            .detail-right {
              display: flex;
              align-items: center;
              font-size: 14px;
              color: #999;
              > div {
                position: relative;
                height: 18px;
                line-height: 18px;
                margin-right: 32px;
                &::before {
                  position: absolute;
                  right: -17px;
                  top: 3px;
                  content: '';
                  width: 1px;
                  height: 12px;
                  background-color: rgba(233, 233, 233, 0.5);
                }
                &:last-child {
                  margin-right: 0;
                  &::before {
                    display: none;
                  }
                }
              }
              .bid-tag {
                // width: 36px;
                padding: 0 6px;
                height: 20px;
                line-height: 18px;
                // text-align: center;
                margin-right: 12px;
                font-size: 12px;
                border-radius: 2px;
                border: 1px solid #00c7db;
                color: #00c7db;
                white-space: nowrap;
                &::before {
                  display: none;
                }
              }
            }
            .detail-right {
              width: fit-content;
              margin-left: 16px;
              > div {
                white-space: nowrap;
              }
            }
          }
        }
      }
      .business-analysis {
        display: flex;
        justify-content: space-between;
        height: 44px;
        padding: 0 16px;
        margin-bottom: 16px;
        background-color: #f8f8f8;
        border-radius: 4px 4px 4px 4px;
        > div {
          display: flex;
          align-items: center;
          height: 44px;
          &.left {
            font-size: 16px;
            color: #444;
            > img {
              margin-right: 8px;
            }
          }
          &.right {
            cursor: pointer;
            font-size: 14px;
            color: #00c7db;
            > img {
              margin-left: 5px;
            }
          }
        }
      }
      .business-abstract {
        width: 100%;
        padding: 16px;
        background-color: #f8f8f8;
        border-radius: 4px;

        > div {
          width: 100%;
          font-size: 14px;
          color: #666;
          line-height: 24px;
          margin-top: 6px;
        }
      }
      .news-list {
        margin-top: 12px;

        > div {
          margin-bottom: 12px;
        }
      }
      /deep/.mumu-card {
        background: #f8f8f8;
      }
      /deep/.business-detail {
        padding: 24px 0 24px;
        font-size: 16px;
        color: #444;
        line-height: 32px;
        h1 {
          position: relative;
          padding-left: 15px;
          margin-bottom: 20px;
          font-size: 18px;
          font-weight: bold;
          color: #444;
          line-height: 21px;
          &::before {
            position: absolute;
            top: 2px;
            left: 0;
            content: '';
            width: 9px;
            height: 17px;
            background-image: url('~@/assets/images/common/line-2.svg');
          }
        }
        h2 {
          position: relative;
          padding-left: 9px;
          margin-bottom: 6px;
          font-size: 16px;
          font-weight: bold;
          color: #444;
          line-height: 21px;
          &::before {
            position: absolute;
            top: 2px;
            left: 0;
            content: '';
            width: 3px;
            height: 17px;
            background-image: url('~@/assets/images/common/line-1.svg');
          }
        }
        h3 {
          margin: 20px 0 6px;
          font-size: 16px;
          font-weight: bold;
          color: #444;
          line-height: 21px;
        }
        p {
          margin: 0;
          padding: 0;
          line-height: 32px;
          margin: 10px;
        }
        table {
          margin-top: 16px;
          tr {
            border-top: 1px solid #d9d9d9;
            border-bottom: none;
            &:last-child {
              border-bottom: 1px solid #d9d9d9;
            }
            td {
              border-left: 1px solid #d9d9d9;
              border-right: none;
              &:last-child {
                border-right: 1px solid #d9d9d9;
              }
            }
          }
          thead {
            tr {
              th {
                border-left: 1px solid #d9d9d9;
                border-right: none;
                &:last-child {
                  border-right: 1px solid #d9d9d9;
                }
              }
            }
          }
        }
        img {
          max-width: 100% !important;
          height: auto !important;
        }
      }
      .relate-module {
        margin-top: 8px;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        padding-bottom: 28px;
        font-size: 13px;
        color: #999999;

        .dl {
          width: 66px;
          height: 17px;
          line-height: 17px;
        }

        .dt {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          justify-content: flex-start;

          .module-item {
            margin-bottom: 2px;
            position: relative;
            height: 17px;
            line-height: 17px;
            margin-right: 10px;

            &:not(:last-child)::after {
              content: '、';
              position: absolute;
            }

            &.active {
              color: #00c7db;
              cursor: pointer;
            }
          }
        }
      }
    }
    .page-header-wrp {
      width: 100%;
      flex-shrink: 0;
    }
    .detail-title-buttons-wrp {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      /deep/ .ant-btn {
        margin-left: 12px;
        &.ant-btn-default {
          &:focus {
            border-color: #d9d9d9;
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }

    .download-file-card-list {
      margin-top: 10px;
    }
  }
</style>
