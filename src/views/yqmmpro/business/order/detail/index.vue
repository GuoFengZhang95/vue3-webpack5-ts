<template>
  <div class="order-detail-wrapper">
    <MuPageHeader :title="'需求详情'"></MuPageHeader>
    <div class="demand-simple-info-wrap">
      <div class="demand-title-wrap display">
        <div class="demand-name ellipsis">{{ renderObj.businessName }}</div>
        <div class="demand-status" :class="businessStatusStyle">
          {{ businessStatus }}
        </div>
      </div>
      <div class="demand-type-wrap display">
        <div class="split-type">{{ renderObj.businessNo || '-' }}</div>
        <div class="split-type">{{ demandType || '-' }}</div>
        <div class="demand-time">{{ renderObj.createtime || '-' }}</div>
      </div>
    </div>
    <div class="demand-info-container">
      <a-collapse
        v-model="activeKey"
        :bordered="false"
        expand-icon-position="right"
        class="demand-config"
        @change="changeActivekey"
      >
        <a-collapse-panel key="1" header="基本信息">
          <a-row class="distance">
            <a-col :span="8">
              <div class="city">
                <p>城市：</p>
                <p>{{ renderObj.cityName || '-' }}</p>
              </div>
            </a-col>
            <a-col class="col-item" :span="8">
              <span>
                项目阶段：
                <i>{{ period || '-' }}</i>
              </span>
            </a-col>
            <a-col class="col-item" :span="8">
              <span>
                采购时间：
                <i>{{ renderObj.purchaseDateToString || '-' }}</i>
              </span>
            </a-col>
          </a-row>
          <a-row class="distance">
            <a-col class="col-item" :span="8">
              <span>
                预算（万元）：
                <i>{{ renderObj.budget || '-' }}</i>
              </span>
            </a-col>
            <a-col class="col-item" :span="8">
              <span>
                截止日期：
                <i>{{ renderObj.deadlineToString || '-' }}</i>
              </span>
            </a-col>
            <a-col class="col-item" :span="8">
              <span>
                是否允许接单方主动联系：
                <i>{{ renderObj.isAllowConcat === 1 ? '是' : '否' }}</i>
              </span>
            </a-col>
          </a-row>
          <a-row class="distance">
            <a-col class="col-item" :span="24">
              <div class="provide-info">
                <p>希望接单方提供的信息：</p>
                <p>{{ renderObj.wishDimension || '-' }}</p>
              </div>
            </a-col>
          </a-row>
          <a-row class="distance">
            <a-col class="col-item" :span="8">
              <div class="publisher">
                <p>发布人：</p>
                <p>{{ renderObj.userName || '-' }}</p>
              </div>
            </a-col>
            <a-col class="col-item" :span="16">
              <div class="scene">
                <p>来源场景：</p>
                <p>{{ sourceScene || '-' }}</p>
              </div>
            </a-col>
          </a-row>
        </a-collapse-panel>
      </a-collapse>
      <a-collapse
        v-model="activeKey"
        :bordered="false"
        expand-icon-position="right"
        class="demand-config"
        @change="changeActivekey"
      >
        <a-collapse-panel key="2" header="需求详情">
          <div class="content-wrap" v-html="renderObj.advantage"></div>
          <File :file-list="demandList"></File>
        </a-collapse-panel>
      </a-collapse>
      <a-collapse
        v-model="activeKey"
        :bordered="false"
        expand-icon-position="right"
        class="receive-order"
        @change="changeActivekey"
      >
        <a-collapse-panel key="3" header="参与接单人">
          <OrderTable :business-id="orderId" :lock-id="lockId" :row-id="rowId"></OrderTable>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
  import { getBusinessDetail, getFilesList } from '@/api/index.js'
  const OrderTable = () => import('./components/receiveOrderTable.vue')
  const File = () => import('./components/File.vue')
  export default {
    name: 'OrderDetail',
    components: {
      OrderTable,
      File,
    },
    props: {
      externalProp: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        orderId: '',
        lockId: '', //解锁id
        rowId: 0, //解锁id
        activeKey: ['1', '2', '3'], // 折叠面板的key
        renderObj: {},
        demandList: [],
        demandType: '', // 需求类型
        period: '', // 需求阶段
        platform: '', // 来源平台
        sourceScene: '', // 来源场景
        businessStatus: '', // 需求状态
        businessStatusStyle: '', // 需求状态样式
        userId: 0, // 用户id
        userData: {}, // 用户信息
      }
    },
    watch: {
      externalProp: {
        handler(val) {
          if (val) {
            this.orderId = val.articleId
            this.lockId = val.unLockUserId
            this.rowId = val.rowId
            this.init()
          }
        },
        immediate: true,
      },
    },
    methods: {
      init() {
        this.getDemandDetail()
        this.getAttachmentList()
      },
      getDemandDetail() {
        getBusinessDetail({ id: this.orderId }).then(res => {
          this.renderObj = res.data
          this.renderObj.advantage =
            this.renderObj.description && this.renderObj.description.replace(/\n/g, '<br/>')
          if (this.renderObj.businessType) {
            let type = this.renderObj.businessType
            const obj = {
              1: '仪器设备',
              2: '耗材试剂',
              6: '仪器租赁',
              7: '技术咨询',
              8: '其他服务',
            }
            this.demandType = obj[type] || ''
          }

          if (this.renderObj.projectStage) {
            let type = this.renderObj.projectStage
            const obj = { 1: '调研', 2: '选型', 3: '报价', 4: '采购' }
            this.period = obj[type] || ''
          }
          if (this.renderObj.sourcePlatform) {
            let type = this.renderObj.sourcePlatform
            const obj = {
              1: '商城',
              2: '仪器+',
              3: '有需必应',
              4: '翰林院',
              5: '仪器买卖',
              6: '木木课堂',
              7: '芝麻研',
              8: 'SAAS',
              9: 'CMS',
            }
            this.platform = obj[type] || ''
          }
          if (this.renderObj.sourceScene) {
            let type = this.renderObj.sourceScene
            const obj = {
              1: '小程序',
              2: 'web',
              3: '服务号H5',
              4: '产品搜索',
              5: '产品列表',
              6: '全球代购',
              7: '方案馆',
              8: 'QQ客服',
              9: '400电话',
              10: '百度推广',
              11: '电话客服',
              12: '邮件',
              13: '群运营',
              14: '线下展会',
            }
            this.sourceScene = obj[type] || ''
          }
          if (this.renderObj.businessStatus) {
            let type = this.renderObj.businessStatus
            const obj = {
              1: '发布中',
              2: '已完成',
              3: '已关闭',
              4: '商谈中',
              5: '已禁用',
            }
            this.businessStatus = obj[type] || ''
            this.businessStatusStyle =
              type === 1 || type === 4
                ? 'progressing'
                : type === 2
                ? 'worked'
                : type === 3 || type === 5
                ? 'closed'
                : ''
          }

          this.renderObj.wishDimension = this.renderObj.wishDimension
            ? this.renderObj.wishDimension.replaceAll(',', '、')
            : ''
        })
      },
      //需求附件
      async getAttachmentList() {
        getFilesList({ id: this.orderId }).then(res => {
          if (res.code === '0') {
            this.demandList = res.data
          }
        })
      },
      changeActivekey(e) {
        this.activeKey = e
      },
    },
  }
</script>

<style lang="less" scoped>
  .order-detail-wrapper {
    .ant-collapse {
      margin-top: 4px;
    }

    /deep/ .ant-modal-title {
      font-weight: bold;
      color: #444;
    }

    .demand-simple-info-wrap {
      width: 100%;
      background: #f9f9f9;
      padding: 16px 24px;

      .display {
        display: flex;
        align-items: center;
      }

      .ellipsis {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .demand-title-wrap {
        margin-bottom: 8px;

        .demand-name {
          color: #444;
          margin-right: 16px;
        }

        .demand-status {
          min-width: 52px;
          width: 52px;
          height: 20px;
          border-radius: 11px;
          font-size: 12px;
          text-align: center;
        }

        .progressing {
          border: 1px solid #00c7db;
          color: #00c7db;
        }

        .worked {
          border: 1px solid #52c41a;
          color: #52c41a;
        }

        .closed {
          border: 1px solid #ccc;
          color: #ccc;
        }
      }

      .demand-type-wrap {
        font-size: 13px;
        color: #999;

        .split-type {
          position: relative;
          margin-right: 32px;

          &::after {
            content: '';
            width: 1px;
            height: 12px;
            background: #d9d9d9;
            position: absolute;
            top: 50%;
            right: -16px;
            transform: translateY(-50%);
          }
        }
      }
    }

    .demand-config {
      /deep/ .ant-collapse-arrow {
        width: 12px;
        left: 86px;
      }
    }

    .receive-order {
      /deep/ .ant-collapse-arrow {
        width: 12px;
        left: 102px;
      }
    }
  }

  .demand-info-container {
    padding: 0 24px;
    font-size: 13px;

    .distance {
      margin-bottom: 12px !important;

      .city,
      .companyName {
        padding-right: 27px;

        p:nth-child(1) {
          min-width: 42px;
        }
      }

      .publisher {
        padding-right: 27px;

        p:nth-child(1) {
          min-width: 56px;
        }
      }

      .provide-info {
        p:nth-child(1) {
          min-width: 154px;
        }
      }
    }

    .city,
    .provide-info,
    .publisher,
    .scene,
    .companyName {
      display: flex;

      p:nth-child(1) {
        color: #999;
        margin-bottom: 0;
      }

      p:nth-child(2) {
        word-break: break-all;
        color: #444;
        margin-bottom: 0;
      }
    }

    .big-distance {
      margin-bottom: 16px;

      .scene {
        padding-right: 27px;

        p:nth-child(1) {
          min-width: 70px;
        }
      }
    }

    .col-item {
      padding-right: 16px;
      > span {
        > i {
          color: #444;
        }
      }
    }

    .content-wrap {
      max-height: 95px;
      color: #999;
      font-size: 13px;
      overflow: auto;
      margin-bottom: 16px;
    }
  }

  .ant-collapse {
    background-color: #fff;
    margin-top: 16px;

    /deep/ .ant-collapse-header {
      font-size: 16px;
      color: #666 !important;
      padding: 12px 0 10px !important;
      width: 150px;

      > .anticon {
        color: #ccc;
      }

      &::before {
        content: '';
        display: inline-block;
        width: 4px;
        height: 14px;
        background-color: #00c7db;
        vertical-align: -2px;
        margin-right: 11px;
      }
    }

    > .ant-collapse-item {
      border-bottom: 1px solid #ebebeb;
    }
  }

  /deep/ .ant-collapse-content-box {
    padding: 0;
  }
</style>

<style lang="less" scoped>
  .order-detail-wrapper {
    .tips-wrp {
      position: relative;
      padding-left: 28px;

      .icon-warning {
        position: absolute;
        left: 0px;
        top: 1px;
        width: 20px;
        height: 20px;
        background: #ff4433;
        border-radius: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
      }
    }

    .ant-btn {
      font-size: 13px;
    }

    /deep/ .ant-btn.ant-btn-primary {
      margin-right: 16px;
    }

    /deep/ .ant-btn.ant-btn-default {
      color: #666;
    }
  }
</style>
