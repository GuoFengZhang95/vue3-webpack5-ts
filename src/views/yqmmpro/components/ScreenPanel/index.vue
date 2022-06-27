<template>
  <div ref="screenPanel" class="screen-panel-wrp">
    <div class="screen-panel_inner" :class="{ fold: !isExpanded }">
      <div class="screen-tr-list-wrp">
        <div v-for="(item, index) in renderLayout" :key="index" class="screen-tr-list-item">
          <div class="screen-tr-list-item_inner">
            <div class="screen-td-list-wrp">
              <div v-for="(d, i) in item" :key="i" class="screen-td-wrp" :info="d">
                <div class="name" :class="'name-' + d.field">
                  {{ d.label }}
                </div>
                <div class="content">
                  <div v-if="!useSlot(d.field)" class="content_default">
                    <component
                      :is="d.defaultName"
                      :ref="d.field"
                      :list="d.list"
                      @change="handleChange"
                    ></component>
                  </div>
                  <div v-else class="content_slot">
                    <slot :name="d.field"></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="resultNum > 0" class="screen-result">
        <div class="screen-result_inner">
          <div class="name">已选条件</div>
          <div class="content">
            <div class="result-list">
              <slot name="result"></slot>
            </div>
          </div>
        </div>
        <div class="reset-wrp" @click="handleReset">
          <i class="mmxlicon mi-refresh-s reset-img"></i>
          <div class="reset">重置</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { cloneDeep } from '@/utils/index'
  import ResizeObserver from 'resize-observer-polyfill'
  // const FoldController = () => import('./FoldController.vue')
  export default {
    name: 'ScreenPanel',
    components: {
      // OnceFilter,
      // DoubleFilter,
      // CheckArea,
      // DateRange,
      // FoldController
    },
    filters: {},
    props: {
      layout: {
        type: Array,
        default: () => [],
      },
      /** 是否展开 */
      isExpanded: {
        type: Boolean,
        default: true,
      },
      /**是否展示筛选结果 */
      resultNum: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        com: null,
        renderLayout: [],
        ro: null,
      }
    },
    computed: {},
    watch: {
      layout: {
        handler(newVal) {
          if (newVal.length) {
            let layoutClone = cloneDeep(newVal)
            this.renderLayout = layoutClone
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      this.ro = new ResizeObserver(this.roCallBack)
      this.ro.observe(this.$refs['screenPanel'])
      this.$emit('update:height', this.$refs['screenPanel']?.getBoundingClientRect()?.height ?? 0)
    },

    methods: {
      useSlot(field) {
        let useSlot = Reflect.has(this.$slots, field)
        return useSlot
      },
      // 重置所有条件
      handleReset() {
        this.$emit('reset')
      },
      // 删除已选条件
      handleDeleteResults(field) {
        this.$refs[field][0].reset()
      },
      /**
       * @description 默认组件筛选值变化
       * @param {object} e
       * @param {string} e.field
       * @param {string} e.label
       * @param {array} e.selectedItems
       * @param {array} e.selectedKeys
       * @param {object} e.resultValue
       */
      handleChange(e) {
        this.$emit('change', e)
      },
      roCallBack(entries, observer) {
        if (entries && entries[0] && entries[0].contentRect) {
          const contentRect = entries[0].contentRect
          this.$emit('update:height', contentRect.height)
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .screen-panel-wrp {
    position: relative;
    padding: 0 24px;
    background-color: #ffffff;
    border-radius: 0 0 4px 4px;

    .screen-panel_inner {
      &.fold {
        height: 0;
        overflow: hidden;
      }

      .screen-tr-list-wrp {
        .screen-tr-list-item {
          position: relative;
          width: 100%;
          border-bottom: 1px dashed #ebebeb;

          .screen-tr-list-item_inner {
            .screen-td-list-wrp {
              display: flex;
              align-items: stretch;
              justify-content: flex-start;

              .screen-td-wrp {
                min-height: 40px;
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;

                .name {
                  width: 120px;
                  height: 40px;
                  line-height: 40px;
                  color: #999999;
                }

                .content {
                  flex: 1;
                  height: 100%;

                  .content_default,
                  .content_slot {
                    height: 100%;
                    display: flex;
                    align-items: center;
                  }
                }

                &:not(:first-child) {
                  margin-left: 74px;
                }
              }
            }
          }
        }

        .screen-tr-list-item:nth-last-of-type(1) {
          border: none;
        }
      }

      .screen-result {
        position: relative;
        border-top: 1px dashed #ebebeb;
        .screen-result_inner {
          width: calc(100% - 50px);
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .name {
            width: 120px;
            height: 40px;
            line-height: 40px;
            color: #999999;
          }

          .content {
            width: calc(100% - 120px);
            display: flex;
            align-items: center;

            .result-list {
              width: 100%;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              flex-wrap: wrap;
            }
          }
        }

        .reset-wrp {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          cursor: pointer;
          color: #00c7db;

          &:hover {
            color: #25dee8;
          }

          .reset-img {
            font-size: 12px;
            margin-right: 4px;
          }

          .reset {
            font-size: 14px;
            line-height: 16px;
          }
        }
      }
    }
  }
</style>
