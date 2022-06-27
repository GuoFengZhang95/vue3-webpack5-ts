<template>
  <a-spin
    v-if="visible"
    :spinning="loadingSatus === 1"
    :tip="loadingTips"
    :delay="30"
  >
    <div class="default-area-wrp">
      <div v-if="loadingSatus !== 1" class="default-area_inner">
        <img class="default-img" :src="renderImg" alt="default" />
        <div class="desc-wrp">
          <span v-if="!$scopedSlots.desc" class="desc">{{ renderText }}</span>
          <slot v-else name="desc"></slot>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script>
  const resultMap = new Map([
    [
      0,
      {
        text: '暂无内容',
        img: 'https://img.mumuxili.com/yqmm/pc/saas/images/result_empty.svg',
      },
    ],
    [
      1,
      {
        text: '该内容已被删除或下架',
        img: 'https://img.mumuxili.com/yqmm/pc/saas/images/result_delete.svg',
      },
    ],
    [
      2,
      {
        text: '已加入企业但但钱账号无企业权益',
        img: 'https://img.mumuxili.com/yqmm/pc/saas/images/result_company_02.svg',
      },
    ],
    [
      3,
      {
        text: '未加入企业或企业未开通企业套餐',
        img: 'https://img.mumuxili.com/yqmm/pc/saas/images/result_company_01.svg',
      },
    ],
  ])
  export default {
    name: 'LoadStep',
    props: {
      /**loading提示语 */
      loadingTips: {
        type: String,
        default: 'Loading...',
      },
      /**请求状态 0请求失败 1请求中 2请求完成 */
      loadingSatus: {
        type: Number,
        default: -1,
      },
      /**结果的状态 */
      resultStatus: {
        type: Number,
        default: -1,
      },
      /**自定义结束状态展示的文字 */
      customText: {
        type: String,
        default: '',
      },
      /**自定义结束状态展示的图片 */
      customImg: {
        type: String,
        default: () => '',
      },
    },
    data() {
      return {}
    },
    computed: {
      renderText() {
        if (this.customText) return this.customText
        return resultMap.get(this.resultStatus).text
      },
      renderImg() {
        if (this.customImg) return this.customImg
        return resultMap.get(this.resultStatus).img
      },
      visible() {
        if (this.loadingSatus === 0 || this.loadingSatus == 1) {
          return true
        }
        if (this.resultStatus !== -1) {
          return true
        }
        return false
      },
    },
  }
</script>

<style lang="less" scoped>
  .default-area-wrp {
    width: 100%;
    min-width: 310px;
    height: 310px;
    display: flex;
    align-items: center;
    justify-content: center;

    .default-area_inner {
      position: relative;
      width: 100%;

      .default-img {
        display: block;
        margin: 0 auto;
        width: 310px;
        height: 310px;
      }

      .desc-wrp {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 11px;
        width: 100%;
        text-align: center;

        // .desc {
        // }

        // .desc-slot {
        // }
      }
    }
  }
</style>
