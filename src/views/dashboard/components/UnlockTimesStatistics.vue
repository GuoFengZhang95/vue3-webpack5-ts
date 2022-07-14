<template>
  <div class="unlock-times-statistics-wrp">
    <div class="title">解锁次数统计</div>
    <div class="times-list">
      <div v-for="(item, index) in unlockTimes" :key="index" class="times-item">
        <div class="times">{{ item.times }}</div>
        <div class="name">
          <span>{{ item.title }}</span>
          <a-popover v-if="item.popoverContent" placement="bottom">
            <template #content>{{ item.popoverContent }}</template>
            <img style="cursor: pointer" class="icon" src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/tips_2.svg"
              alt="提示" />
          </a-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getCompanyUnlockStat } from '@/api/index'
import { defineComponent, reactive, onMounted } from 'vue'
export default defineComponent({
  name: 'UnlockTimesStatistics',
  setup() {
    let unlockTimes = reactive([
      {
        times: 0,
        title: '科研客户',
        field: 'customerCount',
        popoverContent: '',
      },
      {
        times: 0,
        title: '基金课题',
        field: 'tprojectCount',
        popoverContent: '',
      },
      {
        times: 0,
        title: '重大商情',
        field: 'importantBusinessCount',
        popoverContent: '',
      },
      {
        times: 0,
        title: '采购意向',
        field: 'purchaseCount',
        popoverContent: '',
      },
      {
        times: 0,
        title: '采购单位',
        field: 'purchaseAnalysisCount',
        popoverContent: '同小程序采购方分析数据',
      },
      {
        times: 0,
        title: '招投标',
        field: 'biddingCount',
        popoverContent: '',
      },
      {
        times: 0,
        title: '需求接单',
        field: 'businessCount',
        popoverContent: '',
      },
    ])
    onMounted(async () => {
      const res = await getCompanyUnlockStat()
      if (res.code === '0') {
        Object.keys(res.data).forEach(field => {
          let index = unlockTimes.findIndex(item => item.field === field)
          if (index !== -1) {
            unlockTimes[index].times = res.data[field] ?? 0
          }
        })
      }
    })
    return {
      unlockTimes
    }
  }
})
</script>

<style lang="scss" scoped>
.unlock-times-statistics-wrp {
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  min-width: 731px;
  min-height: 156px;
  border-radius: 4px;
  background-color: #fff;

  .title {
    height: 22px;
    font-size: 18px;
    color: #333333;
    line-height: 22px;
  }

  .times-list {
    padding: 0 8px;
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(6, calc(100% / 6));
    column-gap: 0px;
    row-gap: 16px;

    .times-item {
      width: 202px;

      .times {
        width: 100%;
        height: 40px;
        font-size: 32px;
        font-weight: 500;
        color: #00c7db;
        line-height: 40px;
        word-break: break-all;
      }

      .name {
        height: 22px;
        font-size: 14px;
        color: #666666;
        line-height: 22px;
      }
    }
  }
}
</style>
