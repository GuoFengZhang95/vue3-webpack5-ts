<template>
  <div class="fund-detail-wrapper">
    <!-- 已被删除 -->
    <template v-if="isDelete">
      <LoadStep :loading-satus="2" :result-status="1" style="margin-top: 55px"></LoadStep>
    </template>
    <!-- 未被删除 -->
    <template v-else>
      <MuPageHeader title="基金课题详情">
        <div class="detail-title-buttons-wrp">
          <DetailShareButton
            :id="pageId"
            :name="detail.projectName"
            :query="'projectId=' + pageId"
            browser-url="yqmmpro/detail/fund"
            wx-url="pages/content/fund/detail/detail"
          ></DetailShareButton>
          <template v-if="viewable">
            <a-button :type="collectButtonStatus.type" @click="collect">
              {{ collectButtonStatus.text }}
            </a-button>
          </template>
        </div>
      </MuPageHeader>
      <div class="fund-title-wrapper">
        <div class="title-content">
          <div class="title">{{ detail.projectName }}</div>
          <div v-if="detail.projectTypeName" class="tag">{{ detail.projectTypeName }}</div>
        </div>
        <div class="bottom">
          <div class="left">
            <div v-if="detail.projectNum" class="item">{{ detail.projectNum }}</div>
            <div v-if="detail.projectFunds" class="item">{{ detail.projectFunds }}万元</div>
          </div>
          <div class="right">
            {{ formatCollectNum }}
            <span>收藏</span>
          </div>
        </div>
      </div>

      <!-- 可查看 -->
      <template v-if="viewable">
        <div class="base-title">基本信息</div>
        <div class="base-info-wrapper">
          <div v-if="detail.projectType === 1" class="row-col">
            <a-row :gutter="[0, 12]">
              <a-col :span="8">
                <span class="label">级别：</span>
                <span class="value">{{ detail.projectLevelName }}</span>
              </a-col>
              <a-col :span="8">
                <span class="label">项目来源：</span>
                <span class="value">{{ detail.projectSourceName }}</span>
              </a-col>
              <a-col :span="8">
                <span class="label">类别：</span>
                <span class="value">{{ detail.projectCategoryName }}</span>
              </a-col>
            </a-row>
            <a-row :gutter="[0, 12]">
              <a-col :span="8">
                <span class="label">来源城市：</span>
                <span class="value">{{ detail.projectSourceCityName }}</span>
              </a-col>
              <a-col :span="8" class="flex">
                <span class="label">依托单位：</span>
                <span class="value">
                  <span
                    v-for="item in memberCompanyNames"
                    :key="item.memberCompanyName"
                    class="membercompany"
                    :class="{ active: !!item.memberCompanyId }"
                    @click="goPurchaseCompanyDetail(item)"
                  >
                    {{ item.memberCompanyName }}
                  </span>
                </span>
              </a-col>
              <a-col :span="8" class="flex">
                <span class="label">负责人：</span>
                <span class="value">
                  <div class="value-list">
                    <div
                      v-for="(item, index) in memberUsers"
                      :key="index"
                      class="value-item"
                      :class="{ active: item.customerId }"
                      @click="openResearcherDetail(item)"
                    >
                      {{ item.memberUserName }}
                    </div>
                  </div>
                </span>
              </a-col>
            </a-row>
            <a-row :gutter="[0, 12]">
              <a-col :span="8">
                <span class="label">依托单位所属城市：</span>
                <span class="value">{{ memberCityNames }}</span>
              </a-col>
              <a-col :span="8">
                <span class="label">立项时间：</span>
                <span class="value">{{ detail.startTime }}</span>
              </a-col>
              <a-col :span="8">
                <span class="label">结项时间：</span>
                <span class="value">{{ detail.endTime }}</span>
              </a-col>
            </a-row>
            <a-row :gutter="[0, 12]">
              <a-col :span="8">
                <span class="label">批准年份：</span>
                <span class="value">{{ detail.approveYear }}</span>
              </a-col>
              <a-col :span="8">
                <span class="label">学科：</span>
                <span class="value">{{ detail.projectSubjectName }}</span>
              </a-col>
            </a-row>
          </div>
          <div v-if="detail.projectType === 2" class="row-col">
            <a-row :gutter="[0, 12]">
              <a-col :span="8">
                <span class="label">项目来源：</span>
                <span class="value">{{ detail.projectSourceName }}</span>
              </a-col>
              <a-col :span="8" class="flex">
                <span class="label">依托单位：</span>
                <span class="value">
                  <span
                    v-for="item in memberCompanyNames"
                    :key="item.memberCompanyName"
                    class="membercompany"
                    :class="{ active: !!item.memberCompanyId }"
                    @click="goPurchaseCompanyDetail(item)"
                  >
                    {{ item.memberCompanyName }}
                  </span>
                </span>
              </a-col>
              <a-col :span="8" class="flex">
                <span class="label">负责人：</span>
                <span class="value">
                  <div class="value-list">
                    <div
                      v-for="(item, index) in memberUsers"
                      :key="index"
                      class="value-item"
                      :class="{ active: item.customerId }"
                      @click="openResearcherDetail(item)"
                    >
                      {{ item.memberUserName }}
                    </div>
                  </div>
                </span>
              </a-col>
            </a-row>
            <a-row :gutter="[0, 12]">
              <a-col :span="8">
                <span class="label">依托单位所属城市：</span>
                <span class="value">{{ memberCityNames }}</span>
              </a-col>
              <a-col :span="8">
                <span class="label">立项时间：</span>
                <span class="value">{{ detail.startTime }}</span>
              </a-col>
              <a-col :span="8">
                <span class="label">结项时间：</span>
                <span class="value">{{ detail.endTime }}</span>
              </a-col>
            </a-row>
          </div>
          <div v-if="detail.projectType === 1" class="info-list">
            <div v-if="detail.keyword" class="list-item">
              <span class="label">关键词：</span>
              <span class="value">{{ detail.keyword }}</span>
            </div>
            <div v-if="detail.keywordEnglish" class="list-item">
              <span class="label">英文关键词：</span>
              <span class="value">{{ detail.keywordEnglish }}</span>
            </div>
            <div v-if="detail.abstractChinese" class="list-item">
              <span class="label">中文摘要：</span>
              <span class="value">{{ detail.abstractChinese }}</span>
            </div>
            <div v-if="detail.abstractEnglish" class="list-item">
              <span class="label">英文摘要：</span>
              <span class="value">{{ detail.abstractEnglish }}</span>
            </div>
            <div v-if="detail.abstractConclusion" class="list-item">
              <span class="label">结题摘要：</span>
              <span class="value">{{ detail.abstractConclusion }}</span>
            </div>
            <div v-if="detail.remark" class="list-item">
              <span class="label">备注：</span>
              <span class="value">{{ detail.remark }}</span>
            </div>
          </div>
        </div>
        <img
          class="img-desc"
          src="https://img.mumuxili.com/yqmm/pc/saas/images/fund_detail_1.svg"
          alt="desc"
        />
      </template>
      <!-- 未解锁 -->
      <template v-if="!viewable && !drawerLayoutLoading">
        <Blur module="fund" :qrcode="'data:image/png;base64,' + qrCode"></Blur>
      </template>
    </template>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { formateNum } from '@/utils/index.js'
  import { collect, getFundDetail, getYqmmQrCode } from '@/api/index.js'
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')
  const LoadStep = () => import('@/views/yqmmpro/components/LoadStep/index.vue')
  const Blur = () => import('@/views/yqmmpro/components/Blur.vue')
  const DetailShareButton = () => import('@/views/yqmmpro/components/DetailShareButton.vue')
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  export default {
    name: 'FundDetail',
    components: {
      Blur,
      LoadStep,
      DetailShareButton,
    },
    filters: {},
    props: {
      id: {
        type: [String, Number],
        default: '',
      },
    },
    data() {
      return {
        pageId: '',
        /**未解锁小程序码 */
        qrCode: '',
        /**是否删除 */
        isDelete: false,
        detail: {},
        /**是否已解锁 */
        viewable: false,
      }
    },
    computed: {
      ...mapGetters(['drawerLayoutLoading']),
      collectButtonStatus() {
        let status = { text: '收藏', type: 'default' }
        if (this.detail.isCollection) {
          status.text = '已收藏'
          status.type = 'primary'
        } else {
          status.text = '收藏'
          status.type = 'default'
        }
        return status
      },
      /**依托单位 */
      memberCompanyNames() {
        let memberCompanys = []
        this.detail.projectMemberInfoList.forEach(m => {
          if (m.memberCompanyId) {
            if (memberCompanys.every(c => c.memberCompanyId !== m.memberCompanyId)) {
              memberCompanys.push(m)
            }
          } else if (m.memberCompanyName) {
            if (memberCompanys.every(c => c.memberCompanyName !== m.memberCompanyName)) {
              memberCompanys.push(m)
            }
          }
        })
        return memberCompanys
      },
      /**依托单位所属城市 */
      memberCityNames() {
        return Array.from(
          new Set(
            this.detail.projectMemberInfoList
              .map(item => item.memberCompanyCityName)
              .filter(item => !!item)
          )
        ).join('，')
      },
      /**负责人 */
      memberUsers() {
        return this.detail.projectMemberInfoList.filter(item => item.memberUserName)
      },
      formatCollectNum() {
        return formateNum(this.detail.collectionCount ?? 0)
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
        handler: async function (val) {
          if (!val) return
          this.$store.dispatch('app/setDrawerLayoutLoading', { flag: true })
          await this.getDetail(val)
        },
        immediate: true,
      },
      detail: {
        handler(val) {
          let viewable = false
          if (val.unlock === 1 || val.unlock === -1) {
            viewable = true
            if (val.unlock === 1) {
              this.$message.info('基金课题额度-1')
            }
            this.$store.dispatch('app/setDrawerLayoutLoading', { flag: false })
          } else {
            viewable = false
            this.handleQRCode()
          }
          this.viewable = viewable
        },
      },
    },
    methods: {
      async getDetail(pageId) {
        const res = await getFundDetail({ targetId: pageId })
        if (res.code === '0') {
          if (res.data.isDelete === 1) {
            this.$store.dispatch('app/setDrawerLayoutLoading', { flag: false })
            this.isDelete = true
            this.$message.error('该内容已被删除或下架')
          } else {
            this.detail = res.data
          }
        }
      },
      /**收藏 */
      async collect() {
        let action = this.detail.isCollection === 1 ? 2 : 1
        let params = {
          targetId: this.pageId,
          module: 13,
          action,
        }
        const res = await collect(params)
        if (res.success) {
          this.detail.isCollection = action === 1 ? 1 : 0
          let deltaCount = action === 1 ? 1 : -1
          this.detail.collectionCount += deltaCount
        }
      },
      /**打开客源详情 */
      openResearcherDetail(item) {
        if (!item.customerId) return
        this.$globalDrawer.show({
          component: ResearcherDetail,
          options: {
            name: 'ResearcherDetail',
            title: '科研客户详情',
            props: {
              id: item.customerId,
            },
          },
        })
      },
      /**无权限查看，获取小程序码 */
      async handleQRCode() {
        let { code, data } = await getYqmmQrCode({
          page: 'pages/content/fund/detail/detail',
          scene: `id=${this.detail.id}&platform=saas`,
          checkPath: true,
          envVersion: process.env.ENV ? 'trial' : 'release',
        })
        if (code === '0') {
          this.qrCode = data
        }
        this.$store.dispatch('app/setDrawerLayoutLoading', { flag: false })
      },
      /** 打开采购单位详情 */
      goPurchaseCompanyDetail(item) {
        if (item.memberCompanyId) {
          this.$globalDrawer.show({
            component: PurchaseCompanyDetail,
            options: {
              name: 'PurchaseCompanyDetail',
              props: {
                id: item.memberCompanyId,
              },
            },
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .fund-detail-wrapper {
    padding-bottom: 24px;

    .fund-title-wrapper {
      position: relative;
      padding: 24px 24px 17px 24px;

      &::after {
        position: absolute;
        content: '';
        width: calc(100% - 48px);
        left: 24px;
        bottom: 0px;
        height: 0px;
        border-top: 1px dashed #ebebeb;
      }

      .title-content {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        .title {
          max-width: calc(100% - 76px);
          min-height: 30px;
          line-height: 30px;
          font-size: 20px;
          font-weight: bold;
          color: #444444;
        }

        .tag {
          margin-left: 12px;
          margin-top: 5px;
          width: 64px;
          height: 20px;
          border: 1px solid #00c7db;
          line-height: 18px;
          font-size: 12px;
          color: #00c7db;
          text-align: center;
          box-sizing: border-box;
          border-radius: 100px 100px 100px 100px;
        }
      }

      .bottom {
        margin-top: 9px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #999999;

        .left {
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .item {
            padding-right: 16px;
            position: relative;
            margin-right: 16px;

            &:not(:last-child)::after {
              position: absolute;
              content: '';
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 0px;
              height: 12px;
              width: 1px;
              background-color: #e9e9e9;
            }
          }
        }
      }
    }

    .base-title {
      margin-top: 20px;
      padding-left: 12px;
      margin-left: 24px;
      position: relative;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      color: #444444;
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

    .base-info-wrapper {
      margin-top: 8px;
      padding: 0 24px;

      .row-col {
        // .ant-row {
        //   .ant-col {
        //     display: flex;
        //     align-items: flex-start;
        //   }
        // }

        .flex {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;

          .value {
            flex: 1;
          }
        }
      }

      .label {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: #999999;
      }

      .value {
        min-height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: #444444;

        .membercompany {
          margin-right: 8px;
          position: relative;

          &.active {
            color: #00c7db;
            cursor: pointer;
          }

          &:not(:last-child)::after {
            position: absolute;
            content: '，';
            color: #444444;
          }
        }
      }

      .value-list {
        // display: flex;
        // flex-wrap: wrap;
        // align-items: flex-start;
        // justify-content: flex-start;

        .value-item {
          display: inline;
          padding-right: 15px;
          position: relative;
          height: 20px;
          line-height: 20px;
          font-size: 13px;

          &.active {
            color: #00c7db;
            cursor: pointer;
          }

          &:not(:last-child):after {
            content: '，';
            position: absolute;
            // top: 0px;
            // right: 5px;
            // width: 10px;
            // height: 10px;
            // text-align: left;
            // color: #444444;
          }
        }
      }

      .info-list {
        .list-item {
          margin-top: 12px;
          word-break: break-all;
        }
      }
    }

    .img-desc {
      display: block;
      margin: 140px auto 0;
      // width: 551px;
      // width: calc(100% - 600px);
      height: 368px;
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
