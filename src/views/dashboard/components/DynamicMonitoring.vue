<template>
  <div class="dynamic-monitoring-wrp">
    <div class="title">
      <div class="name">动态监控</div>
      <div class="more" @click="$router.push('/yqmmpro/mining/dynamic')">查看更多></div>
    </div>
    <div class="scroll-wrp">
      <template v-if="loadingStatus === 3">
        <DynamicCard :dynamic-list="dynamicList"></DynamicCard>
      </template>
      <!-- 缺省图 -->
      <DefaultArea
        :loading-status="loadingStatus"
        :default-img="require('@/assets/images/common/list-default.svg')"
      >
        <template #desc>
          <div class="defaultarea-slot-desc">
            更多动态请到
            <a-dropdown
              placement="topCenter"
              :trigger="['click']"
              overlay-class-name="dashboard-dropdown-menu"
            >
              <span class="mini-btn">小程序</span>
              <a-menu slot="overlay">
                <a-menu-item>
                  <img src="@/assets/images/common/dynamic-qrcode.png" alt="" />
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            关注更多企业或科研客户~
          </div>
        </template>
      </DefaultArea>
    </div>
  </div>
</template>

<script>
  import { getBusinessRemind, getUserConfigInfo } from '@/api/index.js'
  import { loadingMix } from '@/mixin'
  import DynamicCard from '@/views/yqmmpro/mining/dynamic/components/DynamicCard.vue'
  export default {
    name: 'DynamicMonitoring',
    components: {
      DynamicCard,
    },
    mixins: [loadingMix({ customListName: 'dynamicList' })],
    data() {
      return {
        dynamicList: [],
        requestParams: {
          pageNum: 1,
          pageSize: 3,
          onlyView: '',
          importance: '',
        },
      }
    },
    async mounted() {
      // 获取用户存储的筛选项
      const res = await getUserConfigInfo()
      if (res.code === '0') {
        this.requestParams.onlyView = res.data.businessOnlyView ?? ''
        this.requestParams.importance = res.data.businessImportance ?? ''
      }
      this.getDynamicList()
    },
    methods: {
      async getDynamicList() {
        this.toggleMixinLoading(true)
        let res = await getBusinessRemind(this.requestParams)
        if (res.code === '0') {
          this.dynamicList =
            res.data && res.data.list && res.data.list.length
              ? res.data.list.map(item => {
                  item.tag = item.tag == '项目到期' ? '项目即将结束' : item.tag
                  item.relationCompanyStr =
                    item.formatRelationCompany && Object.keys(item.formatRelationCompany).join('、')
                  item.relationContactStr =
                    item.formatRelationCustomer && Object.keys(item.formatRelationCustomer).join('、')
                  if (item.startTime) {
                    item.time = `${item.startTime.slice(0, 7).replaceAll('-', '.')}${
                      item.endTime ? '-' + item.endTime.slice(0, 7).replaceAll('-', '.') : '-至今'
                    }`
                  }
                  if (item.formatDateTime.length > 5) {
                    const arr = item.formatDateTime.split('-')
                    item.formatDateTime = arr[0]
                    item.date = `${arr[1]}-${arr[2]}`
                  }
                  if (item.formatDateTime.includes(':')) {
                    item.dateType = 'day'
                  } else if (item.formatDateTime.includes('-')) {
                    item.dateType = 'month'
                  }
                  return item
                })
              : []
        }
        this.toggleMixinLoading(false)
      },
    },
  }
</script>

<style lang="less" scoped>
  .dynamic-monitoring-wrp {
    width: 100%;
    min-height: 570px;
    height: 100%;
    padding: 24px 16px 0;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    .title {
      padding-bottom: 24px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .name {
        height: 22px;
        font-size: 18px;
        color: #333333;
        line-height: 22px;
      }
      .more {
        height: 18px;
        font-size: 14px;
        color: #00c7db;
        line-height: 16px;
        cursor: pointer;
      }
    }

    .scroll-wrp {
      flex: 1;
      overflow: hidden;
      overflow-y: scroll;
    }

    .dynamic-list-wrp {
      padding: 0 8px;

      /deep/.top-wrp {
        padding-top: 0px;
      }
    }
    /deep/.default-area-wrp {
      margin-top: 30px;
    }
    .defaultarea-slot-desc {
      .mini-btn {
        color: #00c7db;
        cursor: pointer;
      }
    }
  }
</style>

<style lang="less">
  .dashboard-dropdown-menu {
    .ant-dropdown-menu {
      padding: 0;
      .ant-dropdown-menu-item {
        padding: 15px;
        img {
          width: 150px;
          height: 150px;
        }
      }
    }
  }
</style>
