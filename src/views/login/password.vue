<template>
  <div id="login">
    <div class="header">
      <img src="@/assets/images/pic/platform-logo.svg" alt="pic" @click="$router.push({ name: 'Login' })" />
    </div>
    <div class="divid-bar"></div>
    <div class="login-wrp">
      <div class="bg"></div>
      <div class="content">
        <div class="login-inner">
          <a-spin :spinning="spinning" class="spin"></a-spin>
          <iframe id="iframe-login" :src="src"></iframe>
        </div>
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
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventListener } from '@vueuse/core'
export default defineComponent({
  name: 'Password',
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
      src.value = `https://globaltpl${process.env.ENV}.mumuxili.com/password?registerPlatformId=8&returnUrl=${url}`
    }
    initSrc()

    const postMessage = async (event: { origin: string | string[]; data: { key: any; msg?: any; code?: any } }) => {
      if (
        event.origin.indexOf('globaltpl') !== -1 ||
        event.origin.indexOf('192.168') !== -1
      ) {
        if (event.data.key) {
          const { key, msg, code } = event.data
          if (key == 'passwordStep1') {
            //第一步
            if (code == 1) {
              globalProperties?.$message.error(`${msg}`)
            }
          } else if (key == 'backLogin') {
            //重置成功，返回登录页
            $router.push({
              name: 'Login',
            })
          } else if (key == 'hasMounted') {
            setTimeout(() => {
              spinning.value = false
            }, 200)
          } else if (key === 'errorResponse') {
            //接口报错
            globalProperties?.$message.error(`${msg}`)
          }
        }
      }
    }
    useEventListener(window, 'message', postMessage)

    return {
      spinning,
      src,
      currentYear,
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

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: url('../../assets/images/pic/login-bg-notext.png') no-repeat center;
    }

    .content {
      position: relative;
      z-index: 2;
      width: 1280px;
      height: 100%;
      margin: auto;
      display: flex;
      align-items: flex-start;
      justify-content: center;

      .login-inner {
        margin-top: 36px;
        // position: absolute;
        // z-index: 10;
        // top: 36px;
        // left: 50%;
        width: 866px;
        height: 510px;
        // transform: translate(-50%, 0);
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.18);
        overflow: hidden;

        #iframe-login {
          width: 100%;
          height: 100%;
        }
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
