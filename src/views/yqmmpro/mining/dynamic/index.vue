<template>
  <div ref="yqmmproMiningDynamic" class="yqmmpro-mining-dynamic" @scroll="onScroll">
    {{ $options.scrollTop }}
    <div ref="scrollContent" class="scroll-content">
      <MuPageHeader title="动态监控">
        <div class="setting">
          <!-- <span class="label">只看重要</span>
          <a-switch v-model="checked" @change="onChange" /> -->
          <a-button class="setting-btn" type="primary" @click="screenVisible = true">
            <i class="mmxlicon mi-filter"></i>
            <span>设置筛选</span>
          </a-button>
        </div>
      </MuPageHeader>
      <DynamicCard :dynamic-list="dynamicList"></DynamicCard>
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
    <DynamicScreen
      :visible.sync="screenVisible"
      :only-view="onlyView"
      :important-view="importantView"
      @confirm="handleConfirm"
    ></DynamicScreen>
    <MoveGuide
      :guide-steps="guideSteps"
      :visible="guideVisible"
      :mask-visible="false"
      @guideClick="handleGuideClick"
    >
      <template #setting>
        <div class="yqmmproMiningDynamic-slot-setting">
          <div class="icon-wrp">
            <img
              src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/icon_dynamic_guide.svg"
              alt="guide"
              class="icon"
            />
          </div>
          <span>筛选更符合您的关注内容！</span>
        </div>
      </template>
    </MoveGuide>
  </div>
</template>

<script>
  import { loadingMix } from '@/mixin'
  import { getUserConfigInfo, updateUserConfigInfo, getBusinessRemind } from '@/api/index.js'
  import { cloneDeep } from '@/utils/index.js'
  const DynamicCard = () => import('./components/DynamicCard.vue')
  const DynamicScreen = () => import('./components/DynamicScreen.vue')
  const MoveGuide = () => import('./components/MoveGuide.vue')
  export default {
    name: 'YqmmproMiningDynamic',
    components: {
      DynamicCard,
      DynamicScreen,
      MoveGuide,
    },
    mixins: [loadingMix({ customListName: 'dynamicList' })],
    data() {
      return {
        /**筛选弹框 */
        screenVisible: false,
        /** 是否开启只看重要 */
        // checked: false,
        dynamicList: [],
        scrollContentHeight: 0,
        wrapperHeight: 0,
        onlyView: [
          {
            id: 1,
            name: '重大商情',
            status: 0,
          },
          {
            id: 2,
            name: '采购意向',
            status: 0,
          },
          {
            id: 3,
            name: '招投标',
            status: 0,
          },
          {
            id: 4,
            name: '新合作',
            status: 0,
          },
          {
            id: 5,
            name: '新进展',
            status: 0,
          },
          {
            id: 6,
            name: '新实验室',
            status: 0,
          },
          {
            id: 7,
            name: '新研究院',
            status: 0,
          },
          {
            id: 8,
            name: '新立项',
            status: 0,
          },
          {
            id: 9,
            name: '新名单',
            status: 0,
          },
          {
            id: 10,
            name: '新规划',
            status: 0,
          },
          {
            id: 11,
            name: '新人事',
            status: 0,
          },
          {
            id: 12,
            name: '新动向',
            status: 0,
          },
          {
            id: 13,
            name: '新学院',
            status: 0,
          },
          {
            id: 14,
            name: '即将结项基金课题',
            status: 0,
          },
        ],
        importantView: [
          {
            id: 1,
            name: '普通提示',
            status: 0,
          },
          {
            id: 2,
            name: '重要提示',
            status: 0,
          },
          {
            id: 3,
            name: '紧急通知',
            status: 0,
          },
        ],
        requestParams: {
          pageNum: 1,
          pageSize: 15,
          onlyView: '',
          importance: '',
        },
        guideSteps: [],
        guideVisible: false,
      }
    },
    scrollOptions: {
      scrollTop: 0,
      /**触底阈值 */
      reachBottomDistance: 120,
      /** 是否属于触底范围 */
      isReachBottom: false,
      /**是否触底过 */
      hasReachBottom: false,
    },
    watch: {
      loadingStatus: {
        handler(newVal) {
          if (newVal !== 1) {
            this.$nextTick(() => {
              this.scrollContentHeight = this.$refs['scrollContent'].getBoundingClientRect().height
            })
          }
        },
        immediate: true,
      },
    },

    async mounted() {
      // 调试用
      // updateUserConfigInfo({
      //   type: 3,
      //   targetStatus: 1,
      // })
      // 获取用户存储的筛选项
      const res = await getUserConfigInfo()
      if (res.code === '0') {
        this.guideVisible = !!res.data.isFirstView
        // 只看 不看
        const defaultOnlyView = res.data.businessOnlyView?.split(',') ?? []
        const defaultNotView = res.data.businessNotView?.split(',') ?? []
        this.onlyView.forEach(item => {
          if (defaultOnlyView.includes(item.name)) {
            item.status = 1
          }
          if (defaultNotView.includes(item.name)) {
            item.status = 2
          }
        })
        // 重要程度
        const defaultImportantView = res.data.businessImportance?.split(',') ?? []
        this.importantView.forEach(item => {
          if (defaultImportantView.includes(item.name)) {
            item.status = 1
          }
        })
        this.requestParams.onlyView = defaultOnlyView.join()
        this.requestParams.notView = defaultNotView.join()
        this.requestParams.importance = defaultImportantView.join()
      }
      this.getDynamicList({ init: true })
      this.guideSteps = [
        {
          node: document.querySelector('.setting .setting-btn'),
          slotName: 'setting',
        },
      ]
      this.wrapperHeight = this.$refs['yqmmproMiningDynamic'].getBoundingClientRect().height
    },
    methods: {
      /** 滚动 */
      onScroll(e) {
        let scrollTop = e.srcElement.scrollTop
        this.$options.scrollOptions.scrollTop = scrollTop
        let currentBottomDistance =
          this.scrollContentHeight - this.wrapperHeight - this.$options.scrollOptions.scrollTop
        // 距离滚动到底部的距离
        this.$options.scrollOptions.isReachBottom =
          currentBottomDistance <= this.$options.scrollOptions.reachBottomDistance
        if (!this.$options.scrollOptions.isReachBottom) {
          this.$options.scrollOptions.hasReachBottom = false
        }
        if (
          this.$options.scrollOptions.isReachBottom &&
          !this.$options.scrollOptions.hasReachBottom
        ) {
          this.$options.scrollOptions.hasReachBottom = true
          this.onReachBottom()
        }
      },
      /**加载下一页 */
      onReachBottom() {
        this.getDynamicList()
      },
      async getDynamicList(opt) {
        this.toggleMixinLoading(true)
        if (opt?.init) {
          this.requestParams.pageNum = 1
          this.dynamicList = []
        } else {
          this.requestParams.pageNum++
        }
        let res = await getBusinessRemind(this.requestParams)
        if (res.code === '0') {
          let dataList =
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
          let item = cloneDeep(dataList)

          if (opt?.init) {
            this.dynamicList = item
          } else {
            this.dynamicList = [...this.dynamicList, ...item]
          }
        }
        this.toggleMixinLoading(false)
      },
      /**执行筛选 */
      handleConfirm() {
        const onlyView = this.onlyView
          .filter(item => item.status === 1)
          .map(item => item.name)
          .join(',')
        const notView = this.onlyView
          .filter(item => item.status === 2)
          .map(item => item.name)
          .join(',')
        const importance = this.importantView
          .filter(item => item.status === 1)
          .map(item => item.name)
          .join(',')
        updateUserConfigInfo({
          type: 1,
          businessOnlyView: onlyView,
          businessNotView: notView,
          businessImportance: importance,
        })
        this.requestParams.onlyView = onlyView
        this.requestParams.notView = notView
        this.requestParams.importance = importance
        this.getDynamicList({ init: true })
      },

      /**点击引导组件 */
      handleGuideClick({ slotName }) {
        let currentGuideIndex = this.guideSteps.findIndex(item => item.slotName === slotName)
        console.log(slotName)
        console.log(currentGuideIndex)
        console.log(this.guideSteps.length)
        if (currentGuideIndex >= this.guideSteps.length - 1) {
          this.guideVisible = false
          updateUserConfigInfo({
            type: 3,
            targetStatus: 0,
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-mining-dynamic {
    height: calc(100vh - 118px);
    background-color: white;
    overflow: hidden;
    overflow-y: scroll;
    border-radius: 4px 4px 0 0;
    // 滚动区域
    // .scroll-content {
    // }
    // 顶部设置
    .setting {
      // display: flex;
      // align-items: center;
      // justify-content: flex-start;
      .mmxlicon.mi-filter {
        margin-right: 4px;
      }
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
  // 引导组件插槽
  .yqmmproMiningDynamic-slot-setting {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .icon {
      margin-right: 10px;
      width: 28px;
      height: 28px;
    }
    > span {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      color: #00c7db;
    }
  }
</style>
