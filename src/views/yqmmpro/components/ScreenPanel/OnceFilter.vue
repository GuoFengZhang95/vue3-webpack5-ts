<template>
  <div class="once-filter-wrp">
    <div class="once-filter-list" :style="{ height: unfold ? '41px' : 'auto' }">
      <div
        v-for="item in list"
        ref="FilterItem"
        :key="item.id"
        class="once-filter-item"
        :class="item.id | isChecked(selectedKeys)"
        @click="handleClickItem(item)"
      >
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div v-if="showFold" class="unfold-wrap" @click="unfold = !unfold">
      <div class="more">{{ unfold ? '更多' : '收起' }}</div>
      <i class="mmxlicon mi-arrow-down" :class="{ rotate: !unfold }"></i>
    </div>
  </div>
</template>

<script>
  // import { cloneDeep } from '@/utils/index'
  export default {
    name: 'OnceFilter',
    filters: {
      isChecked(id, selectedKeys) {
        const isChecked = selectedKeys.includes(id)
        let className = ''
        if (isChecked) className = 'active'
        return className
      },
    },
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      /**自定义id name */
      replaceFields: {
        type: Object,
        default: () => {
          return {
            children: 'children',
            id: 'id',
            name: 'name',
          }
        },
      },
      /**是否多选 */
      multiple: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        selectedKeys: [],
        selectedItems: [],
        isReset: false,
        /**展开收起 */
        unfold: true,
        /**实际数据是否超过一行 */
        showFold: true,
      }
    },
    watch: {
      list: {
        handler(val) {
          if (val && val.length > 0) {
            // this.filterList = cloneDeep(val)
            this.$nextTick(() => {
              let FilterItems = this.$refs['FilterItem']
              let theFirstItemRect = FilterItems[0].getBoundingClientRect()
              let theLastItemRect = FilterItems[FilterItems.length - 1].getBoundingClientRect()
              if (theFirstItemRect && theLastItemRect) {
                this.showFold = theFirstItemRect.top !== theLastItemRect.top
              }
            })
          } else {
            this.showFold = false
          }
        },
        immediate: true,
      },
    },
    mounted() {
      window.addEventListener('resize', () => {
        let FilterItems = this.$refs['FilterItem']
        let theFirstItemRect = FilterItems[0] ? FilterItems[0].getBoundingClientRect() : null
        let theLastItemRect = FilterItems[FilterItems.length - 1]
          ? FilterItems[FilterItems.length - 1].getBoundingClientRect()
          : null
        if (theFirstItemRect && theLastItemRect) {
          this.showFold = theFirstItemRect.top !== theLastItemRect.top
        }
      })
    },
    methods: {
      handleClickItem(item) {
        const { id } = item
        const idIndex = this.selectedKeys.indexOf(id)
        if (this.multiple) {
          if (idIndex != -1) {
            this.selectedKeys.splice(idIndex, 1)
            this.selectedItems.splice(idIndex, 1)
          } else {
            this.selectedKeys.push(id)
            this.selectedItems.push(item)
          }
        } else {
          this.selectedKeys = idIndex != -1 ? [''] : [id]
          this.selectedItems = idIndex != -1 ? [''] : [item]
        }
        this.isReset = false
        this.emit()
      },

      reset() {
        this.selectedKeys = []
        this.selectedItems = []
        this.isReset = true
        this.emit()
      },

      emit() {
        let params = {
          selectedKeys: this.selectedKeys,
          selectedItems: this.selectedItems,
          isReset: this.isReset,
        }
        this.$emit('change', params)
      },
    },
  }
</script>

<style lang="less" scoped>
  .once-filter-wrp {
    display: flex;
    justify-content: space-between;

    .once-filter-list {
      margin-right: 10px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      .once-filter-item {
        margin-right: 36px;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #444444;
        border: 1px solid transparent;
        white-space: nowrap;

        > span {
          padding: 0 6px 0 0;
          display: inline-block;
          height: 22px;
          line-height: 20px;
        }

        &:hover {
          color: #00c7db;
          cursor: pointer;
        }

        &.active {
          > span {
            background-color: #00c7db;
            border-radius: 2px;
            color: #ffffff;
            border: 1px solid #00c7db;
          }
        }
      }
    }
    .unfold-wrap {
      margin-top: 10px;
      padding: 0 4px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #999999;
      border: 1px solid #ebebeb;
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;

      .more {
        margin-right: 6px;
      }
      &:hover {
        border-color: #00c7db;
        color: #00c7db;
      }
      > .mmxlicon {
        font-size: 12px;
        transform: scale(0.9);
        transition: transform 0.3s;
        &.rotate {
          transform: rotate(180deg) scale(0.9);
        }
      }
    }
  }
</style>
