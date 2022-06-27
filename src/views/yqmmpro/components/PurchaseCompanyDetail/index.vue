<template>
  <div class="purchase-company-detail-wrapper">
    <!-- 已被删除 -->
    <template v-if="isDelete">
      <LoadStep :loading-satus="2" :result-status="1" style="margin-top: 55px"></LoadStep>
    </template>
    <!-- 未被删除 -->
    <template v-else>
      <!-- 操作栏 -->
      <MuPageHeader :title="title">
        <div class="detail-title-buttons-wrp">
          <DetailShareButton
            :id="id"
            :name="shareInfo.name"
            :query="shareInfo.query"
            :browser-url="shareInfo.browserUrl"
            :wx-url="shareInfo.wxUrl"
          ></DetailShareButton>
        </div>
      </MuPageHeader>
      <!-- 头部 -->
      <div class="detail-content">
        <div class="detail-info">
          <div class="dtl-info-logo">
            <img src="https://img.mumuxili.com/yqmm/pc/saas/images/blur/purchase.png" alt="" />
          </div>
          <div class="dtl-info-con">
            <div class="info-con-head">
              <span class="title">中国联合网络通信集团股份有限公司肯德基撒可富</span>
              <span class="mark primary">已认证</span>
            </div>
            <div class="info-con-city">南京市</div>
            <div v-if="isSchool" class="info-con-code">
              <span>学校标识码：</span>
              <span>465465456456465465465465465</span>
            </div>
            <div v-else class="info-con-code">
              <span>统一社会信用代码：</span>
              <span>465465456456465465465465465</span>
            </div>
            <div class="info-attention">180关注</div>
          </div>
        </div>
        <div class="detail-brief">
          <span class="label">简介：</span>
          <span class="value" :class="{'unfold': detailBriefUnfold}">
            {{ detailBrief }}
            <span v-if="detailBriefUnfold" class="fold" @click="detailBriefUnfold = false">收起</span>
            <span class="text-fix">{{ detailBrief }}<span v-if="!detailBriefUnfold" class="text-more" @click="detailBriefUnfold = true">... 更多</span></span>
          </span>
        </div>
      </div>
      <!-- 可查看 -->
      <template v-if="hasResearcher || hasContact || hasFund || hasMajor || hasPurchase || hasBid">
        <!-- tab切换区域 -->
        <div class="tabs-list">
          <a-tabs size="large" :active-key="tabActiveKey" @change="handleTabChange">
            <a-tab-pane v-if="hasResearcher" key="1" tab="科研客户">
              <CompanyResearcher></CompanyResearcher>
            </a-tab-pane>
            <a-tab-pane v-if="hasContact" key="2" tab="采购联系人">
              <CompanyContact></CompanyContact>
            </a-tab-pane>
            <a-tab-pane v-if="hasFund" key="3" tab="基金课题">
              <ProjectFund></ProjectFund>
            </a-tab-pane>
            <a-tab-pane v-if="hasMajor" key="4" tab="重大商情">
              <CompanyMajor></CompanyMajor>
            </a-tab-pane>
            <a-tab-pane v-if="hasPurchase" key="5" tab="采购意向">
              <CompanyPurchase></CompanyPurchase>
            </a-tab-pane>
            <a-tab-pane v-if="hasBid" key="6" tab="招投标">
              <CompanyBid></CompanyBid>
            </a-tab-pane>
          </a-tabs>
        </div>
      </template>
      <template v-else>
        <div class="empty-wrap">
          <img v-if="isSchool" class="school-empty" src="https://img.mumuxili.com/yqmm/pc/saas/images/school_detail_empty.png" alt="" />
          <img v-else class="company-empty" src="https://img.mumuxili.com/yqmm/pc/saas/images/company_detail_empty.png" alt="" />
        </div>
      </template>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getYqmmQrCode } from '@/api/index.js'
  const LoadStep = () => import('@/views/yqmmpro/components/LoadStep/index.vue')
  const CompanyContact = () => import('./components/CompanyContact.vue')
  const ProjectFund = () => import('./components/ProjectFund.vue')
  const DetailShareButton = () => import('@/views/yqmmpro/components/DetailShareButton.vue')
  const CompanyMajor = () => import('./components/CompanyMajor.vue')
  const CompanyPurchase = () => import('./components/CompanyPurchase.vue')
  const CompanyBid = () => import('./components/CompanyBid.vue')
  const CompanyResearcher = () => import('./components/CompanyResearcher.vue')

  export default {
    name: 'PurchaseCompanyDetail',
    components: {
      LoadStep,
      CompanyContact,
      ProjectFund,
      DetailShareButton,
      CompanyMajor,
      CompanyPurchase,
      CompanyBid,
      CompanyResearcher,
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
        /**是否已解锁 */
        viewable: true,
        isSchool: true, // 是否是学校
        title: '企业详情',
        detail: {},
        /**未解锁小程序码 */
        qrCode: '',
        tabActiveKey: '1',
        hasResearcher: true, // 科研客户是否有数据
        hasContact: true, // 采购联系人是否有数据
        hasFund: true, // 基金课题是否有数据
        hasMajor: true, // 重大商情是否有数据
        hasPurchase: true, // 采购意向是否有数据
        hasBid: true, // 招投标是否有数据
        detailBriefUnfold: false, // 简介是否展开
        detailBrief: '信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯信集团股份有团股份有限公司肯信集团股份有限公司肯信集团股份有限公司肯'
      }
    },
    computed: {
      ...mapGetters(['drawerLayoutLoading']),
      // todo 根据企业详情中的企业类型生成不同的分享参数
      shareInfo() {
        let companyType = 1
        if (companyType === 1) {
          return {
            name: 'name',
            query: 'companyId=' + '加密id',
            browserUrl: 'yqmmpro/detail/purchase-company',
            wxUrl: 'pages/mine/society/enterprise/detail/detail',
          }
        } else {
          return {
            name: 'name',
            query: 'schoolId=' + '加密id',
            browserUrl: 'yqmmpro/detail/purchase-company',
            wxUrl: 'pages/company/schoolDetail/index',
          }
        }
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
    mounted() {},
    methods: {
      async getDetail(pageId) {
        console.log(pageId)
      },
      handleTabChange(key) {
        this.tabActiveKey = key
      },
      handleBriefClick(e) {
        console.log(e)
      },
    },
  }
</script>

<style lang="less">
.purchase-company-detail-wrapper {
    > .detail-content {
      box-sizing: border-box;
      padding: 16px 24px;
      background: #f9f9f9;
      > .detail-info {
        display: flex;
        > .dtl-info-logo {
          width: 60px;
          height: 60px;
          overflow: hidden;
          margin-right: 16px;
          flex-shrink: 0;
          > img {
            width: 100%;
            height: auto;
          }
        }
        > .dtl-info-con {
          flex-grow: 1;
          font-size: 14px;
          color: #999;
          position: relative;
          > .info-con-head {
            display: flex;
            align-items: center;
            > .title {
              color: #444;
              font-size: 16px;
              font-weight: bold;
              margin-right: 12px;
            }
            > .mark {
              border: 1px solid #ccc;
              color: #ccc;
              box-sizing: border-box;
              height: 22px;
              width: 52px;
              text-align: center;
              line-height: 21px;
              border-radius: 11px;
              font-size: 12px;
              flex-shrink: 0;
              margin-top: 2px;
              &.primary {
                border-color: #00c7db;
                color: #00c7db;
              }
            }
          }
          > .info-attention {
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 14px;
            color: #999999;
          }
        }
      }
      > .detail-brief {
        font-size: 13px;
        display: flex;
        margin-top: 16px;
        > .label {
          color: #999999;
          flex-shrink: 0;
        }
        > .value {
          color: #666;
          line-height: 22px;
          max-height: 88px;
          overflow: hidden;
          position: relative;
          text-align: justify;
          word-break: break-all;
          > .fold {
            cursor: pointer;
            color: #00C7DB;
          }
          &.unfold {
            max-height: none;
            > .text-fix {
              max-height: none;
              overflow: visible;
            }
          }
          > .text-fix {
            position: absolute;
            top: -22px;
            left: 0;
            right: 0;
            max-height: 110px;
            overflow: hidden;
            color: transparent;
            > .text-more {
              position: absolute;
              top: 88px;
              right: 0;
              color: #00C7DB;
              cursor: pointer;
              background: #f9f9f9;
            }
          }
        }
      }
    }
  > .tabs-list {
    padding: 16px 24px;
    box-sizing: border-box;
  }
  > .empty-wrap {
    text-align: center;
    margin-top: 60px;
    > .school-empty {
      width: 551px;
      height: 266px;
    }
    > .company-empty {
      width: 543px;
      height: 265px;
    }
  }
}
</style>
