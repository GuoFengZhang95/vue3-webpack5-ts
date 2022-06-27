<template>
  <a-modal
    class="export-modal-wrapper"
    :visible="visible"
    width="356px"
    :footer="null"
    @cancel="cancel"
  >
    <template slot="title">批量导出</template>
    <a-spin :spinning="loading">
      <div class="export-modal-content-wrapper">
        <!-- 1可以导出  4可用额度为0 -->
        <template v-if="step === 1 || step === 4">
          <div class="no-eslimit-wrapper">
            <div class="selected-num">
              <span>您共选中数据</span>
              <span class="highlight num">{{ validTotal }}条</span>
              <a-popover>
                <template slot="content">导出字段：{{ fieldNames }}</template>
                <img
                  class="icon"
                  src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/question_1.svg"
                  alt="字段"
                />
              </a-popover>
            </div>
            <div class="statistics">
              <div class="times">
                <span>本次预计消耗额度：</span>
                <span>{{ consumeQuota }}条</span>
                <span>(免扣减{{ reduceQuota }}条)</span>
              </div>
              <div class="times remain">
                <span>本次导出前额度：</span>
                <span :class="{ 'zero-time': remainTimes === 0 }">
                  {{ remainTimes === -1 ? '不限' : remainTimes + '条' }}
                </span>
              </div>
              <div v-if="remainTimes === 0" class="notimes-tip">
                <span>额度不足请联系客服</span>
                <span class="highlight">400-677-0001</span>
                <span>获取额度！</span>
              </div>
            </div>
            <div class="tips-wrp">
              <img
                class="icon"
                src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/tips_2.svg"
                alt="提示"
              />
              <div class="tips-content">
                确定后请到
                <span>导出记录</span>
                查询进度，选中数据中若含有已导出数据将不再扣减额度，导出成功的数据自动解锁，解锁后免费查看。
              </div>
            </div>
          </div>
          <div class="export-modal-footer">
            <!-- 可以导出 -->
            <template v-if="step === 1">
              <a-button @click="cancel">取消</a-button>
              <a-button type="primary" @click="handleExport">确定</a-button>
            </template>
            <!-- 额度不足 -->
            <template v-if="step === 4">
              <a-button type="primary" @click="cancel">知道了</a-button>
            </template>
          </div>
        </template>
        <!-- es超限 -->
        <template v-if="step === 5">
          <div class="eslimit-wrapper">
            <img
              class="icon"
              src="https://img.mumuxili.com/yqmm/pc/saas/images/icon/tips_1.svg"
              alt="提示"
            />
            <div>
              <span>每次导出不能超过{{ eslimit }}条数据，请增加筛选条件后操作导出，</span>
              <span class="emphasize">
                若您点击确定系统将会为您导出筛选结果的前{{ eslimit }}条。
              </span>
            </div>
          </div>
          <div class="export-modal-footer">
            <a-button @click="cancel">取消</a-button>
            <a-button type="primary" @click="continueExport">确定</a-button>
          </div>
        </template>
      </div>
    </a-spin>
  </a-modal>
</template>

<script>
  import { GLOBAL_CONSTANT } from '@/api/constant.js'
  import { getExportConfig } from '@/api/index.js'

  export default {
    name: 'Export',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      /** 1可以导出 2角色无权限 3已导出数量大于配置额度 4可用额度为0 5单次选择数量超出ES上限 */
      step: {
        type: Number,
        default: 0,
      },
      /** 选中数量 */
      selectedNum: {
        type: Number,
        default: 0,
      },
      /** 本次消耗额度 */
      consumeQuota: {
        type: Number,
        default: 0,
      },
      /** 免扣减次数 */
      reduceQuota: {
        type: Number,
        default: 0,
      },
      /** 剩余次数 */
      remainTimes: {
        type: Number,
        default: 0,
      },

      /**导出字段 */
      fieldNames: {
        type: String,
        default: '',
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        eslimit: 0,
      }
    },
    computed: {
      /**不能超出es单次上限 */
      validTotal() {
        if (this.selectedNum > this.eslimit) {
          return this.eslimit
        } else {
          return this.selectedNum
        }
      },
    },
    mounted() {
      getExportConfig().then(res => {
        if (res.code === '0') {
          this.eslimit = res.data.perExportLimit
        } else {
          this.eslimit = GLOBAL_CONSTANT.eslimit
        }
      })
    },
    methods: {
      cancel() {
        this.$emit('update:visible', false)
      },
      /**执行导出 */
      handleExport() {
        this.$emit('export')
      },
      /**单词数量超限后继续导出 */
      continueExport() {
        this.$emit('continueExport')
      },
    },
  }
</script>

<style lang="less" scoped>
</style>
<style lang="less">
  .export-modal-wrapper {
    .export-modal-content-wrapper {
      .eslimit-wrapper {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        font-size: 14px;
        color: #666666;
        line-height: 22px;

        .icon {
          margin-top: 4px;
          margin-right: 10px;
        }
      }

      .no-eslimit-wrapper {
        .selected-num {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 14px;
          color: #444444;

          .num {
            margin-left: 9px;
            font-size: 16px;
            font-weight: bold;
          }

          .icon {
            margin-left: 4px;
          }
        }
        .statistics {
          margin-top: 12px;
          padding: 8px;
          background: #f9f9f9;
          border-radius: 4px;

          > div {
            line-height: 22px;
            color: #999999;
          }

          .times {
            &.remain {
              margin-top: 12px;
            }

            > span:nth-child(2) {
              color: #333333;
            }

            .zero-time {
              color: #ff4433 !important;
            }
          }

          .notimes-tip {
            display: flex;
            margin-top: 8px;
            padding-top: 8px;
            font-size: 14px;
            color: #444444;
            line-height: 22px;
            border-top: 1px dashed #e9e9e9;
          }
        }

        .tips-wrp {
          margin-top: 16px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          font-size: 12px;
          color: #999999;
          line-height: 22px;

          .icon {
            margin-top: 6px;
          }

          .tips-content {
            margin-left: 7px;
          }

          span {
            color: #444444;
          }
        }
      }
      .emphasize {
        color: #444444;
        font-weight: bold;
      }

      .highlight {
        color: #00c7db;
      }
    }
    .export-modal-footer {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      > .ant-btn {
        margin-left: 12px;
      }
    }
  }
</style>