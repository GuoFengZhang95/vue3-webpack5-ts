<template>
  <div ref="DetailShareButton" class="detail-share-button-wrapper">
    <a-dropdown :get-popup-container="() => $refs.DetailShareButton" :trigger="['click']">
      <a-button type="primary">分享</a-button>
      <a-menu slot="overlay" class="mini-pro-menu">
        <a-menu-item>
          <div class="link-item" @click="copyShareLink(1)">
            <img
              src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/link_1.svg"
              alt="网页链接"
            />
            <span>网页链接</span>
          </div>
        </a-menu-item>
        <a-menu-item>
          <div class="link-item" @click="copyShareLink(2)">
            <img
              src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/link_2.svg"
              alt="网页链接"
            />
            <span>小程序链接</span>
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  import { getWxShareLink } from '@/api/index.js'
  export default {
    name: 'DetailShareButton',
    props: {
      /** 1科研客户 2基金课题 3资讯 4采购意向 5标讯 6企业 7 学校 */
      module: {
        type: Number,
        default: 1,
      },
      id: {
        type: [Number, String],
        default: 0,
      },
      name: {
        type: String,
        default: '',
      },
      query: {
        type: String,
        default: '',
      },
      browserUrl: {
        type: String,
        default: '',
      },
      wxUrl: {
        type: String,
        default: '',
      },
    },
    data() {
      return {}
    },
    methods: {
      async copyShareLink(type) {
        let text = ''
        let message = ''
        if (type === 1) {
          text = `${window.location.origin}/${this.browserUrl}/${this.id}#${this.name}`
          message = '已复制网页链接'
        } else {
          const res = await getWxShareLink({ path: this.wxUrl, query: this.query })
          if (res.code === '0') {
            text = res.data
            message = '已复制小程序链接'
          }
        }
        if (text) {
          if (window.navigator.clipboard) {
            navigator.clipboard.writeText(text)
          } else if (window.clipboardData) {
            window.clipboardData.setData('Text', text)
          }
          this.$message.success(message)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .detail-share-button-wrapper {
    .link-item {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      > img {
        margin-right: 9px;
        width: 12px;
        height: 12px;
      }

      > span {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: #666666;
      }
    }
  }
</style>