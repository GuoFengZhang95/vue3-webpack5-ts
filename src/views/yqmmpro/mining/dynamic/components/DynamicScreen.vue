<template>
  <a-modal :visible="visible" width="520px" @cancel="cancel" @ok="confirm">
    <template slot="title">设置筛选</template>
    <div class="screen-wrapper">
      <div class="screen-title">只看</div>
      <div class="screen-list">
        <CustomerBox
          v-for="item in onlyView"
          :key="item.id"
          :status.sync="item.status"
          :range="[0, 1, 2]"
        >
          {{ item.name }}
        </CustomerBox>
      </div>
    </div>
    <div class="screen-wrapper">
      <div class="screen-title">重要程度</div>
      <div class="screen-list">
        <CustomerBox
          v-for="item in importantView"
          :key="item.id"
          :status.sync="item.status"
          :range="[0, 1]"
        >
          {{ item.name }}
        </CustomerBox>
      </div>
    </div>
    <div class="tips-list">
      <div class="tips-item">
        <img src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/tips_3.svg" class="dl" />
        <div class="dt">提示：</div>
      </div>
      <div class="tips-item">
        <img src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/checkbox_2.svg" class="dl" />
        <div class="dt">不看</div>
      </div>
      <div class="tips-item">
        <img src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/checkbox_1.svg" class="dl" />
        <div class="dt">只看</div>
      </div>
    </div>
  </a-modal>
</template>
<script>
  import CustomerBox from './CustomerBox.vue'
  export default {
    name: 'DynamicScreen',
    components: {
      CustomerBox,
    },
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      defaultImportantView: {
        type: Array,
        default: () => [],
      },
      onlyView: {
        type: Array,
        default: () => [],
      },
      importantView: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },

    mounted() {},
    methods: {
      confirm() {
        this.cancel()
        this.$emit('confirm')
      },
      cancel() {
        this.$emit('update:visible', false)
      },
    },
  }
</script>

<style lang="less" scoped>
  .screen-wrapper {
    margin-bottom: 24px;

    .screen-title {
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      color: #444444;
    }

    .screen-list {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(4, 25%);
      row-gap: 12px;

      &.only {
        /deep/.ant-checkbox-group-item:last-child {
          width: 150px;
        }
      }
    }
  }

  .tips-list {
    position: absolute;
    left: 24px;
    bottom: 23px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .tips-item {
      margin-right: 6px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .dl {
        width: 14px;
        height: 14px;
      }

      .dt {
        margin-left: 5px;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        color: #666666;
      }
    }
  }
</style>
