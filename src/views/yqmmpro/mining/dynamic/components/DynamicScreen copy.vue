<template>
  <a-modal :visible="visible" width="520px" @cancel="cancel" @ok="confirm">
    <template slot="title">设置筛选</template>
    <div class="screen-wrapper">
      <div class="screen-title">只看</div>
      <a-checkbox-group
        class="screen-list only"
        :default-value="defaultOnlyView"
        :options="renderOnlyView"
        @change="e => (selectedKeysOnly = e)"
      ></a-checkbox-group>
    </div>
    <div class="screen-wrapper">
      <div class="screen-title">重要程度</div>
      <a-checkbox-group
        class="screen-list"
        :default-value="defaultImportantView"
        :options="renderImportantView"
        @change="e => (selectedKeysImportant = e)"
      ></a-checkbox-group>
    </div>
  </a-modal>
</template>

<script>
  export default {
    name: 'DynamicScreen',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      defaultOnlyView: {
        type: Array,
        default: () => [],
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
      return {
        selectedKeysOnly: [],
        selectedKeysImportant: [],
      }
    },
    computed: {
      renderOnlyView() {
        return this.onlyView.map(item => {
          return {
            label: item.name,
            value: String(item.name),
          }
        })
      },
      renderImportantView() {
        return this.importantView.map(item => {
          return {
            label: item.name,
            value: String(item.name),
          }
        })
      },
    },
    watch: {
      defaultOnlyView: {
        handler(val) {
          if (val.length) {
            this.selectedKeysOnly = val
          }
        },
      },
      defaultImportantView: {
        handler(val) {
          if (val.length) {
            this.selectedKeysImportant = val
          }
        },
      },
    },
    mounted() {},
    methods: {
      confirm() {
        this.$emit('confirm', {
          selectedKeysOnly: this.selectedKeysOnly,
          selectedKeysImportant: this.selectedKeysImportant,
        })
        this.cancel()
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
</style>
