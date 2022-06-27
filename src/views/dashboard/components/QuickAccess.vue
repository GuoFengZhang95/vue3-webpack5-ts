<template>
  <div class="quick-access-wrp">
    <div class="title">快捷访问</div>
    <div class="access-list">
      <div
        v-for="(item, index) in quickAccessList"
        :key="index"
        class="access-item"
        @click="$router.push(`${item.path}`)"
      >
        <div class="access-item-icon"><img :src="item.icon" alt="" /></div>
        <div class="access-item-info">
          <div class="topic">{{ item.topic }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
      <!-- <div class="last-access-item"></div> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuickAccess',
    props: {},
    data() {
      return {
        quickAccessList: [
          {
            icon: require('@/assets/images/icon/access_keyankehu.svg'),
            topic: '科研客户',
            desc: '客源商机 随心速查',
            path: '/yqmmpro/customer/researcher',
          },
          {
            icon: require('@/assets/images/icon/access_jijinketi.svg'),
            topic: '基金课题',
            desc: '巨量资源 挖掘潜在客户',
            path: '/yqmmpro/customer/fund',
          },
          {
            icon: require('@/assets/images/icon/access_zhongdashangqing.svg'),
            topic: '重大商情',
            desc: '重大资讯 深度解读',
            path: '/yqmmpro/project/major',
          },
          {
            icon: require('@/assets/images/icon/access_caigoudanwei.svg'),
            topic: '采购单位',
            desc: '企业采购 多维信息',
            path: '/yqmmpro/customer/purchase-company',
          },
          {
            icon: require('@/assets/images/icon/access_caigouyixiang.svg'),
            topic: '采购意向',
            desc: '预知采购 锁定商机',
            path: '/yqmmpro/project/purchase',
          },
          {
            icon: require('@/assets/images/icon/access_zhaotoubiao.svg'),
            topic: '招投标',
            desc: '精选标讯 免费提供',
            path: '/yqmmpro/project/bid',
          },
          {
            icon: require('@/assets/images/icon/access_dingyuetuisong.svg'),
            topic: '订阅推送',
            desc: '订阅信息 及时推送',
            path: '/yqmmpro/mining/subscription',
          },
          {
            icon: require('@/assets/images/icon/access_qiyekehu.svg'),
            topic: '企业客户',
            desc: '企业客源 便捷联络',
            path: '/yqmmpro/customer/company',
          },
          {
            icon: require('@/assets/images/icon/access_AI.svg'),
            topic: 'AI外呼',
            desc: '智能呼叫 更多商机',
            path: '/ai/outbound/task',
          },
        ],
      }
    },
  }
</script>

<style lang="less" scoped>
  .quick-access-wrp {
    min-width: 731px;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: white;

    .title {
      padding: 16px;
      height: 22px;
      line-height: 22px;
      font-size: 18px;
      color: #333333;
      box-sizing: content-box;
    }

    .access-list {
      padding: 0 24px 24px 24px;
      display: grid;
      grid-template-columns: repeat(3, calc((100% - 16px * 2) / 3));
      column-gap: 16px;
      row-gap: 16px;

      .access-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 98px;
        border-radius: 4px;
        border: 1px solid #ebebeb;
        // margin-right: 16px;
        // margin-bottom: 16px;
        cursor: pointer;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:nth-last-child(3),
        &:nth-last-child(2) {
          margin-bottom: 0;
        }
        .access-item-icon {
          margin-right: 12px;
          img {
            width: 46px;
            height: 46px;
          }
        }

        .access-item-info {
          line-height: 22px;
          .topic {
            height: 22px;
            font-size: 16px;
            color: #444444;
            margin-bottom: 2px;
          }
          .desc {
            font-size: 12px;
            color: #999;
            letter-spacing: 2px;
          }
        }
      }

      .last-access-item {
        width: 31.77%;
        min-width: 217px;
        height: 98px;
      }
    }
  }
</style>
