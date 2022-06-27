<template>
  <div
    v-if="renderItem"
    class="card-researcher-wrp"
    :class="renderItem.isExpired || renderItem.isDelete ? 'delete' : ''"
    @click="onClick"
  >
    <div class="user-info-wrp">
      <div class="avatar-wrap">
        <MuAvatar
          :username="renderItem.name"
          :show-mask="renderItem.isConceal == 1"
          :is-authenticated="0"
          :is-official="0"
          :gender="renderItem.sex"
          :src.sync="renderItem.headerImageUrl"
        ></MuAvatar>
      </div>
      <div class="user-info">
        <div class="top">
          <div class="user-name show-line_1" v-html="renderItem.richName"></div>
        </div>
        <div class="bottom">
          <div v-if="renderItem.cityName || renderItem.schoolName" class="city-school">
            <div
              v-if="renderItem.cityName"
              class="city show-line_1"
              v-html="renderItem.cityName"
            ></div>
            <div
              v-if="renderItem.schoolName"
              class="school show-line_1"
              v-html="renderItem.schoolName + ' ' + renderItem.departName"
            ></div>
          </div>
          <div class="user-tag">
            <div v-if="renderItem.atpsName" class="user-position">
              {{ renderItem.atpsName }}
            </div>
            <div v-if="renderItem.titleName" class="user-title">
              {{ renderItem.titleName }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="abstractContent" class="abstract">
      <div class="rich-text" v-html="abstractContent"></div>
    </div>
    <template v-if="renderItem.researchDirections">
      <div
        v-if="
          renderItem.researchDirections.length > 0 || renderItem.researchDirections.length === 1
        "
        class="research-direction-wrp"
      >
        <div class="show-line_1">
          <div v-if="renderItem.researchDirections[0]" class="research-direction">
            {{ renderItem.researchDirections[0] }}
          </div>
          <div
            v-if="renderItem.researchDirections[1]"
            class="research-direction research-direction-2"
          >
            {{ renderItem.researchDirections[1] }}
          </div>
        </div>
      </div>
    </template>
    <div v-if="cardType === 'attention'" class="slot-follow-wrp">
      <slot name="follow"></slot>
    </div>
    <!-- 关注过期图标：权益卡过期 -->
    <div v-if="!renderItem.isDelete && renderItem.isExpired" class="overdue-wrp">
      <image
        class="overdue-img"
        src="https://img.mumuxili.com/yqmm/mobile/wx/images/icon/yiguoqi.svg"
      ></image>
    </div>
    <!-- 关注删除图标：从后台删除数据 -->
    <div v-if="renderItem.isDelete" class="delete-wrp">
      <image
        class="delete-img"
        src="https://img.mumuxili.com/yqmm/mobile/wx/images/icon/yishanchu.svg"
      ></image>
    </div>
  </div>
</template>

<script>
  import { cloneDeep, replaceHtmlTag } from '@/utils/index.js'
  const ResearcherDetail = () => import('@/views/yqmmpro/components/ResearcherDetail.vue')
  export default {
    name: 'ResearcherCard',
    props: {
      item: {
        type: Object,
        default: () => null,
      },
      cardType: {
        type: String,
        default: 'common', // 两种类型  common | attention （带关注按钮）
      },
    },
    data() {
      return {
        abstractContent: '', // 摘要内容
        renderItem: null,
      }
    },
    watch: {
      item: {
        handler(newVal, oldVal) {
          if (newVal) {
            let renderItem = cloneDeep(newVal)
            renderItem.richName = replaceHtmlTag({ value: renderItem.name })
            renderItem.name = renderItem.name.replaceAll('<em>', '').replaceAll('</em>', '') //用于头像组件
            renderItem.cityName = replaceHtmlTag({ value: renderItem.cityName })
            renderItem.schoolName = replaceHtmlTag({ value: renderItem.schoolName })
            renderItem.departName = renderItem.departName
              ? replaceHtmlTag({ value: renderItem.departName })
              : ''
            // abstractContent字段内容按照 研究方向、基金课题、原文内容、工作经历、教育背景 顺序取一个值
            const researchesTagSearch = renderItem.researchesTagSearch ?? ''
            const project = renderItem.project ?? ''
            const originalContent = renderItem.originalContent ?? ''
            const work = renderItem.work ?? ''
            const educationBackground = renderItem.educationBackground ?? ''
            if (researchesTagSearch.includes('<em>')) {
              this.abstractContent =
                '研究方向：...' + replaceHtmlTag({ value: researchesTagSearch }) + '...'
            } else if (project.includes('<em>')) {
              this.abstractContent = '基金课题：...' + replaceHtmlTag({ value: project }) + '...'
            } else if (originalContent.includes('<em>')) {
              this.abstractContent =
                '原文内容：...' + replaceHtmlTag({ value: originalContent }) + '...'
            } else if (work.includes('<em>')) {
              this.abstractContent = '工作经历：...' + replaceHtmlTag({ value: work }) + '...'
            } else if (educationBackground.includes('<em>')) {
              this.abstractContent =
                '教育背景：...' + replaceHtmlTag({ value: educationBackground }) + '...'
            } else {
              this.abstractContent = ''
            }
            this.renderItem = renderItem
          }
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      async onClick() {
        this.$globalDrawer.show({
          component: ResearcherDetail,
          options: {
            name: 'ResearcherDetail',
            title: '科研客户详情',
            props: {
              id: this.renderItem.customerId,
            },
            parent: this.$parent,
          },
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .card-researcher-wrp {
    position: relative;
    padding: 12px;
    min-width: 336px;
    // min-height: 141px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #ebebeb;
    background: #ffffff;
    cursor: pointer;

    .user-info-wrp {
      position: relative;
      display: flex;
      justify-content: flex-start;

      .avatar-wrap {
        margin-right: 13px;
      }

      .user-info {
        width: calc(100% - 70px);

        .top {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .user-name {
            max-width: 210px;
            line-height: 22px;
            font-size: 14px;
            color: #444444;
            font-weight: 400;
          }
        }

        .bottom {
          .city-school {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 20px;

            .city {
              position: relative;
              max-width: 100px;
              height: 20px;
              line-height: 20px;
              font-size: 13px;
              color: #666666;
            }

            .school {
              position: relative;
              flex: 1;
              height: 20px;
              line-height: 20px;
              font-size: 13px;
              color: #666666;
            }

            div:nth-child(2) {
              padding-left: 12px;

              &::after {
                content: '';
                position: absolute;
                top: 3px;
                left: 6px;
                width: 1px;
                height: 12px;
                background-color: #cecece;
              }
            }
          }

          .user-tag {
            display: flex;
            justify-content: flex-start;
            font-size: 13px;
            margin-top: 6px;
            min-height: 22px;

            .user-position,
            .user-title {
              height: 22px;
              line-height: 22px;
              padding: 0 8px;
              margin-right: 8px;
              border-radius: 2px;
              color: #1ba8f1;
              background: rgba(27, 168, 241, 0.15);
            }

            .user-title {
              color: #4c73e4;
              margin-right: 0;
              background: rgba(#4c73e4, 0.15);
            }
          }
        }
      }
    }
    .abstract {
      margin-top: 7px;
      font-size: 13px;
      .rich-text {
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
      }
    }

    .research-direction-wrp {
      position: relative;
      color: #999999;
      font-size: 13px;
      margin-top: 22px;
      &::before {
        position: absolute;
        top: -10px;
        left: -3px;
        content: '';
        width: 100%;
        border-bottom: 1px solid #ebebeb;
        transform: scaleY(0.5);
      }
      .research-direction {
        width: 100%;
        line-height: 22px;
        display: inline;
        word-break: break-all;
      }
      .research-direction-1 {
        &::before {
          content: '';
          padding: 0;
          position: absolute;
          top: 9px;
          left: 2px;
          width: 6px;
          height: 4px;
          background: #dbdbdb;
          border-radius: 50%;
        }
      }

      .research-direction-2 {
        position: relative;
        padding-left: 16px;

        &::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 7px;
          width: 1px;
          height: 12px;
          background-color: #cecece;
        }
      }
    }

    .slot-follow-wrp {
      position: absolute;
      z-index: 1;
      right: 12px;
      top: 12px;
    }
  }
  .delete-wrp {
    position: absolute;
    top: 55%;
    transform: translateY(-58%);
    right: 64px;

    .delete-img {
      width: 82px;
      height: 90px;
    }
  }
  .overdue-wrp {
    position: absolute;
    top: 50%;
    transform: translateY(-58%);
    right: 64px;

    .overdue-img {
      width: 80px;
      height: 38px;
    }
  }
  // 已删除样式
  .delete {
    .user-info-wrp {
      .avatar-wrap {
        opacity: 0.5;
      }

      .user-name {
        color: #999999 !important;
      }

      .city-school {
        .city,
        .school {
          color: #999999 !important;
        }
      }
    }

    .slot-follow-wrp {
      opacity: 0.5;
    }

    .user-tag {
      opacity: 0.5;
    }
  }
</style>
