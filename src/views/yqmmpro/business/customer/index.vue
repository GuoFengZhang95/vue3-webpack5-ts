<template>
  <div v-if="power" class="customer">
    <template v-if="power != 2">
      <MuTab :tab-list="tabList" :active-key="activeKey" @handleTabChange="handleTabChange"></MuTab>
      <customer-table v-show="activeKey === 0" keys="mine"></customer-table>
      <customer-table
        v-if="tabList.length === 2"
        v-show="activeKey === 1 && power === 1"
        keys="all"
      ></customer-table>
    </template>
    <template v-else>
      <auth-tips></auth-tips>
    </template>
  </div>
</template>

<script>
  import { yqmmBusinessMix } from '@/mixin/index'
  import CustomerTable from './components/CustomerTable'
  import { getAptsData, getTitleData, getSchoolData, getCountryList } from '@/api/index'
  export default {
    name: 'Customer',
    components: {
      CustomerTable,
    },
    mixins: [yqmmBusinessMix({ moduleId: 1 })],
    data() {
      return {}
    },
    mounted() {
      //获取表头数据
      getCountryList({}).then(res => {
        localStorage.setItem('tableCity', JSON.stringify(res.data))
      })
      getAptsData({ superId: -1 }).then(res => {
        localStorage.setItem('aptsData', JSON.stringify(res.data))
      })
      getTitleData({ superId: -1 }).then(res => {
        localStorage.setItem('titleData', JSON.stringify(res.data))
      })
      getSchoolData({ page: 1, pageSize: 999999 }).then(res => {
        localStorage.setItem(
          'schoolData',
          JSON.stringify(
            res.data &&
              res.data.map(item => {
                return {
                  value: item.id,
                  label: item.name,
                }
              })
          )
        )
      })
    },
    methods: {},
  }
</script>

<style lang="less" scoped>
  .customer {
    .mumu-tabs {
      height: 57px;
    }
  }
</style>
