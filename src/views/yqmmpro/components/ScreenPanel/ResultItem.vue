<template>
  <div v-show="label && value" class="result-item show-line_1">
    <a-tooltip placement="topLeft" :title="value" arrow-point-at-center>
      <div class="result-item_inner">
        <div class="label">{{ label }}：</div>
        <div class="value show-line_1">{{ value }}</div>
      </div>
    </a-tooltip>
    <i class="mmxlicon mi-close icon-del" @click="deleteItem"></i>
  </div>
</template>

<script>
  export default {
    name: 'ResultItem',
    props: {
      label: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: '',
      },
    },
    methods: {
      deleteItem() {
        this.$emit('delete')
      },
    },
  }
</script>

<style lang="less" scoped>
  .result-item {
    padding: 0 22px 0 6px;
    margin-right: 8px;
    height: 24px;
    line-height: 22px;
    position: relative;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid rgba(0, 199, 219, 0.3);
    font-size: 12px;

    .result-item_inner {
      color: #00c7db;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .label {
        max-width: 95px;
      }

      .value {
        flex: 1;
        max-width: 206px;
      }
    }

    .icon-del {
      position: absolute;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      color: #00c7db;
      font-size: 15px;
      cursor: pointer;
    }
  }
</style>
