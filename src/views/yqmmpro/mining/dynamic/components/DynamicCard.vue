<template>
  <div class="dynamic-list-wrp">
    <!-- 日历 -->
    <div class="top-wrp">
      <div class="now-time">
        <div class="now-time-img-wrp">
          <img
            class="now-time-img"
            src="https://img.mumuxili.com/yqmm/mobile/wx/images/icon/calendar_selected.svg"
          />
          <div class="day">{{ currentDay }}</div>
        </div>
        <div class="now-time-text">{{ nowday }}</div>
      </div>
    </div>
    <!-- 动态列表 -->
    <div v-if="dynamicList.length" class="dynamic-list">
      <div
        v-for="(details, index) in dynamicList"
        :key="index"
        class="dynamic-card-wrp"
        @click="onClick(details)"
      >
        <div class="header">
          <div class="time" :class="details.dateType === 'day' ? 'day' : ''">
            <div class="date">{{ details.formatDateTime }}</div>
            <div v-if="details.date" class="date">{{ details.date }}</div>
          </div>
          <div class="tag">{{ details.tag }}</div>
          <!--普通提示：#1BA8F1 重要提示：#FF9919 紧急：#FF4433 -->
          <div
            v-if="details.level == '重要提示' || details.level == '紧急通知'"
            class="level"
            :class="details.level | levelClassFilter"
          >
            {{ details.level }}
          </div>
        </div>
        <div class="dynamic-card_inner">
          <div class="dynamic-card_inner_right">
            <div class="main show-line_2">
              <div class="title show-line_2">{{ details.content }}</div>
              <div v-if="details.type == 2" class="desc">
                <div
                  class="budget show-line_1"
                  :style="{
                    opacity: details.budget == '0万' || !details.budget ? 0 : 1,
                  }"
                >
                  项目经费：{{ details.budget }}
                </div>
                <div v-if="details.time" class="finish-time show-line_1">
                  起止时间：{{ details.time }}
                </div>
              </div>
            </div>
            <div v-if="details.relationCompanyStr || details.relationContactStr" class="footer">
              <a-carousel :autoplay="true" :dot-position="'left'" :dots="false">
                <div v-if="details.relationCompanyStr" class="swiper-item">
                  <div class="label">相关单位：</div>
                  <div class="value show-line_1">
                    {{ details.relationCompanyStr }}
                  </div>
                </div>
                <div v-if="details.relationContactStr" class="swiper-item">
                  <div class="label">相关联系人：</div>
                  <div class="value show-line_1">
                    {{ details.relationContactStr }}
                  </div>
                </div>
              </a-carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PurchaseDetail from '@/views/yqmmpro/components/PurchaseDetail.vue'
  import BidDetail from '@/views/yqmmpro/components/BidDetail/index.vue'
  import NewsDetail from '@/views/yqmmpro/components/NewsDetail'
  import ResearcherDetail from '@/views/yqmmpro/components/ResearcherDetail.vue'
  import FundDetail from '@/views/yqmmpro/components/FundDetail.vue'
  export default {
    name: 'DynamicCard',
    filters: {
      levelClassFilter(level) {
        let className = 'level-common'
        switch (level) {
          case '紧急通知':
            className = 'level-urgent'
            break
          case '重要提示':
            className = 'level-important'
            break
          default:
            break
        }
        return className
      },
    },
    props: {
      dynamicList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        nowday: '',
        currentDay: '',
      }
    },
    mounted() {
      this.initDate()
    },
    methods: {
      initDate() {
        const date = new Date()
        const currentYear = date.getFullYear()
        const currentMonth = date.getMonth() + 1
        const currentDay = date.getDate()
        this.nowday = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay
          .toString()
          .padStart(2, '0')}`
        this.currentDay = currentDay
      },

      onClick(details) {
        const { type, cateName, articleIdStr, relationId } = details
        // console.log(type, cateName, articleIdStr, relationId)
        let detailComponent = null
        let name = ''
        let title = ''
        if (type == 2) {
          //打开科研客户详情
          detailComponent = ResearcherDetail
          name = 'ResearcherDetail'
          title = '科研客户详情'
        } else if (type === 3) {
          detailComponent = FundDetail
          name = 'FundDetail'
          title = '基金课题详情'
        } else {
          if (cateName === '标讯') {
            //打开标讯详情
            detailComponent = BidDetail
            name = 'BidDetail'
            title = '标讯详情'
          } else if (cateName === '采购意向') {
            //打开采购意向详情
            detailComponent = PurchaseDetail
            name = 'PurchaseDetail'
            title = '采购意向详情'
          } else if (cateName === '资讯') {
            //打开资讯详情
            detailComponent = NewsDetail
            name = 'NewsDetail'
            title = '重大商情详情'
          }
        }
        this.$globalDrawer.show({
          component: detailComponent,
          options: {
            name,
            title,
            props: { id: articleIdStr || relationId || '' },
          },
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .dynamic-list-wrp {
    position: relative;
    padding: 0 24px;

    .top-wrp {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      background-color: #fff;

      .now-time {
        display: flex;
        justify-content: center;
        align-items: center;

        .now-time-img-wrp {
          position: relative;
          width: 21px;
          height: 23px;

          .now-time-img {
            width: 100%;
            height: 100%;
          }

          .day {
            position: absolute;
            top: calc(50% + 3px);
            left: 50%;
            transform: translate(-50%, -50%);
            color: #00c7db;
            font-size: 12px;
            line-height: 14px;
          }
        }

        .now-time-text {
          padding-left: 11px;
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          font-weight: bold;
          color: #666666;
        }
      }
    }
    .dynamic-list {
      .dynamic-card-wrp {
        background: #ffffff;
        cursor: pointer;

        .header {
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .time {
            font-size: 14px;
            color: #666666;
            line-height: 18px;
            text-align: center;
          }

          .date {
            width: 39px;
            text-align: center;
          }

          .day {
            color: #333333;
          }

          .tag {
            margin-left: 11px;
            margin-right: 16px;
            // width: 56px;
            width: fit-content;
            white-space: nowrap;
            height: 22px;
            font-size: 14px;
            font-weight: bold;
            color: #444444;
            line-height: 22px;
          }

          .level {
            width: 64px;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            border-radius: 22px;
            text-align: center;

            &.level-important {
              background: rgba(255, 153, 25, 0.15);
              color: rgba(255, 153, 25, 1);
            }

            &.level-urgent {
              background: rgba(255, 68, 51, 0.15);
              color: rgba(255, 68, 51, 1);
            }
          }
        }

        .dynamic-card_inner {
          padding-bottom: 15px;
          box-sizing: border-box;
          display: flex;
          align-items: stretch;
          justify-content: flex-start;

          .dynamic-card_inner_right {
            flex: 1;
            padding-left: 27px;
            padding-bottom: 15px;
            margin-left: 19px;
            position: relative;
            width: 261px;

            &::before {
              position: absolute;
              content: '';
              width: 1px;
              height: calc(100% + 7px);
              top: 50%;
              left: 0px;
              transform: translateY(calc(-50% + 8px));
              background-color: #eeeeee;
            }

            .main {
              margin-top: 8px;
              padding: 12px;
              width: 100%;
              box-sizing: border-box;
              background: #f8f8f8;
              border-radius: 2px;

              .title {
                line-height: 22px;
                font-size: 14px;
                color: #666666;
              }

              .desc {
                margin-top: 7px;
                height: 18px;
                font-size: 12px;
                color: #999999;
                line-height: 18px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .budget {
                  flex: 1;
                }

                .finish-time {
                  max-width: 170px;
                }
              }
            }

            .footer {
              margin-top: 6px;
              pointer-events: none;
              /deep/ .slick-track {
                height: 20px !important;
                .swiper-item {
                  display: flex !important;
                  align-items: center;
                  justify-content: flex-start;
                  height: 20px;
                  font-size: 14px;
                  line-height: 20px;
                  color: #999999;
                  cursor: auto;

                  .value {
                    flex: 1;
                  }
                }
              }
            }
          }
        }

        &:last-child {
          .dynamic-card_inner {
            .dynamic-card_inner_right {
              &::before {
                display: none;
              }
            }
          }
        }
      }
    }
  }
</style>
