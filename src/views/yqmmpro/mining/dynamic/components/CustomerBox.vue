<template>
  <div class="customer-box-wrapper" @click="change">
    <div v-show="status === 0" class="box-item" :class="'status_' + status"></div>
    <img
      v-show="status === 1"
      src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/checkbox_1.svg"
      class="box-item"
      :class="'status_' + status"
    />
    <img
      v-show="status === 2"
      src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/checkbox_2.svg"
      class="box-item"
      :class="'status_' + status"
    />
    <div class="slot-wrp">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CustomerBox',
    props: {
      /** 0空 1选中 2不选 */
      status: {
        type: Number,
        default: 0,
      },
      range: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        step: 0,
      }
    },
    watch: {},
    methods: {
      change() {
        let index = this.range.findIndex(item => item === this.status)
        if (index === this.range.length - 1) {
          this.$emit('update:status', 0)
        } else {
          index++
          this.$emit('update:status', index)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .customer-box-wrapper {
    cursor: pointer;
    display: inline-flex;
    align-items: center;

    .box-item {
      width: 14px;
      height: 14px;
      display: block;

      &.status_0 {
        background: #ffffff;
        border: 1px solid #d9d9d9;
        box-sizing: border-box;
      }
    }

    .slot-wrp {
      margin-left: 4px;
      color: #666666;
      font-size: 12px;
    }
  }
</style>