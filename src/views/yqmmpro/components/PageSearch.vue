<template>
  <div ref="pageSearch" class="yqmmpro-page-search">
    <div class="top">
      <div class="search-left">
        <a-select
          v-if="options.length"
          :default-value="options[0].value"
          style="width: 100px"
          @change="handleSelectChange"
        >
          <a-select-option v-for="item in options" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <div class="search-content">
          <div class="input-wrp">
            <input
              type="text"
              class="input_self"
              maxlength="40"
              :placeholder="renderPlaceholder"
              :value="value"
              @input="e => $emit('update:value', e.target.value)"
              @keydown.enter="onConfrim"
              @focus="searchLogVisible = true"
              @blur="searchLogVisible = false"
            />
            <button class="search-button" @click="onConfrim">搜索</button>
          </div>
          <transition name="fade">
            <div v-show="searchLogVisible && searchLogList.length" class="search-log-wrp">
              <div class="search-log-top">
                <div class="left">
                  <i class="mmxlicon mi-clock"></i>
                  <div class="title">历史记录</div>
                </div>
                <div class="del" @click="empty">清空</div>
              </div>
              <div class="search-log-content">
                <div
                  v-for="(item, index) in searchLogList"
                  :key="index"
                  class="search-log-item show-line_1"
                  @click="handleSearchLog(item)"
                >
                  {{ item.searchKey }}
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="search-right">
        <div class="slot-right">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <div
      v-if="hotList.length"
      class="hot-content"
      :style="{ 'margin-left': options.length ? '100px' : '0px' }"
    >
      <div class="hot-content_dl">热门搜索：</div>
      <div class="hot-list">
        <div
          v-for="item in hotList"
          :key="item.id"
          class="hot-item show-line_1"
          :data-value="item"
          @click="clickHot(item)"
        >
          {{ item.searchKey }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getYqmmHotSearchByModule, getYqmmSearchLog, deleteYqmmSearchLog } from '@/api/index.js'
  export default {
    name: 'YqmmproPageSearch',
    props: {
      value: {
        type: String,
        default: '',
      },
      range: {
        type: String,
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      options: {
        type: Array,
        default: () => [],
      },
      searchType: {
        type: [Number, String],
        default: 1,
      },
    },

    data() {
      return {
        hotList: [],
        searchLogList: [],
        searchLogVisible: false,
      }
    },
    computed: {
      renderPlaceholder() {
        if (this.placeholder) {
          return this.placeholder
        }
        if (this.options.length) {
          let text = ''
          text = this.options.find(item => item.value === this.range)?.label ?? ''
          if (text === '综合搜索') {
            return `请输入${this.options
              .map(item => item.label)
              .filter(item => item !== '综合搜索')
              .join('、')}`
          } else {
            return `请输入${text}`
          }
        } else {
          return '请输入'
        }
      },
    },

    watch: {
      options: {
        handler(newVal) {
          if (newVal && newVal.length) {
            this.$emit('update:range', newVal[0].value)
          }
        },
        immediate: true,
      },
      searchType: {
        handler(newVal) {
          if (newVal) {
            this.updateHotSearch(newVal)
            this.updateSearchLog(newVal)
          }
        },
        immediate: true,
      },
    },

    methods: {
      async updateHotSearch(searchType) {
        const res = await getYqmmHotSearchByModule({ searchType })
        this.hotList = res.data
        this.$nextTick(() => {
          this.$emit('update:height', this.$refs['pageSearch'].getBoundingClientRect()?.height ?? 0)
        })
      },
      async updateSearchLog(searchType) {
        const res = await getYqmmSearchLog({ searchType })
        if (res.data.yqmmSearchLogs.length > 20) res.data.yqmmSearchLogs.length = 20
        this.searchLogList = res.data.yqmmSearchLogs
      },
      handleSelectChange(e) {
        this.$emit('update:range', e)
      },
      /**回车或者enter键 */
      onConfrim(e) {
        e.srcElement.blur()
        this.searchLogVisible = false
        // 去除前后空格
        let val = this.value
        if (val) {
          val = (val + '').trim()
          this.$emit('update:value', val)
        }
        this.$emit('confirm', val)
      },
      /**搜索热搜 */
      clickHot(item) {
        this.$emit('update:value', item.searchKey)
        this.$emit('confirm', item.searchKey)
      },
      /**搜索搜索记录 */
      handleSearchLog(item) {
        this.$emit('update:value', item.searchKey)
        this.$emit('confirm', item.searchKey)
      },
      async empty() {
        const res = await deleteYqmmSearchLog({ searchType: this.searchType })
        if (res.code === '0') {
          this.searchLogList = []
          this.searchLogVisible = false
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .yqmmpro-page-search {
    padding: 16px 24px;
    border-radius: 4px;
    background-color: #ffffff;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .search-left {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        /deep/ .ant-select {
          margin-top: 4px;
          .ant-select-selection {
            border: none;
            background-color: transparent;
            border: none !important;
            box-shadow: none !important;

            .ant-select-selection__rendered {
              color: #00c7db;
            }
          }
        }

        .search-content {
          position: relative;
          .input-wrp {
            width: 600px;
            height: 40px;
            background: #ffffff;
            border-radius: 4px;
            opacity: 1;
            border: 1px solid #00c7db;
            display: flex;
            align-items: stretch;
            justify-content: flex-start;
            overflow: hidden;

            .input_self {
              padding-left: 12px;
              flex: 1;
              font-size: 14px;
              color: #444444;
              border: none;
              outline: none;

              &::placeholder {
                color: #cccccc;
              }
            }

            .search-button {
              width: 96px;
              height: 40px;
              line-height: 40px;
              background: #00c7db;
              border-radius: 0px 4px 4px 0px;
              text-align: center;
              border: none;
              color: #ffffff;
              font-size: 16px;
              margin: 0;
              padding: 0;
              cursor: pointer;
            }
          }

          .search-log-wrp {
            padding: 5px 0 11px 0;
            position: absolute;
            z-index: 10;
            left: 0;
            top: 48px;
            width: calc(100% - 96px);
            height: 198px;
            box-sizing: border-box;
            background: #ffffff;
            box-shadow: 0px 4px 12px 1px rgba(0, 0, 0, 0.12);
            border-radius: 4px;

            .search-log-top {
              padding: 0 16px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 14px;
              color: #999999;
              line-height: 22px;

              .left {
                display: flex;

                .mi-clock {
                  margin-right: 4px;
                }
              }

              .del {
                cursor: pointer;
              }
            }

            .search-log-content {
              padding: 5px 0;
              width: 100%;
              height: calc(100% - 27px);
              box-sizing: border-box;
              overflow: hidden;
              overflow-y: auto;

              .search-log-item {
                padding: 5px 16px;
                font-size: 14px;
                color: #999999;
                line-height: 22px;
                cursor: pointer;

                &:hover {
                  background-color: #f9f9f9;
                  color: #00c7db;
                }
              }
            }
          }
        }
      }

      .search-right {
        .slot-right {
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
        }
      }
    }

    .hot-content {
      margin-left: 100px;
      margin-top: 6px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      .hot-content_dl {
        width: 60px;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #666666;
      }

      .hot-list {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;

        .hot-item {
          max-width: 300px;
          margin-right: 10px;
          height: 20px;
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          cursor: pointer;

          &:hover {
            color: #00c7db;
          }
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(5px);
  }
</style>
