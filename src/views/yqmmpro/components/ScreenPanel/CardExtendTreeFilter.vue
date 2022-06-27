<template>
  <div class="card-extedn-tree-filter-wrapper" @click.stop="noop">
    <ExtendTree ref="ExtendTree" :column="column" @beforeFilter="beforeFilter"></ExtendTree>
    <div class="filter-btn">
      <a-button @click="reset">重置</a-button>
      <a-button type="primary" @click="confirm">确定</a-button>
    </div>
  </div>
</template>

<script>
  const ExtendTree = () => import('@/components/global/Table/components/ExtendTreeFilter.vue')
  export default {
    name: 'CardExtendTree',
    components: {
      ExtendTree,
    },
    props: {
      column: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        selectedKeys: [],
        selectedItems: [],
        isReset: false,
      }
    },
    mounted() {
      window.addEventListener('click', this.clickClose, false)
    },
    beforeDestroy() {
      window.removeEventListener('click', this.clickClose)
    },
    methods: {
      noop() {
        return false
      },
      clickClose(e) {
        this.$emit('close')
      },
      beforeFilter(data) {
        // console.log(data)
        this.selectedKeys = data.filterObj.value
        this.selectedItems = data.filterObj.selectedItems
      },
      confirm() {
        this.isReset = false
        this.emit()
        this.$emit('close')
      },
      reset() {
        this.$refs['ExtendTree'].reset()
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

<style lang="scss" scoped>
  .card-extedn-tree-filter-wrapper {
    padding: 15px;
    box-sizing: border-box;
    .filter-btn {
      display: flex;
      justify-content: flex-end;

      .ant-btn {
        margin-left: 12px;
      }
    }
  }
</style>
