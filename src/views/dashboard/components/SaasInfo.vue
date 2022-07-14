<template>
  <div id="saas-info">
    <div class="top-header">
      <a-row :gutter="[10, 0]">
        <a-col :span="colSpan.info">
          <div v-if="baseUserInfo" class="header-wrp" :class="!noticeList.length ? 'extendWidth' : ''">
            <div class="user-info-wrp">
              <div class="avatar">
                <a-image v-if="baseUserInfo.avatar" :width="100" :height="100" :src="baseUserInfo.avatar"
                  :preview="false" />
                <img v-else src="@/assets/images/pic/default-avatar.png" />
              </div>
              <div class="info">
                <div class="name">
                  <span>Hi，</span>
                  <span v-if="baseUserInfo.userName" class="username show-line_1">
                    {{ baseUserInfo.userName }}
                  </span>
                  <span>，欢迎回来！</span>
                </div>
                <div v-if="baseUserInfo.unitName" class="unitname" @click="goSystemMember">
                  {{ baseUserInfo.unitName }}
                </div>
                <div class="mark">
                  <div class="mark-item user-type">
                    <span>{{ roleName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="colSpan.notice">
          <div v-if="noticeList.length" class="notice-wrp">
            <div class="page-header">
              <div class="notice-title-wrp">
                <div class="notice-title-left">
                  <div class="notice-title">通知</div>
                  <div class="notice-num">（{{ total }}）</div>
                </div>
                <div class="notice-title-right">
                  <div class="notice-more" @click="goSystemNotice">
                    查看更多>
                  </div>
                </div>
              </div>
            </div>
            <div class="notice-list">
              <div v-for="item in noticeList" :key="item.noticeId" class="notice-item"
                @click="showNoticeDetail(item.noticeId)">
                <div class="notice-left show-line_1">
                  <img v-if="item.type == 1" src="@/assets/images/icon/notice_1.svg" alt="" class="notice-icon" />
                  <img v-if="item.type == 2" src="@/assets/images/icon/download_1.svg" alt="" class="notice-icon" />
                  <span class="notice-content show-line_1">
                    {{ item.title }}
                  </span>
                </div>
                <div class="notice-time">{{ item.updateTime }}</div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, onMounted } from 'vue'
import type { SystemNoRead } from '@/api/types/index'
// import NoticeDetail from '@/views/system/notice/components/detail.vue'
import { getSystemNoReadList } from '@/api/index'
import { useUserStore } from '@/store/index'
import router from '@/router/index'

export default defineComponent({
  name: 'DashboardSaasInfo',
  setup() {
    const userStore = useUserStore()

    let noticeList = reactive<SystemNoRead[]>([])
    let total = ref<number | string>(0)

    onMounted(() => {
      getNoticeList()
      // todo 全局事件总线
    })

    const baseUserInfo = computed(() => {
      return userStore.baseUserInfo
    })
    const colSpan = computed(() => {
      let colSpan = {
        info: 16,
        notice: 8,
      }
      if (!noticeList.length) {
        colSpan.info = 24
        colSpan.notice = 0
      }
      return colSpan
    })
    const roleName = computed(() => {
      let roleIds = baseUserInfo.value.companyMember?.roleIds ?? '-1'
      const roleMap = new Map([
        ['-1', '普通用户'],
        ['0', '管理员'],
        ['1', '普通成员'],
        ['2', '协同管理员'],
        ['3', '主要成员'],
      ])
      return roleMap.get(roleIds)
    })

    /**获取消息列表 */
    function getNoticeList() {
      getSystemNoReadList({ pageNum: 1, pageSize: 4 }).then(res => {
        noticeList.push(...res.data.list)
        total.value = res.data.total
        if (total.value > 99) {
          total.value = '99+'
        }
      })
    }
    /**打开消息详情 */
    function showNoticeDetail(noticeId) {
      // todo 打开消息详情侧拉
      console.log(noticeId)
      // this.$globalDrawer.show({
      //   component: NoticeDetail,
      //   options: {
      //     name: 'NoticeDetail',
      //     title: '消息详情',
      //     props: { id: noticeId },
      //   },
      // })
    }
    /**跳转成员管理页面 */
    function goSystemMember() {
      router.push({
        path: '/system/member'
      })
    }
    /**跳转通知消息页面 */
    function goSystemNotice() {
      router.push({
        name: 'SystemNotice'
      })
    }
    return {
      noticeList,
      total,
      baseUserInfo,
      colSpan,
      roleName,
      getNoticeList,
      showNoticeDetail,
      goSystemMember,
      goSystemNotice,
    }
  }
})
</script>
<style lang="less" scoped>
#saas-info {
  height: 100%;

  .top-header {
    .header-wrp {
      position: relative;
      height: 210px;
      // box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.03);

      .user-info-wrp {
        display: flex;
        height: 100%;
        padding: 24px;
        align-items: center;
        border-radius: 4px;
        background: white;
        background-image: url('../../../assets/images/pic/eos-dashboard-header.png');
        background-position: bottom right;
        background-repeat: no-repeat;
        background-size: cover;

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 1px solid #00c7db;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }

        .info {
          margin-left: 21px;
          width: calc(100% - 200px);

          .name {
            font-size: 20px;
            color: #444;
            display: flex;
            align-content: center;
            justify-content: flex-start;

            .username {
              max-width: 100px;
            }
          }

          .unitname {
            margin-top: 4px;
            max-width: 500px;
            height: 16px;
            line-height: 16px;
            font-size: 14px;
            color: #999999;
            cursor: pointer;
            .ellipsis;
          }

          .mark {
            margin-top: 20px;
            display: flex;
            align-items: center;

            .mark-item {
              margin-right: 16px;
            }

            .user-type {
              padding: 0 6px;
              height: 20px;
              line-height: 18px;
              font-size: 12px;
              color: #00c7db;
              border-radius: 10px;
              border: 1px solid rgba(0, 199, 219, 0.5);
            }

            .member {
              width: 65px;
              height: 20px;

              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }

      .right-tag {
        padding: 6px 10px 6px 10px;
        position: absolute;
        right: 0;
        top: 12px;
        height: 40px;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: white;
        background: #00c7db;
        background-image: linear-gradient(#00d7ec, #26e0f3);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        cursor: pointer;

        .icon-tag {
          margin-right: 5px;
          width: 12px;
          height: 14px;
        }
      }

      &.extendWidth {
        width: 100%;
      }
    }

    .notice-wrp {
      height: 210px;
      padding: 16px 16px 0;
      background: #ffffff;
      border-radius: 4px;

      .notice-title-wrp {
        display: flex;
        align-content: center;
        justify-content: space-between;
        margin-bottom: 6px;

        .notice-title-left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 22px;
          line-height: 22px;
          font-size: 18px;

          .notice-title {
            color: #333;
          }

          .notice-num {
            color: #ff3344;
          }
        }

        .notice-title-right {
          .notice-more {
            font-size: 14px;
            color: #00c7db;
            cursor: pointer;
          }
        }
      }

      .notice-list {
        .notice-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          cursor: pointer;

          .notice-left {
            display: flex;
            align-items: center;
            width: 62.42%;

            .notice-icon {
              width: 20px;
              height: 20px;
            }

            .notice-content {
              margin-left: 8px;
              width: 90.78%;
              height: 22px;
              font-size: 14px;
              color: #666666;
              line-height: 22px;
            }
          }

          .notice-time {
            width: 143px;
            height: 22px;
            font-size: 14px;
            text-align: right;
            color: #999999;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
