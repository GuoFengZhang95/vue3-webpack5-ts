<template>
  <div ref="purchaseDetail" class="purchase-detail-wrapper">
    <!-- 已被删除 -->
    <template v-if="isDelete">
      <LoadStep :loading-satus="2" :result-status="1" style="margin-top: 55px"></LoadStep>
    </template>
    <!-- 未被删除 -->
    <template v-else>
      <!-- 标讯/采购意向详情 -->
      <div class="main-container">
        <MuPageHeader title="采购意向详情">
          <div class="detail-title-buttons-wrp">
            <DetailShareButton
              :id="pageId"
              :name="detailInfo.titleDetail.title"
              :query="'tokenEncodeId=' + pageId"
              browser-url="yqmmpro/detail/purchase"
              wx-url="pages/content/purchase/detail/detail"
            ></DetailShareButton>
            <template v-if="!isUnlock">
              <a-button :type="collectButtonStatus.type" @click="collect">
                {{ collectButtonStatus.text }}
              </a-button>
            </template>
          </div>
        </MuPageHeader>
        <div class="detail-title">
          <div class="common-title">
            <div class="title">{{ detailInfo.titleDetail.title }}</div>
            <div class="detail">
              <div class="detail-left show-line_1">
                <div v-if="detailInfo.titleDetail.origin" class="news">
                  {{ detailInfo.titleDetail.origin }}
                </div>
                <div v-if="detailInfo.titleDetail.city" class="city">
                  {{ detailInfo.titleDetail.city }}
                </div>
                <div v-if="detailInfo.titleDetail.unit" class="unit show-line_1">
                  {{ detailInfo.titleDetail.unit }}
                </div>
                <div class="publish-time">{{ detailInfo.titleDetail.time }}</div>
              </div>
              <div class="detail-right">
                <div class="collect">{{ detailInfo.titleDetail.collect }}收藏</div>
              </div>
            </div>
          </div>
        </div>
        <Blur v-if="isUnlock" module="purchase" :qrcode="'data:image/png;base64,' + qrCode"></Blur>
        <div v-else class="detail-container">
          <div class="detail-content">
            <!-- 基本信息 -->
            <div v-if="isBaseInfoShow" class="base-info">
              <div class="base-title">基本信息</div>
              <div class="info-content">
                <div
                  v-if="detailInfo.baseInfo && detailInfo.baseInfo !== {}"
                  class="info-item purchase"
                >
                  <div v-if="detailInfo.baseInfo.bidPurchaseDate">
                    预计采购时间：
                    <span>{{ detailInfo.baseInfo.bidPurchaseDate }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidPurchaseBudget">
                    项目预算：
                    <span>{{ detailInfo.baseInfo.bidPurchaseBudget }}万元</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidCompany">
                    采购单位：
                    <span class="bidcompany" @click="goPurchaseCompanyDetail">
                      {{ detailInfo.baseInfo.bidCompany }}
                    </span>
                  </div>
                  <div v-if="detailInfo.baseInfo.purchaseItemStr" class="w-100">
                    <div>采购品目：</div>
                    <span>{{ detailInfo.baseInfo.purchaseItemStr }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidProduct" class="w-100">
                    <div>采购产品：</div>
                    <span>{{ detailInfo.baseInfo.bidProduct }}</span>
                  </div>
                </div>
              </div>
            </div>
            <DownloadFilePanel
              :files="detailInfo.fileList"
              :custom-fields="{
                fileName: 'name',
                fileSize: 'size',
                fileTime: 'uploadTime',
                fileExt: 'type',
                filePath: 'url',
              }"
            ></DownloadFilePanel>
            <!-- 项目概况 -->
            <div class="base-facts">
              <div class="base-title">项目概况</div>
              <div class="facts-content">
                <MuClamp :content="detailInfo.facts"></MuClamp>
              </div>
            </div>
          </div>
          <div class="tab-wrp">
            <!-- <MuDivid></MuDivid> -->
            <BidPurchaseDetailTab
              v-if="isTabShow"
              :id="pageId"
              ref="bidDetailTab"
              size="large"
              :page-type="1"
              @pageChange="handleTabPageChange"
            ></BidPurchaseDetailTab>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { getPurchaseDetail, getBidLikeCollectInfo, collect, getYqmmQrCode } from '@/api/index.js'
  import { formateNum } from '@/utils/index'
  const BidPurchaseDetailTab = () => import('./BidDetail/Tab.vue')
  const Blur = () => import('./Blur.vue')
  const DownloadFilePanel = () => import('@/components/local/DownloadFilePanel/index.vue')
  const LoadStep = () => import('@/views/yqmmpro/components/LoadStep/index.vue')
  const DetailShareButton = () => import('@/views/yqmmpro/components/DetailShareButton.vue')
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  export default {
    name: 'PurchaseDetail',
    components: {
      BidPurchaseDetailTab,
      Blur,
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
        isUnlock: false,
        isTabShow: false,
        isBaseInfoShow: false,
        detailInfo: {
          titleDetail: {},
          tabDetail: {
            topic: '相关商机',
            list: [],
          },
          baseInfo: {},
          facts: '',
          operateDetail: {
            originAddress: '', //新闻源地址
            isLike: 0,
            isCollect: 0,
            isShowOrigin: 0,
          },
          fileList: [],
        },
        qrCode: '',
        counts: {
          browse: 0,
          like: 0,
          collect: 0,
        },
      }
    },
    computed: {
      collectButtonStatus() {
        let status = { text: '收藏', type: 'default' }
        if (this.detailInfo.operateDetail.isCollect) {
          status.text = '已收藏'
          status.type = 'primary'
        } else {
          status.text = '收藏'
          status.type = 'default'
        }
        return status
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
          await this.getDetail(newVal)
          this.$store.dispatch('app/setDrawerLayoutLoading', { flag: false })
        },
        immediate: true,
      },
    },
    methods: {
      handleTabPageChange() {
        const top = this.$refs.bidDetailTab.$el.offsetTop
        this.$refs.purchaseDetail.scrollTo(0, top)
      },
      // 获取文章详情
      async getDetail(pageId) {
        const res = await getPurchaseDetail({ tokenEncodeId: pageId })
        if (res.code === '0') {
          let val = res.data.xcxInfoResult
          if (val && JSON.stringify(val) !== '{}') {
            let titleDetail = {
              title: val.bidName,
              city: val.bidCityName
                ? val.bidCityName
                : val.bidProvinceName
                ? val.bidProvinceName
                : '',
              unit: val.bidCompany,
              time: val.publishTime,
              browse: val.viewCount ? formateNum(val.viewCount) : 0,
              like: val.praiseNums ? formateNum(val.praiseNums) : 0,
              collect: val.collectCount ? formateNum(val.collectCount) : 0,
              bidTypeName: val.bidTypeName,
            }
            this.detailInfo.titleDetail = titleDetail
            this.counts = {
              browse: val.viewCount ? val.viewCount : 0,
              like: val.praiseNums ? val.praiseNums : 0,
              collect: val.collectCount ? val.collectCount : 0,
            }
          }
          if (res.data.unlock === 1 || res.data.unlock === -1) {
            this.isUnlock = false
            if (res.data.unlock === 1) {
              this.$message.info('采购意向查看额度-1')
            }

            this.isTabShow = true
            if (res.data.xcxInfoResult) {
              let e = res.data.xcxInfoResult
              this.detailInfo.facts = e.content ?? ''
              this.detailInfo.operateDetail.originAddress = e.originAddress
              this.detailInfo.operateDetail.isShowOrigin = e.isShowOrigin
              this.detailInfo.fileList = e.ossUploadResultList ?? []
              this.handleBaseInfo(e)
            }
            let res2 = await getBidLikeCollectInfo({ tokenEncodeId: this.pageId })
            if (res2.code === '0') {
              this.detailInfo.operateDetail.isCollect = res2.data.isCollect
              this.detailInfo.operateDetail.isLike = res2.data.isLike
            }
          } else {
            this.isUnlock = true
            //无法解锁 获取小程序二维码
            await this.handleQRCode()
          }
        } else {
          this.isDelete = true
          this.$message.error('该内容已被删除或下架')
        }
      },
      // 获取小程序码回调
      async handleQRCode() {
        let params = {
          page: 'pages/content/purchase/detail/detail',
          scene: `id=${this.pageId}&platform=saas`,
        }
        let { code, data } = await getYqmmQrCode(params)
        if (code === '0') {
          this.qrCode = data
        }
      },
      // 处理采购意向简介信息
      handleBaseInfo(e) {
        Object.assign(this.detailInfo.baseInfo, {
          bidPurchaseDate: e.bidPurchaseDate ? e.bidPurchaseDate : '',
          bidPurchaseBudget: e.bidPurchaseBudget ? e.bidPurchaseBudget : '',
          purchaseItemStr: e.purchaseItemStr ? e.purchaseItemStr : '',
          bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
          bidCompany: e.bidCompany ?? '',
          tokenEncodeCompanyId: e.tokenEncodeCompanyId ?? '',
        })

        this.$set(this.detailInfo, 'baseInfo', this.detailInfo.baseInfo)
        let item = this.detailInfo.baseInfo
        if (!item) {
          this.isBaseInfoShow = false
        } else {
          for (let key in item) {
            if (item[key]) {
              this.isBaseInfoShow = true
              break
            } else {
              this.isBaseInfoShow = false
            }
          }
        }
      },
      /**收藏 */
      async collect() {
        let action = this.detailInfo.operateDetail.isCollect === 1 ? 2 : 1
        let params = {
          targetId: this.pageId,
          module: 1,
          action,
        }
        const res = await collect(params)
        if (res.success) {
          this.$set(this.detailInfo.operateDetail, 'isCollect', action === 1 ? 1 : 0)
          let deltaCount = action === 1 ? 1 : -1
          let count = formateNum(this.counts.collect + deltaCount)
          this.$set(this.detailInfo.titleDetail, 'collect', count)
          this.counts.collect += deltaCount
        }
      },
      /** 打开采购单位详情 */
      goPurchaseCompanyDetail() {
        this.$globalDrawer.show({
          component: PurchaseCompanyDetail,
          options: {
            name: 'PurchaseCompanyDetail',
            props: {
              id: this.detailInfo.baseInfo.tokenEncodeCompanyId,
            },
          },
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .purchase-detail-wrapper {
    padding-bottom: 24px;
    // display: flex;
    // justify-content: space-between;
    // width: 100%;
    // padding: 28px 0 32px;

    .main-container {
      .detail-title {
        width: 100%;
        padding: 24px 24px 0;
        background-color: #fff;

        .common-title {
          width: 100%;
          padding-bottom: 20px;
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
                padding-right: 32px;

                &::before {
                  position: absolute;
                  right: 17px;
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
                padding: 0 6px;
                height: 20px;
                line-height: 18px;
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

      .detail-container {
        width: 100%;

        .detail-content {
          padding: 20px 24px 0;
          margin-bottom: 24px;
          background-color: #fff;
          .base-facts {
            margin-top: 8px;
          }
          .base-title {
            position: relative;
            padding-left: 12px;
            margin-bottom: 8px;
            height: 24px;
            line-height: 24px;
            font-size: 16px;
            color: #444;
            font-weight: 600;

            &::before {
              content: '';
              position: absolute;
              left: 0px;
              top: 50%;
              transform: translateY(-50%);
              width: 4px;
              height: 20px;
              background: #00c7db;
            }
          }

          .info-content {
            width: 100%;
            padding: 16px 16px 4px;
            background: #f9f9f9;
            margin-bottom: 16px;
            border-radius: 4px;
            .info-item {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              width: 100%;
              > div {
                width: fit-content;
                min-width: 404px;
                line-height: 16px;
                font-size: 14px;
                color: #999;
                line-height: 22px;
                margin-bottom: 12px;
                > span {
                  color: #444;
                }
                &.w-100 {
                  display: flex;
                  width: 100%;
                  flex-shrink: 0;
                  > div {
                    width: 70px;
                    white-space: nowrap;
                  }
                  > span {
                    // width: 739px;
                    white-space: pre-wrap;
                    word-break: normal;
                    word-wrap: break-word;
                  }
                }

                .bidcompany {
                  color: #00c7db;
                  cursor: pointer;
                }
              }
            }
          }

          /deep/.facts-content {
            margin-bottom: 24px;
            font-size: 16px;
            color: #666;
            // line-height: 32px;
            p,
            span {
              font-size: 16px;
              color: #666;
            }
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
        }

        .tab-wrp {
          background: white;
          border-radius: 4px;
        }
      }
    }
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
</style>
