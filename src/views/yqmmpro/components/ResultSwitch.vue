<template>
  <div class="result-switch-wrapper">
    <div class="left-area">
      <div class="result-display">
        <span>{{ isSearch ? '搜索结果' : '最新数据' }}</span>
        <span v-if="isSearch">(共{{ total }}条)</span>
      </div>
      <div class="slot-wrapper left">
        <slot name="left"></slot>
      </div>
    </div>
    <div class="right-area">
      <div class="slot-wrapper right">
        <slot name="right"></slot>
      </div>
      <div class="result-switch">
        <div v-if="isTimeRelateShow && isSearch" class="time-relate">
          <span
            class="sort"
            :class="selectedSort == sortKey.time ? 'selected' : ''"
            @click="handleSortChange(sortKey.time)"
          >
            时间
          </span>
          <span class="line"></span>
          <span
            class="sort"
            :class="selectedSort == sortKey.relate ? 'selected' : ''"
            @click="handleSortChange(sortKey.relate)"
          >
            相关性
          </span>
        </div>
        <div v-if="isDisplaySwitchShow" class="display-switch">
          <img
            v-for="(item, index) in switchBtn"
            :key="index"
            :src="selectedDisplay == index ? item[0] : item[1]"
            alt="icon"
            @click="handleDisplayChange(index)"
          />
        </div>
        <div v-if="selectedDisplay == 1 && isDisplaySwitchShow" class="column-setting">
          <TableSetting
            :columns="columns"
            @setTableHeader="setTableHeader"
            @dragTableHeaderOver="dragTableHeaderOver"
            @dragTableHeaderEnd="dragTableHeaderOver"
          ></TableSetting>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TableSetting from '@/components/global/Table/modules/TableSetting.vue'
  export default {
    components: {
      TableSetting,
    },
    props: {
      isSearch: {
        type: Boolean,
        default: false,
      },
      total: {
        type: Number,
        default: 0,
      },
      isTimeRelateShow: {
        type: Boolean,
        default: false,
      },
      selectedSort: {
        type: [Number, String],
        default: 1,
      },
      defaultDisplay: {
        type: [Number, String],
        default: 0,
      },
      isDisplaySwitchShow: {
        type: Boolean,
        default: true,
      }, // 卡片、表格切换按钮是否显示
      settingActFlag: {
        // 是否扩展表格操作按钮（设置/刷新）
        type: Boolean,
        default: () => true,
      },
      columns: {
        //表头
        type: Array,
        default: () => [],
      },
      /**相关性和时间排序的值 */
      sortKey: {
        type: Object,
        default: () => {
          return {
            relate: 0,
            time: 1,
          }
        },
      },
    },
    data() {
      return {
        selectedDisplay: 0,
        switchBtn: [
          [
            require('@/assets/images/icon/module-color.svg'),
            require('@/assets/images/icon/module.svg'),
          ],
          [require('@/assets/images/icon/list-color.svg'), require('@/assets/images/icon/list.svg')],
        ],
      }
    },
    watch: {
      defaultDisplay: {
        handler(val) {
          if (val !== undefined) {
            this.selectedDisplay = val
          }
        },
      },
    },
    methods: {
      /**时间-相关性排序切换 */
      handleSortChange(key) {
        if (this.selectedSort == key) return
        this.$emit('handleSortChange', key)
      },
      /**展示方式切换 */
      handleDisplayChange(key) {
        if (this.selectedDisplay == key) return
        this.selectedDisplay = key
        this.$emit('handleDisplayChange', key)
      },
      /**表头设置-选中&&取消 */
      setTableHeader(column) {
        this.$emit('setTableHeader', column)
      },
      /**表头设置-拖动表头ing */
      dragTableHeaderOver(columnsNew) {
        this.$emit('dragTableHeaderOver', columnsNew)
      },
    },
  }
</script>

<style lang="less" scoped>
  .result-switch-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
    // padding: 16px 0 18px;

    .left-area {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .result-display {
        position: relative;
        width: fit-content;
        white-space: nowrap;
        padding-left: 12px;
        height: 22px;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        &::before {
          position: absolute;
          left: 0;
          top: 1px;
          content: '';
          width: 4px;
          height: 20px;
          background: #00c7db;
        }
      }
    }

    .right-area {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .result-switch {
        display: flex;
        width: fit-content;
        white-space: nowrap;

        .time-relate {
          display: flex;
          align-items: center;
          padding-right: 24px;
          font-size: 14px;
          color: #999;

          .sort {
            cursor: pointer;
            user-select: none;
            &.selected {
              color: #00c7db;
            }
          }

          .line {
            display: inline-block;
            height: 12px;
            width: 1px;
            background-color: #d8d8d8;
            margin: 0 12px;
          }
        }

        .display-switch {
          img {
            width: 24px;
            height: 24px;
            cursor: pointer;

            &:last-child {
              margin-left: 8px;
            }
          }
        }

        /deep/.column-setting {
          margin-left: 16px;

          > button {
            margin-left: 0;

            > span {
              display: none;
            }

            > i {
              color: #ccc;
            }
          }
        }
      }
    }

    .slot-wrapper {
      // padding: 0 12px;
      position: relative;
    }
  }
</style>
