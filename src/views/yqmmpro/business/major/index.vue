<template>
  <div v-if="power" class="purchase">
    <template v-if="power != 2">
      <MuTab :tab-list="tabList" :active-key="activeKey" @handleTabChange="handleTabChange"></MuTab>
      <major-table v-show="activeKey === 0" keys="mine"></major-table>
      <major-table
        v-if="tabList.length === 2"
        v-show="activeKey === 1 && power === 1"
        keys="all"
      ></major-table>
    </template>
    <template v-else>
      <auth-tips></auth-tips>
    </template>
  </div>
</template>

<script>
  import MajorTable from './components/MajorTable'
  import { yqmmBusinessMix } from '@/mixin/index'
  export default {
    name: 'Major',
    components: {
      MajorTable,
    },
    mixins: [yqmmBusinessMix({ moduleId: 4 })],
    data() {
      return {}
    },
  }
</script>

<style lang="less" scoped>
  .purchase {
    .mumu-tabs {
      height: 57px;
    }
  }
</style>
