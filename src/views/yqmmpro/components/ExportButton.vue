<template>
  <div class="export-button-wrapper">
    <a-button v-if="type === 1" :loading="loading" type="primary">
      <!-- <i class="mmxlicon mi-export"></i> -->
      <span>批量导出</span>
    </a-button>
    <a-button
      v-if="type === 2"
      type="default"
      @click="$router.push({ name: 'YqmmproExportRecord' })"
    >
      <span>导出记录</span>
    </a-button>
  </div>
</template>

<script>
  export default {
    name: 'ExportButton',
    props: {
      /**1执行导出 2导出记录 */
      type: {
        type: Number,
        default: 1,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style lang="less" scoped>
  .export-button-wrapper {
    .mi-export {
      margin-right: 6px;
    }
  }
</style>
