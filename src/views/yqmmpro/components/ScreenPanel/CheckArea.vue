<template>
  <div class="check-area-list">
    <a-checkbox-group
      :value="selectedKeys"
      :options="options"
      @change="handleChange"
    ></a-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'CheckArea',
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      field: {
        type: String,
        default: '',
      },
      label: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        selectedKeys: [],
      }
    },
    computed: {
      options() {
        return this.list.map(item => {
          item['label'] = item.name
          item['value'] = item.id
          return item
        })
      },
      selectedItems() {
        const selectedItems = this.options.filter(item => {
          return this.selectedKeys.includes(item.id)
        })
        return selectedItems
      },
    },
    methods: {
      handleChange(e) {
        this.selectedKeys = e
        this.isReset = false
        this.emit()
      },
      reset() {
        this.selectedKeys = []
        this.isReset = true
        this.emit()
      },
      emit() {
        let params = {
          selectedKeys: this.selectedKeys,
          selectedItems: this.selectedItems,
          isReset: this.isReset,
        }
        this.$emit('change', params)
      },
    },
  }
</script>

<style lang="less" scoped>
  .check-area-list {
    /deep/ span {
      font-size: 12px;
    }
  }
</style>
