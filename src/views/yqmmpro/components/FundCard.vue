<template>
  <div class="fund-card-wrapper" @click="openFundDetail">
    <div class="fund-card_inner">
      <div class="title-main">
        <div class="title" v-html="renderItem.projectName"></div>
        <div class="main">
          <div v-if="levelAndSubectVisible" class="level-subject-wrapper">
            <div
              v-if="renderItem.projectSourceName && renderItem.projectTypeName === '纵向基金'"
              class="level item show-line_1"
            >
              {{ renderItem.projectSourceName }}
            </div>
            <div v-if="renderItem.projectFunds" class="subject item show-line_1">
              {{ renderItem.projectFunds }}万元
            </div>
          </div>
          <div class="module-list">
            <div v-if="renderItem.projectSubjectName" class="module-item">
              <span class="label">学科：</span>
              <span class="value">{{ renderItem.projectSubjectName }}万元</span>
            </div>
            <div v-if="memberCompanys.length" class="module-item">
              <span class="label">依托单位：</span>
              <span class="value">
                <span v-for="(item, index) in memberCompanys" :key="index" class="company-item">
                  <span
                    :class="{ active: !!item.tokenEncodeMemberCompanyId }"
                    class="company-name"
                    v-html="item.companyNameEm"
                  ></span>
                  <template v-if="item.users.length">
                    <span>(</span>
                    <span class="user-name-list">
                      <span
                        v-for="(d, i) in item.users"
                        :key="i"
                        :class="{ active: !!d.memberUserId }"
                        class="user-name-item"
                        v-html="d.userNameEm"
                      ></span>
                    </span>
                    <span>)</span>
                  </template>
                </span>
              </span>
            </div>
            <div v-if="highlightContent.label" class="module-item">
              <span class="label">{{ highlightContent.label }}：</span>
              <span class="value" v-html="highlightContent.value"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="city-time-wrapper">
        <div class="city-list">
          <div v-for="(item, index) in renderItem.memberCityNames" :key="index" class="city-item">
            {{ item }}
          </div>
        </div>
        <div v-if="renderItem.startTime || renderItem.endTime" class="time">
          <span>{{ renderItem.startTime || '~' }}</span>
          <span>至</span>
          <span>{{ renderItem.endTime || '~' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { replaceHtmlTag, cloneDeep } from '@/utils/index.js'
  import { handleFundMemberCompanys } from '@/service/index.js'
  const FundDetail = () => import('@/views/yqmmpro/components/FundDetail.vue')
  export default {
    name: 'FundCard',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        renderItem: {},
        memberCompanys: [],
      }
    },
    computed: {
      /**额外的搜索字段 */
      highlightContent() {
        let content = {
          label: '',
          value: '',
        }
        const keyword = this.renderItem?.keyword ?? ''
        const keywordEnglish = this.renderItem?.keywordEnglish ?? ''
        const abstractChinese = this.renderItem?.abstractChinese ?? ''
        const abstractEnglish = this.renderItem?.abstractEnglish ?? ''
        const abstractConclusion = this.renderItem?.abstractConclusion ?? ''
        if (keyword.includes('<em>')) {
          content.label = '关键词'
          content.value = `...${replaceHtmlTag({ value: keyword })}...`
        } else if (keywordEnglish.includes('<em>')) {
          content.label = '英文关键词'
          content.value = `...${replaceHtmlTag({ value: keywordEnglish })}...`
        } else if (abstractChinese.includes('<em>')) {
          content.label = '中文摘要'
          content.value = `...${replaceHtmlTag({ value: abstractChinese })}...`
        } else if (abstractEnglish.includes('<em>')) {
          content.label = '英文摘要'
          content.value = `...${replaceHtmlTag({ value: abstractEnglish })}...`
        } else if (abstractConclusion.includes('<em>')) {
          content.label = '结题摘要'
          content.value = `...${replaceHtmlTag({ value: abstractConclusion })}...`
        } else {
          content.label = ''
          content.value = ''
        }
        return content
      },
      levelAndSubectVisible() {
        return !!(
          (this.renderItem.projectSourceName && this.renderItem.projectTypeName === '纵向基金') ||
          this.renderItem.projectSubjectName
        )
      },
    },
    watch: {
      info: {
        handler(val) {
          if (val) {
            this.renderItem = cloneDeep(val)
            this.renderItem.projectCategoryName =
              this.renderItem.projectCategoryName?.split('-')[0] ?? ''
            this.renderItem.memberCityNames = Array.from(
              new Set(
                this.renderItem.projectMemberInfoList
                  .map(item => item.memberCompanyCityName)
                  .filter(item => !!item)
              )
            )
            this.memberCompanys = handleFundMemberCompanys(this.renderItem)
            this.renderItem.projectName = replaceHtmlTag({ value: this.renderItem.projectName })
          }
        },
        immediate: true,
      },
    },
    methods: {
      openFundDetail() {
        this.$globalDrawer.show({
          component: FundDetail,
          options: {
            name: 'FundDetail',
            title: '基金课题详情',
            props: { id: this.info.targetId },
          },
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .fund-card-wrapper {
    padding: 12px 16px;
    // min-height: 218px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #ececec;
    box-sizing: border-box;
    cursor: pointer;

    .fund-card_inner {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title-main {
        .title {
          max-height: 48px;
          font-size: 16px;
          color: #333333;
          line-height: 24px;
          .ellipsisLines(2);
        }

        .main {
          // min-height: 98px;

          .level-subject-wrapper {
            margin-top: 8px;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            .item {
              max-width: 50%;
              margin-right: 10px;
              padding: 3px 6px;
              height: 24px;
              border-radius: 2px;
              box-sizing: border-box;
              font-size: 12px;
              line-height: 18px;

              &:nth-last-child(1):first-child {
                max-width: 100%;
              }

              &:not(:first-child) {
                margin-left: 10px;
              }
            }

            .level {
              background: rgba(27, 168, 241, 0.15);
              color: #1ba8f1;
            }

            .subject {
              background: rgba(255, 153, 25, 0.15);
              color: #ff9919;
            }
          }

          .module-list {
            margin-top: 8px;

            .module-item {
              min-height: 22px;
              line-height: 22px;
              font-size: 14px;
              color: #666666;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              // .ellipsisLines(2);

              .label {
                // width: 20px;;
              }

              .value {
                // .ellipsisLines(2);
              }

              .company-item {
                position: relative;
                margin-right: 12px;

                &:not(:last-child)::after {
                  position: absolute;
                  content: '；';
                }

                .company-name,
                .user-name-item {
                  cursor: auto;
                }

                .company-name {
                  margin-right: 2px;
                }

                .user-name-item {
                  position: relative;

                  &:not(:last-child) {
                    margin-right: 6px;
                  }

                  &:not(:last-child)::after {
                    position: absolute;
                    content: '，';
                  }
                }
              }
            }
          }
        }
      }

      .city-time-wrapper {
        margin-top: 12px;
        padding-top: 10px;
        font-size: 12px;
        color: #999999;
        border-top: 1px solid rgba(233, 233, 233, 0.5);
        display: flex;
        align-items: center;
        justify-content: space-between;

        .city-list {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: nowrap;

          .city-item {
            position: relative;
            padding-right: 20px;
            height: 18px;
            line-height: 18px;
            .ellipsisLines(1);

            &:not(:last-child)::after {
              content: '';
              position: absolute;
              width: 1px;
              height: 12px;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
              background-color: #e9e9e9;
            }
          }
        }

        .time {
          max-width: 160px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .ellipsisLines(1);
        }
      }
    }
  }
</style>
