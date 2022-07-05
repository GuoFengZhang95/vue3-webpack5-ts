<template>
  <div id="login">
    <div class="header">
      <img class="logo" src="@/assets/images/pic/platform-logo.svg" alt="pic"
        @click="$router.push({ name: 'Login' })" />
    </div>
    <div class="divid-bar"></div>
    <div class="login-wrp">
      <div class="bg">
        <a-carousel v-if="bannerList && bannerList.length > 0" ref="carousel" effect="fade" :autoplay="true"
          :dots="false">
          <div v-for="item in bannerList" :key="item.img" class="swiper-item" @click="handleBannerClick(item)">
            <div class="img-wrp">
              <img :src="item.img" alt="logo" class="logo" />
            </div>
          </div>
        </a-carousel>
      </div>
      <div class="login-inner">
        <a-spin :spinning="spinning" class="spin"></a-spin>
        <iframe id="iframe-login" :src="src"></iframe>
      </div>
    </div>
    <div class="footer">
      <div class="coypright">
        <p>Copyright © 2014-{{ currentYear }} 17m17.com All Rights Reserved.</p>
        <p>木木西里旗下仪器买卖 版权所有苏ICP备14016771号-6</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { queryAdvertisement } from '@/api/index'
import { AdverItem } from '@/api/types/index'
export default defineComponent({
  name: 'Login',
  setup() {
    const $route = useRoute()
    const $router = useRouter()
    const globalProperties = getCurrentInstance()?.appContext.config.globalProperties
    let currentYear = new Date().getFullYear()

    let spinning = ref(false)
    let src = ref('')
    const initSrc = () => {
      const returnUrl = $route.query.returnUrl
      let url = returnUrl
        ? decodeURIComponent(returnUrl as string)
        : window.location.origin
      spinning.value = true
      src.value = `https://globaltpl${process.env.ENV}.mumuxili.com/login?registerPlatformId=8&returnUrl=${url}`
    }
    initSrc()

    let bannerList = reactive<AdverItem[]>([])
    const getBanner = async () => {
      const bannerRes = await queryAdvertisement({
        name: 'YQMM_MIDDLE_LOGIN_BG',
        count: 5,
      })
      if (bannerRes.success) {

        if (bannerRes?.data[0]?.imgs) {
          bannerList = bannerRes?.data[0]?.imgs
        }
      }


    }
    getBanner()

    const postMessage = async (event: { origin: string | string[]; data: { key: any; data?: any; msg?: any } }) => {
      if (
        event.origin.indexOf('globaltpl') !== -1 ||
        event.origin.indexOf('192.168') !== -1
      ) {
        //只处理globaltpl页面传出的message
        if (event.data.key) {
          const { key, msg } = event.data
          if (key == 'qqLogin' || key == 'wxLogin' || key == 'wbLogin') {
            //第三方授权登录
            window.location.href = event.data.data
          } else if (key === 'hasMounted') {
            //iframe加载完成
            setTimeout(() => {
              spinning.value = false
            }, 200)
          } else if (key === 'forgetPwd') {
            //忘记密码
            $router.push({
              name: 'Password',
            })
          } else if (key === 'loginSuccess') {
            //登录成功
            window.location.href = event.data.data
          } else if (key === 'errorResponse') {
            //接口报错
            globalProperties?.$message.error(`${msg}`)
          }
        }
      }
    }
    useEventListener(window, 'message', postMessage)

    const handleBannerClick = (item: AdverItem) => {
      if (item.type == 2) {
        window.location.href = item.url
      }
    }

    return {
      spinning,
      src,
      currentYear,
      bannerList,
      handleBannerClick,
      $router,
    }
  }
})
</script>

<style lang="less" scoped>
#login {
  .header {
    margin: 0 auto;
    width: 1280px;
    height: 100px;

    >img {
      float: left;
      margin-top: 26px;
      margin-left: 45px;
      cursor: pointer;
    }
  }

  .divid-bar {
    width: 100%;
    height: 6px;
    background: #19a3ee;
  }

  .login-wrp {
    position: relative;
    width: 100%;
    height: 600px;
    min-width: 1280px;
    // background: #e1ebf5;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;

      // background: url('../../assets/images/pic/login-bg.png') no-repeat center;
      :deep(.ant-carousel) {
        .img-wrp {
          display: flex;
          align-items: center;
          justify-content: space-around;
          overflow: hidden;

          >img {
            width: 1920px;
            height: auto;
          }
        }
      }
    }

    .login-inner {
      position: absolute;
      top: 73px;
      right: calc(50% - 540px);
      width: 370px;
      height: 415px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.18);
      overflow: hidden;

      #iframe-login {
        width: 100%;
        height: 100%;
      }
    }

    .tips {
      position: absolute;
      left: 420px;
      top: 48px;

      >p {
        width: 416px;
        text-align: center;
      }

      >p:nth-child(1) {
        height: 77px;
        font-size: 52px;
        font-weight: bold;
        color: #405668;
      }

      >p:nth-child(2) {
        width: 416px;
        height: 28px;
        font-size: 20px;
        text-align: center;
        color: #405668;
      }
    }
  }

  .footer {
    margin: 26px auto;
    width: 400px;
    height: 79px;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    color: #666666;
    line-height: 24px;
  }
}
</style>
