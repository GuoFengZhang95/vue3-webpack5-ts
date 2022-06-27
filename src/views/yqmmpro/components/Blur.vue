<template>
  <div
    class="blur-container"
    :class="'blur-' + module"
    :style="{ 'background-image': `url(` + currentItem.bg + `)` }"
  >
    <div v-if="!showUnlock" class="content">
      <div class="pic">
        <img :src="qrcode" class="qrcode" alt="qrcode" />
      </div>
      <div class="mark">暂无查看额度，微信扫码获取额度！</div>
      <div class="text">获取额度后需刷新页面</div>
    </div>
    <div v-else-if="!unlockClose" class="unlock-wrap">
      <div class="unlock-header">
        <span class="title">提示</span>
        <i class="mmxlicon mi-close" @click="unlockClose = true"></i>
      </div>
      <div class="unlock-content">您还有<span class="primary">{{ remains }}次</span>解锁额度，是否消耗1次解锁额度？</div>
      <div class="unlock-footer">
        <mu-button @click="handleUnlockConfirm">确定</mu-button>
        <mu-button type="plain" @click="unlockClose = true">取消</mu-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      qrcode: {
        type: String,
        default: '',
      },
      module: {
        type: String,
        default: '',
      },
      showUnlock: {
        type: Boolean,
        default: false
      }, // 是否展示解锁提示
      remains: {
        type: [String, Number],
        default: ''
      }, // 剩余额度
    },
    data () {
      return {
        isLoading: false, // 正在操作
        resourceList: [
          {
            module: 'fund',
            bg: 'https://img.mumuxili.com/yqmm/pc/saas/images/blur/business.png'
          },
          {
            module: 'news',
            bg: 'https://img.mumuxili.com/yqmm/pc/saas/images/blur/business.png'
          },
          {
            module: 'purchase',
            bg: 'https://img.mumuxili.com/yqmm/pc/saas/images/blur/purchase.png'
          },
          {
            module: 'researcher',
            bg: 'https://img.mumuxili.com/yqmm/pc/saas/images/blur/purchase.png'
          },
          {
            module: 'bid',
            bg: 'https://img.mumuxili.com/yqmm/pc/saas/images/blur/bid.png'
          }
        ],
        unlockClose: false, // 是否关闭解锁提示
        currentItem: {
          module: '',
          bg: ''
        }
      }
    },
    watch: {
      module: {
        handler(val) {
          if (val) {
            this.currentItem = this.resourceList.find(r => r.module == val)
          }
        },
        immediate: true
      }
    },
    methods: {
      handleUnlockConfirm() {
        this.$emit('unlock')
      },
    }
  }
</script>

<style lang="less" scoped>
  .blur-container {
    position: relative;
    width: 100%;

    background-position: center;
    background-size: 100% 100%;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
    }
    .pic {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 179px;
      height: 179px;
      margin-bottom: 41px;
      background: #fff;
      border-radius: 50%;
      overflow: hidden;

      .qrcode {
        width: 160px;
        height: 160px;
      }
    }

    .mark {
      position: relative;
      width: fit-content;
      height: 22px;
      font-size: 20px;
      font-weight: bold;
      color: #00c7db;
      line-height: 22px;
      margin-bottom: 3px;

      &::before,
      &::after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        content: '';
        width: 47px;
        height: 1px;
        margin-top: 2px;
      }

      &::before {
        left: -62px;
        background-image: linear-gradient(
          270deg,
          rgba(0, 199, 219, 1),
          rgba(0, 199, 219, 0)
        );
      }

      &::after {
        right: -51px;
        background-image: linear-gradient(
          270deg,
          rgba(0, 199, 219, 0),
          rgba(0, 199, 219, 1)
        );
      }
    }

    .text {
      height: 22px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 198, 219, 0.5);
      line-height: 22px;
      letter-spacing: 12px;
      transform: scale(0.9167);
    }

    &.blur-researcher,
    &.blur-news {
      padding-top: 80px;
      height: 850px;
    }

    &.blur-purchase,
    &.blur-fund {
      height: 871px;
      padding-top: 120px;
    }

    &.blur-bid {
      height: 1161px;
      padding-top: 120px;
    }
    .unlock-wrap {
      margin: 0 auto;
      width: 380px;
      box-sizing: border-box;
      padding: 0 24px 24px;
      background: white;
      box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.1);
      border-radius: 4px 4px 4px 4px;
      > .unlock-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 0 8px 0;
        > .title {
          font-size: 16px;
          color: #444;
        }
        > .mmxlicon {
          font-size: 14px;
          cursor: pointer;
          user-select: none;
          &:hover {
            color: #00c7db;
          }
        }
      }
      > .unlock-content {
        font-size: 14px;
        color: #444;
        padding: 16px 0 24px 0;
        > .primary {
          color: #00c7db;
        }
      }
      > .unlock-footer {
        overflow: hidden;
        > .mu-button {
          float: right;
          margin-left: 12px;
        }
      }
    }
  }
</style>
