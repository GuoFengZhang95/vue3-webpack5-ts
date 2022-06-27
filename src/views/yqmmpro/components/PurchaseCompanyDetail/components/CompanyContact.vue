<template>
  <div class="company-contact-wrap">
    <template v-if="isUnlock">
      <div class="contact-wrap">
        <div class="contact-title container-title">
          <span class="text">联系方式</span>
          <span class="num">(5人)</span>
        </div>
        <div class="contact-content">
          <div class="content-tabs" @click="handleContactTabChange">
            <span data-key="1" class="tab" :class="{'selected': contactTabKey == 1}">全部</span>
            <span data-key="2" class="tab" :class="{'selected': contactTabKey == 2}">手机(16)</span>
            <span data-key="3" class="tab" :class="{'selected': contactTabKey == 3}">固话(54)</span>
          </div>
          <div class="content-wrap">
            <div class="content-list">
              <div
                v-for="(item, index) in contactList"
                :key="index"
                class="contact-item"
                :class="{'selected': selectedContact == item.id}"
                @click="handleContactClick(item)"
              >
                <div class="con-i-left">
                  <img class="pic" src="" alt="" />
                </div>
                <div class="con-i-right">
                  <div class="name">及阿里嘎</div>
                  <div class="mobile">
                    <span class="label">手机：</span>
                    <span class="value">13545454545</span>
                    <!-- <span class="empty">-</span> -->
                  </div>
                  <div class="tel">
                    <span class="label">座机：</span>
                    <!-- <span class="value">4000651651651</span> -->
                    <span class="empty">-</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-pagination">
              <span class="btn" @click="handleContactPagination('first')">首页</span>
              <span class="btn" :class="{'disabled': contactPagination.pageNum == 1}" @click="handleContactPagination('last')">上一页</span>
              <span class="btn" :class="{'disabled': contactPagination.pageNum == contactPagination.totalPage}" @click="handleContactPagination('next')">下一页</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bid-wrap">
        <div class="contact-title container-title">
          <span class="text">负责的标讯</span>
        </div>
        <div class="bid-list">
          <div class="list-wrap">
            <BidCard v-for="item in bidList" :key="item.tokenEncodeId" :info="item"></BidCard>
          </div>
          <MuPagination
            :page="bidPagination.pageNum"
            :page-size="bidPagination.pageSize"
            :total="bidPagination.total"
            @pageChange="handlePageNumChange"
            @pageSizeChange="handlePageSizeChange"
          ></MuPagination>
        </div>
      </div>
    </template>
    <template v-else>
      <Blur module="fund" :qrcode="'data:image/png;base64,' + qrCode"></Blur>
    </template>
  </div>
</template>

<script>
import { getBidList } from '@/api/index.js'
const BidCard = () => import('@/views/yqmmpro/components/BidCard.vue')
const Blur = () => import('@/views/yqmmpro/components/Blur.vue')
export default {
  name: 'CompanyContact',
  components: {
    BidCard,
    Blur
  },
  props: {
    targetId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      isUnlock: true, // 是否已解锁
      qrCode: '',
      contactList: [
        { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }
      ], // 联系人列表
      contactTabKey: 1, // 联系人tab选中项
      selectedContact: 1, // 选中的联系人
      contactPagination: {
        pageNum: 1,
        pageSize: 20,
        totalPage: 5
      },
      bidList: [], // 负责的标讯
      bidPagination: {
        pageNum: 1,
        pageSize: 20,
        total: 120,
      }
    }
  },
  mounted() {
    this.getBidListIncharge()
  },
  methods: {
    async getBidListIncharge() {
      const res = await getBidList({
        pageNum: 1,
        pageSize: 20
      })
      if (res.code == '0') {
        this.bidList = res.data.list || []
      }
    },
    // 联系方式-tab切换
    handleContactTabChange(e) {
      if (e.target.tagName === 'SPAN') {
        const key = e.target.dataset.key

        if (this.contactTabKey == key) {
          return
        }

        this.contactTabKey = e.target.dataset.key
        // 初始化数据
        this.contactPagination.pageNum = 1
      }
    },
    // 联系人点击
    handleContactClick(e) {
      const { id } = e
      if (this.selectedContact != id) {
        this.selectedContact = id
        // 初始化数据
        this.bidPagination.pageNum = 1
        this.bidPagination.pageSize = 20
      }
    },
    // 联系人页码更改
    handleContactPagination(type) {
      switch (type) {
        case 'first': // 首页
          if (this.contactPagination.pageNum == 1) {
            return
          } else {
            this.contactPagination.pageNum = 1
          }
          break
        case 'next': // 下一页
          if (this.contactPagination.pageNum == this.contactPagination.totalPage) {
            return
          } else {
            this.contactPagination.pageNum++
          }
          break
        case 'last': // 上一页
          if (this.contactPagination.pageNum == 1) {
            return
          } else {
            this.contactPagination.pageNum--
          }
          break
      }
    },
    handlePageNumChange() {

    },
    handlePageSizeChange() {

    },
  }
}
</script>

<style lang="less" scoped>
.company-contact-wrap {
  display: flex;
  > .contact-wrap {
    width: 267px;
    box-sizing: border-box;
    background: white;
    > .contact-title {

    }
    > .contact-content {

      > .content-tabs {
        display: flex;
        margin-bottom: 16px;
        > .tab {
          padding: 0 12px;
          height: 24px;
          line-height: 24px;
          border-radius: 12px;
          font-size: 14px;
          color: #666;
          background: #F4F4F4;
          margin-right: 8px;
          cursor: pointer;
          user-select: none;
          &.selected {
            color: white;
            background: #00C7DB;
          }
        }
      }
      > .content-wrap {
        > .content-list {
          padding: 0 16px 0 0;
          box-sizing: border-box;
          max-height: 500px;
          overflow: hidden;
          overflow-y: auto;
          > .contact-item {
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            margin-bottom: 12px;
            box-sizing: border-box;
            padding: 16px;
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            &.selected {
              border: 2px solid #00c7db;
              &::before {
                content: '';
                position: absolute;
                border-style: solid;
                border-color: transparent transparent transparent #00C7DB;
                border-width: 14px 0 14px 12px;
                top: 43px;
                right: -14px;
              }
              &::after {
                content: '';
                position: absolute;
                border-style: solid;
                border-color: transparent transparent transparent white;
                border-width: 14px 0 14px 12px;
                top: 43px;
                right: -11px;
              }
            }
            > .con-i-left {
              width: 43px;
              height: 43px;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 16px;
              > .pic {
                width: 100%;
                height: auto;
              }
            }
            > .con-i-right {
              > .name {
                font-size: 16px;
                color: #333;
                margin-bottom: 12px;
              }
              > .mobile {
                font-size: 13px;
                color: #999;
                margin-bottom: 12px;
                > .value {
                  color: #00C7DB;
                }
              }
              > .tel {
                font-size: 13px;
                color: #999;
                > .value {
                  color: #00C7DB;
                }
              }
            }
          }
        }
        > .content-pagination {
          padding: 15px;
          background: white;
          font-size: 14px;
          color: #00C7DB;
          display: flex;
          justify-content: space-evenly;
          > .btn {
            cursor: pointer;
            user-select: none;
            &.disabled {
              color: #ccc;
            }
          }
        }
      }
    }
  }
  > .bid-wrap {
    width: calc(100% - 267px);
    > .bid-list {
      padding: 12px;
      box-sizing: border-box;
      background: #F4F4F4;
      /deep/ .pagition-act {
        justify-content: space-around;
        background: white;
      }
      > .list-wrap {
        max-height: 530px;
        overflow: hidden;
        overflow-y: auto;
        /deep/ .bid-panel-wrapper {
          margin-bottom: 12px;
        }
      }
    }
  }
  .container-title {
    position: relative;
    background: white;
    padding: 0 16px 16px;
    font-size: 16px;
    color: #444;
    &::before {
      content: '';
      position: absolute;
      width: 4px;
      height: 20px;
      background: #00c7db;
      top: 1px;
      left: 0;
    }
    .num {
      color: #00c7db;
    }
  }
}
</style>
