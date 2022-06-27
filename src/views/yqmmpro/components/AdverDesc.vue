<template>
  <div class="yqmmpro-adver-wrapper">
    <div class="adver-wrapper">
      <img :src="image" alt="" class="adver-img" />
      <div class="button-wrapper top">
        <a-button type="primary" @click="customerVisible = true">立即开通</a-button>
        <span class="desc">立即联系客服开通体验吧</span>
      </div>
      <div class="button-wrapper bottom">
        <a-button type="primary" @click="customerVisible = true">立即开通</a-button>
        <span class="desc">立即联系客服开通体验吧</span>
      </div>
    </div>
    <div v-show="customerVisible" class="pop-wrapper" @click.self="customerVisible = false">
      <div class="pop-content">
        <div class="qrcode-wrapper">
          <img class="qrcode" src="@/assets/images/pic/kefu.png" alt="" />
          <span>微信扫一扫联系客服</span>
        </div>
        <div class="phone-time-wrapper">
          <div class="item">
            <div class="left">
              <img src="@/assets/images/icon/phone_1.svg" class="icon-phone" alt="电话" />
            </div>
            <div class="right">
              <div class="dl">电话客服：</div>
              <div class="dt">17761710480</div>
            </div>
          </div>
          <div class="item">
            <div class="left">
              <img src="@/assets/images/icon/time_1.svg" class="icon-time" alt="时间" />
            </div>
            <div class="right">
              <div class="dl">工作时间：</div>
              <div class="dt">周一至周五 8:30-18:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * yqmmpro模块无 权限介绍图
   */
  export default {
    name: 'YqmmproAdverDesc',
    props: {
      image: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        customerVisible: false,
      }
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-adver-wrapper {
    background-color: white;

    .adver-wrapper {
      position: relative;
      margin: 0 auto;
      width: 1088px;
      // height: 2319px;

      .adver-img {
        display: block;
        width: 1088px;
      }

      .button-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        &.top {
          top: 49px;
          right: 49px;
        }

        &.bottom {
          align-items: center;
          bottom: 140px;
          right: 466px;
        }

        .ant-btn {
          width: 88px;
        }

        .desc {
          margin-top: 4px;
          font-size: 12px;
          color: #999999;
        }
      }
    }

    .pop-wrapper {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;

      .pop-content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 367px;
        padding: 29px 24px 29px 24px;
        background: #ffffff;
        border-radius: 4px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        .qrcode-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;

          .qrcode {
            width: 111px;
            height: 111px;
          }

          > span {
            margin-top: 8px;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            color: #00c7db;
          }
        }

        .phone-time-wrapper {
          padding-top: 5px;
          .item {
            position: relative;
            padding-bottom: 16px;
            display: flex;
            align-items: flex-start;

            &:not(:first-child) {
              margin-top: 16px;
            }

            &:not(:last-child)::after {
              content: '';
              position: absolute;
              bottom: 0;
              right: 0;
              width: 100%;
              border: 1px dashed #d2d2d2;
              transform: scaleY(0.5);
            }

            .left {
              width: 22px;
              height: 22px;
              background: rgba(0, 199, 219, 0.15);
              border: 1px solid #00c7db;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .right {
              margin-left: 6px;

              .dl {
                height: 19px;
                line-height: 19px;
                font-size: 16px;
                color: #444444;
              }

              .dt {
                margin-top: 8px;
                height: 18px;
                line-height: 18px;
                font-size: 14px;
                color: #666666;
              }
            }
          }

          .icon-phone,
          .icon-check {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
</style>
