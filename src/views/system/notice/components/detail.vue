<template>
  <div class="notice-detail-container">
    <MuPageHeader title="消息详情"></MuPageHeader>
    <div class="notice-detail" v-if="noticeDetail">
      <div class="notice-header">
        <div class="notice-title-container">
          <div class="notice-title show-line_1">{{ noticeDetail.title }}</div>
          <div class="notice-type">
            {{ noticeDetail.type == 1 ? '普通通知' : noticeDetail.type == 2 ? '资料下载' : '未知' }}
          </div>
        </div>
        <div class="publisher">
          <span>{{ noticeDetail.senderName }}</span>
          <span class="divider"></span>
          <span>{{ noticeDetail.sendTime }}</span>
        </div>
      </div>
      <div class="notice-content" v-html="noticeDetail.content"></div>
      <div v-if="noticeDetail.ossUploadResultList" class="download-list">
        <div v-for="(item, index) in noticeDetail.ossUploadResultList" :key="index" class="download-item"
          @click="downLoad(item.url)">
          <img v-if="item.type === 'zip' || item.type === 'rar' || item.type === '7z'" class="icon"
            src="@/assets/images/icon/zip-colorful.png" alt="" />
          <div class="content">
            <div class="title show-line_1">{{ item.name }}</div>
            <div class="info">
              <span>{{ item.size }}</span>
              <a-divider type="vertical"></a-divider>
              <span>{{ item.uploadTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getNoticeDetail, getAliyunOSSUrl } from '@/api/index'
import type { NoticeDetail } from '@/api/types'
export default defineComponent({
  name: 'NoticeDetail',
  async setup() {
    let noticeDetail = ref<NoticeDetail | null>(null)

    noticeDetail.value = (await getNoticeDetail({ noticeId: 12313 })).data

    /** 下载附件 */
    function downLoad(url: string) {
      getAliyunOSSUrl({ fileUrl: url }).then(res => {
        window.open(res.data)
      })
    }

    return {
      noticeDetail,
      downLoad
    }
  }
})
</script>

<style lang="less" scoped>
.notice-detail-container {
  position: relative;
  height: calc(100% - 64px);
  top: 0 !important;

  .notice-detail {
    height: 100%;
    overflow-y: auto;

    .notice-header {
      width: 100%;
      background: #f9f9f9;
      padding: 13px 24px 16px;

      .notice-title-container {
        display: flex;
        align-content: center;

        .notice-title {
          font-size: 16px;
          font-weight: bold;
          color: #444444;
          margin-right: 16px;
        }

        .notice-type {
          width: 68px;
          height: 20px;
          border: 1px solid #d9d9d9;
          border-radius: 10px;
          font-size: 12px;
          text-align: center;
          color: #666666;
          line-height: 18px;
        }
      }

      .publisher {
        font-size: 13px;
        margin-top: 8px;
        color: #999999;

        .divider {
          margin: 0 17px;
          display: inline-block;
          width: 2px;
          height: 12px;
          background: #d9d9d9;
          vertical-align: middle;
        }
      }
    }

    .notice-content {
      margin: 16px 16px 16px 24px;
      font-size: 13px;
      color: #666666;
      line-height: 24px;
    }

    .download-list {
      padding: 0 24px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;

      .download-item {
        margin-bottom: 13px;
        padding-left: 36px;
        position: relative;
        width: 370px;
        height: 51px;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          border: 1px solid #00c7db;
          box-shadow: 0px 0px 4px 0px rgba(0, 199, 219, 0.38);
        }

        .icon {
          position: absolute;
          left: 12px;
          top: 6px;
          width: 14px;
          height: 14px;
        }

        .content {
          .title {
            width: 239px;
            height: 18px;
            font-size: 13px;
            font-weight: 500;
            text-align: left;
            color: #666666;
            line-height: 24px;
          }

          .info {
            height: 17px;
            font-size: 12px;
            color: #cccccc;
            line-height: 24px;
          }
        }
      }
    }
  }
}
</style>
