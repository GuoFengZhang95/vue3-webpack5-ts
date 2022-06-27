<template>
  <div class="order-accept-detail">
    <MuPageHeader :title="'接单详情'"></MuPageHeader>
    <div class="order-info-wrap order-info-head">
      <div class="basic-info">
        <div class="info-wrap">
          <div class="user-name-wrap">
            <div>
              <span class="user-name">{{ renderObj.businessName }}</span>
              <span class="tag tag-green" :class="colorStatus[renderObj.orderStatus]">
                {{ status[renderObj.orderStatus] }}
              </span>
            </div>
          </div>
          <div style="color: #999">{{ renderObj.businessNo }}</div>
        </div>
      </div>
    </div>
    <div class="detail-info-wrap detail-info-wrap-detail">
      <div class="info-config">
        <a-row class="distance">
          <a-col span="8">
            <div class="demand-name">
              <p>接单人：</p>
              <p>{{ renderObj.userName }}</p>
            </div>
          </a-col>
          <a-col class="col-item" span="8">
            <span>
              接单时间：
              <i>{{ renderObj.createtime }}</i>
            </span>
          </a-col>
          <a-col class="col-item" span="8">
            <span>
              联系电话：
              <i>{{ renderObj.mobile }}</i>
            </span>
          </a-col>
        </a-row>
        <a-row class="big-distance">
          <a-col span="24">
            <div class="order-introduction">
              <p>接单说明：</p>
              <p v-if="isString" v-html="description"></p>
              <div v-if="!isString" class="demension-list">
                <div v-for="(item, index) in demensionList" :key="index" class="demension-item">
                  <div class="label">{{ item.label }}</div>
                  <div class="value" v-html="item.value"></div>
                </div>
              </div>
            </div>
          </a-col>
        </a-row>
        <div class="download-list">
          <File :file-list="orderList"></File>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getOrderDetail, getOrderFiles } from '@/api/index.js'
  const File = () => import('./File.vue')
  export default {
    components: {
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
        statusIcons: ['waitDecide', 'cancel', 'deal', 'inappropriate'],
        activeKey: ['1', '2', '3'], //折叠面板的key
        orderList: [],
        acceptId: 0, //接单id
        renderObj: {},
        userId: 0, //用户id
        userData: {}, //用户信息
        advantage: null,
        demensionList: [], //维度
        description: '', //接单说明
        companyName: '', //企业名称
        isString: false, //用于维度展示
        status: {
          1: '待定',
          2: '已撤销',
          3: '成交',
          4: '不合适',
        },
        colorStatus: {
          1: 'tag-yellow',
          2: 'tag-red',
          3: 'tag-green',
          4: 'tag-gray',
        },
      }
    },
    watch: {
      externalProp: {
        handler(val) {
          if (val) {
            this.acceptId = val.acceptId
            this.init()
          }
        },
        immediate: true,
      },
    },
    methods: {
      init() {
        this.getAcceptDetail()
        this.getAttachmentList()
      },
      //获取接单详情
      async getAcceptDetail() {
        getOrderDetail({ id: this.acceptId }).then(res => {
          this.renderObj = res.data
          if (res.data.advantage) {
            try {
              this.advantage = JSON.parse(res.data.advantage)
              if (typeof this.advantage == 'object' && this.advantage.constructor == Array) {
                this.demensionList = this.advantage.map(item => {
                  item.value = item.value.replace(/\n/g, '<br/>')
                  return item
                })
              } else {
                this.description = this.advantage.replace(/\n/g, '<br/>')
              }
              this.isString = false
            } catch (err) {
              this.description = res.data.advantage.replace(/\n/g, '<br/>')
              this.isString = true
            }
          }
          this.userId = res.data.userId
        })

        await this.getUserData()
      },
      //获取附件接口
      async getAttachmentList() {
        getOrderFiles({ id: this.acceptId }).then(res => {
          this.orderList = res.data
        })
      },
      changeActivekey(e) {
        this.activeKey = e
      },
    },
  }
</script>

<style lang="less" scoped>
  .order-accept-detail {
    .ant-collapse {
      margin-top: 4px;
    }

    .order-info-wrap {
      position: relative;

      .margin-bottom {
        margin-bottom: 13px;
      }

      .user-status {
        position: absolute;
        top: 28px;
        right: 33px;

        & > img {
          width: 85px;
          height: 59px;
        }
      }

      width: 100%;
      background: #f9f9f9;
      padding: 16px 24px 4px;

      .basic-info {
        display: flex;

        .image-wrap {
          margin-right: 16px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: @primary-color;

          > img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .info-wrap {
        width: 100%;

        .col-item {
          > span {
            > i {
              color: #444;
            }
          }

          .status {
            position: relative;
            margin-left: 10px;

            &::after {
              content: '';
              width: 6px;
              height: 6px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: -10px;
              transform: translateY(-50%);
              background: #ff4433;
            }
          }

          .success {
            &::after {
              background: #52c41a;
            }
          }
        }

        .user-name-wrap {
          margin-bottom: 8px;

          .user-name {
            display: inline-block;
            color: #666666;
            font-size: 16px;
          }
          .tag {
            display: inline-block;
            border-radius: 100px;
            opacity: 1;
            font-size: 12px;
            padding: 0 8px;
            margin-left: 12px;
          }
          .tag-green {
            border: 1px solid #52c41a;
            color: #52c41a;
          }
          .tag-yellow {
            border: 1px solid #ffbf00;
            color: #ffbf00;
          }
          .tag-gray {
            border: 1px solid #999999;
            color: #999999;
          }
          .tag-red {
            border: 1px solid #999999;
            color: #ff4433;
          }
        }

        .company-name {
          p:nth-child(1) {
            min-width: 42px;
          }
        }

        .company-name {
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
      }
    }
    .order-info-head {
      padding: 16px 24px;
    }

    .distance {
      margin-bottom: 12px;
    }

    .detail-info-wrap {
      padding: 16px 24px;

      /deep/ .ant-collapse-content.ant-collapse-content-active {
        padding-left: 64px;
      }

      /deep/ .ant-collapse-item.ant-collapse-item-active {
        border-bottom: none;
      }

      .info-config {
        font-size: 13px;
        .demand-name,
        .order-introduction {
          display: flex;
          // margin-left: -64px;
          // padding-right: 27px;

          p:nth-child(1) {
            color: #999;
            margin-bottom: 0;
            min-width: 70px;
          }

          p:nth-child(2) {
            word-break: break-all;
            color: #444;
            margin-bottom: 0;
          }
        }

        .order-introduction {
          .demension-list {
            width: calc(100% - 70px);
            .demension-item {
              display: flex;

              .value {
                flex: 1;
                color: #444;
              }
            }
          }
        }

        .col-item {
          span {
            color: #999;
            i {
              color: #444;
            }
          }
        }
      }

      .big-distance {
        margin-bottom: 16px;
      }

      .download-list {
        //margin-left: -64px;
      }
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
