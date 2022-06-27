<template>
  <div class="search-wrap-controller" @click="handleFold">
    <img :src="isExpanded ? filterBtn[0] : filterBtn[1]" alt="" />
    <span :class="!isExpanded ? 'active' : ''">{{ buttonText }}</span>
  </div>
</template>

<script>
  export default {
    name: 'FoldController',
    props: {
      resultNum: {
        type: Number,
        default: 0,
      },
      isExpanded: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        filterBtn: [
          require('@/assets/images/icon/filter.svg'),
          require('@/assets/images/icon/filter-color.svg'),
        ],
      }
    },
    computed: {
      buttonText() {
        let text = ''
        if (this.isExpanded) {
          text = '收起筛选'
        } else {
          if (this.resultNum) {
            text = `已选${this.resultNum}项`
          } else {
            text = '展开筛选'
          }
        }
        return text
      },
    },
    methods: {
      handleFold(e) {
        this.$emit('update:isExpanded', !this.isExpanded)
      },
    },
  }
</script>

<style lang="less" scoped>
  .search-wrap-controller {
    display: inline-block;
    background-color: #ffffff;
    cursor: pointer;

    > img {
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }

    > span {
      height: 20px;
      font-size: 14px;
      color: #999;
      line-height: 20px;

      &.active {
        color: #00c7db;
      }
    }
  }
</style>
