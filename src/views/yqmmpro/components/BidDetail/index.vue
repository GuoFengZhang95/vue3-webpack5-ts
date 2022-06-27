<template>
  <div ref="bidDetail" class="bid-detail-wrapper">
    <!-- 已被删除 -->
    <template v-if="isDelete">
      <LoadStep :loading-satus="2" :result-status="1" style="margin-top: 55px"></LoadStep>
    </template>
    <!-- 未被删除 -->
    <template v-else>
      <!-- 标讯/采购意向详情 -->
      <div class="main-container">
        <MuPageHeader title="标讯详情">
          <div class="detail-title-buttons-wrp">
            <DetailShareButton
              :id="pageId"
              :name="detailInfo.titleDetail.title"
              :query="'tokenEncodeId=' + pageId"
              browser-url="yqmmpro/detail/bid"
              wx-url="pages/content/bid/detail/detail"
            ></DetailShareButton>
            <template v-if="!isUnlock">
              <a-button :type="collectButtonStatus.type" @click="collect">
                {{ collectButtonStatus.text }}
              </a-button>
              <a-button
                v-if="
                  detailInfo.operateDetail.isShowOrigin && detailInfo.operateDetail.originAddress
                "
                @click="viewSource"
              >
                查看原文
              </a-button>
            </template>
          </div>
        </MuPageHeader>
        <div class="detail-title">
          <div class="common-title">
            <div class="title">{{ detailInfo.titleDetail.title }}</div>
            <div class="detail">
              <div class="detail-left show-line_1">
                <div v-if="detailInfo.titleDetail.bidTypeName" class="bid-tag">
                  {{ detailInfo.titleDetail.bidTypeName }}
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
        <Blur v-if="isUnlock" module="bid" :qrcode="'data:image/png;base64,' + qrCode"></Blur>
        <div v-else class="detail-container">
          <div class="detail-content">
            <!-- 基本信息 -->
            <div v-if="isBaseInfoShow" class="base-info">
              <div class="base-title">标讯简介</div>
              <div class="info-content">
                <div v-if="detailInfo.baseInfo && detailInfo.baseInfo !== {}" class="info-item bid">
                  <div v-if="detailInfo.baseInfo.bidName" class="w-100">
                    <div>项目名称：</div>
                    <span>{{ detailInfo.baseInfo.bidName }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidNo" class="w-100">
                    <div>项目编号：</div>
                    <span>{{ detailInfo.baseInfo.bidNo }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidProduct" class="w-100">
                    <div>采购产品：</div>
                    <span>{{ detailInfo.baseInfo.bidProduct }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidPurchaseBudget">
                    预算：
                    <span>{{ detailInfo.baseInfo.bidPurchaseBudget }}万元</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidDeadline">
                    报名/公告截止时间：
                    <span>{{ detailInfo.baseInfo.bidDeadline }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidStartDate">
                    开标时间：
                    <span>{{ detailInfo.baseInfo.bidStartDate }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidAddress">
                    采购单位地址：
                    <span>{{ detailInfo.baseInfo.bidAddress }}</span>
                  </div>
                  <!-- todo 采购单位id待确认 -->
                  <div v-if="detailInfo.baseInfo.bidCompany">
                    采购单位：
                    <span class="bidcompany" @click="goPurchaseCompanyDetail">
                      {{ detailInfo.baseInfo.bidCompany }}
                    </span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidContent">
                    采购方联系人：
                    <span>{{ detailInfo.baseInfo.bidContent }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidTel">
                    采购方电话：
                    <span>{{ detailInfo.baseInfo.bidTel }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.agencyCompany">
                    招标代理单位：
                    <span>{{ detailInfo.baseInfo.agencyCompany }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.agencyContent">
                    招标代理联系人：
                    <span>{{ detailInfo.baseInfo.agencyContent }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.agencyTel">
                    招标代理联系人电话：
                    <span>{{ detailInfo.baseInfo.agencyTel }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.winBidList" class="w-100">
                    <div>中标信息：</div>
                    <span>{{ detailInfo.baseInfo.winBidList }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.winBidContact">
                    中标方联系人：
                    <span>{{ detailInfo.baseInfo.winBidContact }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.winBidTel">
                    中标方联系电话：
                    <span>{{ detailInfo.baseInfo.winBidTel }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.bidReviewer">
                    评审专家：
                    <span>{{ detailInfo.baseInfo.bidReviewer }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.contractNo">
                    合同编号：
                    <span>{{ detailInfo.baseInfo.contractNo }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.contractName">
                    合同名称：
                    <span>{{ detailInfo.baseInfo.contractName }}</span>
                  </div>
                  <div v-if="detailInfo.baseInfo.contractDate">
                    合同签订日期：
                    <span>{{ detailInfo.baseInfo.contractDate }}</span>
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
            </div>
            <!-- 项目概况 -->
            <div class="base-facts">
              <div class="base-title">项目详情</div>
              <div class="facts-content">
                <MuClamp :content="detailInfo.facts"></MuClamp>
              </div>
            </div>
          </div>
          <BidPurchaseDetailTab
            v-if="isTabShow"
            :id="pageId"
            ref="bidDetailTab"
            :page-type="2"
            @pageChange="handleTabPageChange"
          ></BidPurchaseDetailTab>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { getBidDetail, getBidLikeCollectInfo, collect, getYqmmQrCode } from '@/api/index.js'
  import { formateNum } from '@/utils/index'
  const BidPurchaseDetailTab = () => import('./Tab')
  const DownloadFilePanel = () => import('@/components/local/DownloadFilePanel/index.vue')
  const Blur = () => import('@/views/yqmmpro/components/Blur')
  const LoadStep = () => import('@/views/yqmmpro/components/LoadStep/index.vue')
  const DetailShareButton = () => import('@/views/yqmmpro/components/DetailShareButton.vue')
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  export default {
    name: 'BidDetail',
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
        async handler(newVal, oldVal) {
          if (!newVal) return
          // 这种写法简单，但是需要等所有数据加载完成
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
        this.$refs.bidDetail.scrollTo(0, top)
      },
      copyShareLink() {
        const text = `${window.location.origin}/yqmmpro/detail/bid/${this.pageId}#${this.detailInfo.titleDetail.title}`
        if (window.navigator.clipboard) {
          navigator.clipboard.writeText(text)
        } else if (window.clipboardData) {
          window.clipboardData.setData('Text', text)
        }
        this.$message.success('已复制页面链接')
      },
      // 获取文章详情
      async getDetail(pageId) {
        const res = await getBidDetail({ tokenEncodeId: pageId })
        if (res.code === '0') {
          let val = res.data.xcxInfoResult
          if (val && JSON.stringify(val) !== '{}') {
            let titleDetail = {
              title: val.title,
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
              this.$message.info('标讯查看额度-1')
            }
          } else {
            this.isUnlock = true
            //无法解锁 获取小程序二维码
            await this.handleQRCode()
            return
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
          this.isDelete = true
          this.$message.error('该内容已被删除或下架')
        }
      },
      // 获取小程序码回调
      async handleQRCode() {
        let params = {
          page: 'pages/content/bid/detail/detail',
          scene: `id=${this.pageId}&platform=saas`,
        }
        let { code, data } = await getYqmmQrCode(params)
        if (code === '0') {
          this.qrCode = data
        }
      },
      // 处理标讯简介信息
      handleBaseInfo(e) {
        let winBidList = []
        if (e.winBidList && e.winBidList.length) {
          winBidList = e.winBidList.map(item => {
            let money = item.winBidMoneyNum ? '，' + item.winBidMoneyNum + '万元' : ''
            return item.winBidCompany + money
          })
        }

        let id1 = [804, 805, 806, 807, 808, 809]
        let id2 = [813, 814]
        if (e.bidTypeId === 802) {
          // 招标
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: e.bidPurchaseBudget ? e.bidPurchaseBudget : '',
            bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: e.bidDeadline ? e.bidDeadline : '',
            bidStartDate: e.bidStartDate ? e.bidStartDate : '',
            bidAddress: '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: e.bidContent ? e.bidContent.replaceAll(';', '、') : '',
            bidTel: e.bidTel ? e.bidTel.replaceAll(';', '、') : '',
            agencyCompany: e.agencyCompany ? e.agencyCompany : '',
            agencyContent: e.agencyContent ? e.agencyContent.replaceAll(';', '、') : '',
            agencyTel: e.agencyTel ? e.agencyTel.replaceAll(';', '、') : '',
            winBidList: '',
            winBidContact: '',
            winBidTel: '',
            bidReviewer: '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        } else if (e.bidTypeId === 803) {
          // 竞价
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: e.bidPurchaseBudget ? e.bidPurchaseBudget : '',
            bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: e.bidDeadline ? e.bidDeadline : '',
            bidStartDate: '',
            bidAddress: '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: e.bidContent ? e.bidContent.replaceAll(';', '、') : '',
            bidTel: e.bidTel ? e.bidTel.replaceAll(';', '、') : '',
            agencyCompany: '',
            agencyContent: '',
            agencyTel: '',
            winBidList: '',
            winBidContact: '',
            winBidTel: '',
            bidReviewer: '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        } else if (id1.indexOf(e.bidTypeId) !== -1) {
          // 其他招标公告类
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: e.bidPurchaseBudget ? e.bidPurchaseBudget : '',
            bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: e.bidDeadline ? e.bidDeadline : '',
            bidStartDate: e.bidStartDate ? e.bidStartDate : '',
            bidAddress: '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: e.bidContent ? e.bidContent.replaceAll(';', '、') : '',
            bidTel: e.bidTel ? e.bidTel.replaceAll(';', '、') : '',
            agencyCompany: '',
            agencyContent: '',
            agencyTel: '',
            winBidList: '',
            winBidContact: '',
            winBidTel: '',
            bidReviewer: '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        } else if (e.bidTypeId === 811) {
          // 中标
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: '',
            bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: '',
            bidStartDate: '',
            bidAddress: '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: e.bidContent ? e.bidContent.replaceAll(';', '、') : '',
            bidTel: e.bidTel ? e.bidTel.replaceAll(';', '、') : '',
            agencyCompany: e.agencyCompany ? e.agencyCompany : '',
            agencyContent: e.agencyContent ? e.agencyContent.replaceAll(';', '、') : '',
            agencyTel: e.agencyTel ? e.agencyTel.replaceAll(';', '、') : '',
            winBidList: winBidList.join('；'),
            winBidContact: e.winBidContact ? e.winBidContact.replaceAll(';', '、') : '',
            winBidTel: e.winBidTel ? e.winBidTel.replaceAll(';', '、') : '',
            bidReviewer: e.bidReviewer ? e.bidReviewer.replaceAll(';', '、') : '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        } else if (e.bidTypeId === 812) {
          // 成交
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: '',
            bidProduct: '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: e.bidDeadline ? e.bidDeadline : '',
            bidStartDate: '',
            bidAddress: '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: e.bidContent ? e.bidContent.replaceAll(';', '、') : '',
            bidTel: e.bidTel ? e.bidTel.replaceAll(';', '、') : '',
            agencyCompany: '',
            agencyContent: '',
            agencyTel: '',
            winBidList: winBidList.join('；'),
            winBidContact: e.winBidContact ? e.winBidContact.replaceAll(';', '、') : '',
            winBidTel: e.winBidTel ? e.winBidTel.replaceAll(';', '、') : '',
            bidReviewer: '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        } else if (id2.indexOf(e.bidTypeId) !== -1) {
          // 其他招标结果类
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: '',
            bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: '',
            bidStartDate: '',
            bidAddress: '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: e.bidContent ? e.bidContent.replaceAll(';', '、') : '',
            bidTel: e.bidTel ? e.bidTel.replaceAll(';', '、') : '',
            agencyCompany: '',
            agencyContent: '',
            agencyTel: '',
            winBidList: winBidList.join('；'),
            winBidContact: e.winBidContact ? e.winBidContact.replaceAll(';', '、') : '',
            winBidTel: e.winBidTel ? e.winBidTel.replaceAll(';', '、') : '',
            bidReviewer: '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        } else if (e.bidTypeId === 816) {
          // 合同
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: '',
            bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: '',
            bidStartDate: '',
            bidAddress: e.bidAddress ? e.bidAddress : '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: '',
            bidTel: e.bidTel ? e.bidTel.replaceAll(';', '、') : '',
            agencyCompany: '',
            agencyContent: '',
            agencyTel: '',
            winBidList: winBidList.join('；'),
            winBidContact: '',
            winBidTel: e.winBidTel ? e.winBidTel.replaceAll(';', '、') : '',
            bidReviewer: '',
            contractNo: e.contractNo ? e.contractNo.replaceAll(';', '、') : '',
            contractName: e.contractName ? e.contractName.replaceAll(';', '、') : '',
            contractDate: e.contractDate ? e.contractDate : '',
          })
        } else if (e.bidTypeId === 817) {
          // 验收
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: '',
            bidProduct: e.bidProduct ? e.bidProduct.replaceAll(';', '、') : '',
            bidNo: e.bidNo ? e.bidNo : '',
            bidName: e.bidName ? e.bidName : '',
            bidDeadline: '',
            bidStartDate: '',
            bidAddress: e.bidAddress ? e.bidAddress : '',
            bidCompany: e.bidCompany ? e.bidCompany : '',
            companyId: e.companyId ?? 0,
            bidContent: '',
            bidTel: '',
            agencyCompany: '',
            agencyContent: '',
            agencyTel: '',
            winBidList: winBidList.join('；'),
            winBidContact: '',
            winBidTel: '',
            bidReviewer: '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        } else if (e.bidTypeId === 819) {
          // 其他-其他
          Object.assign(this.detailInfo.baseInfo, {
            bidPurchaseBudget: '',
            bidProduct: '',
            bidNo: '',
            bidName: '',
            bidDeadline: '',
            bidStartDate: '',
            bidAddress: '',
            bidCompany: '',
            companyId: 0,
            bidContent: '',
            bidTel: '',
            agencyCompany: '',
            agencyContent: '',
            agencyTel: '',
            winBidList: '',
            winBidContact: '',
            winBidTel: '',
            bidReviewer: '',
            contractNo: '',
            contractName: '',
            contractDate: '',
          })
        }

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
      /**查看原文 */
      viewSource() {
        window.open(this.detailInfo.operateDetail.originAddress, '_blank')
      },
      /** 打开采购单位详情 */
      goPurchaseCompanyDetail() {
        this.$globalDrawer.show({
          component: PurchaseCompanyDetail,
          options: {
            name: 'PurchaseCompanyDetail',
            props: {
              id: this.detailInfo.baseInfo.companyId,
            },
          },
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .bid-detail-wrapper {
    padding-bottom: 24px;

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
          margin-bottom: 28px;
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
      }
    }

    .default-container {
      height: 710px;
      background-color: #fff;

      .detail-default {
        position: relative;
        width: 310px;
        height: 310px;
        margin: 54px auto 0;

        > img {
          width: 310px;
          height: 310px;
        }

        > span {
          position: absolute;
          bottom: 11px;
          left: 0;
          width: 100%;
          text-align: center;
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
