<template>
  <div class="double-filter-wrp">
    <div
      class="double-filter-list"
      :style="{ height: unfold ? '41px' : 'auto' }"
    >
      <span
        v-for="item in filterList"
        ref="FilterItem"
        :key="item.id"
        class="filter-con"
      >
        <a-popover
          v-if="item.children && item.children.length > 0"
          :get-popup-container="triggerNode => triggerNode.parentNode"
          placement="bottomLeft"
          trigger="hover"
          class="filter"
        >
          <template slot="content">
            <div class="second-list">
              <div
                v-for="sec in item.children"
                :key="sec.id"
                class="second-item"
              >
                <span
                  class="filter-item second"
                  :class="{ all: sec.check }"
                  @click="handleFilterClick(sec, item.id)"
                >
                  {{ sec.name }}
                </span>
              </div>
            </div>
          </template>
          <span
            :class="{ all: item.check, half: item.half }"
            class="filter-item"
            @click="handleFilterClick(item)"
          >
            {{ item.name }}
          </span>
        </a-popover>
        <span v-else class="filter-item">{{ item.name }}</span>
      </span>
    </div>
    <div v-if="showFold" class="unfold-wrap" @click="unfold = !unfold">
      <div class="more">{{ unfold ? '更多' : '收起' }}</div>
      <i class="mmxlicon mi-arrow-down" :class="{ rotate: !unfold }"></i>
    </div>
  </div>
</template>

<script>
  import { cloneDeep } from '@/utils/index'
  export default {
    name: 'DoubleFilter',
    props: {
      list: {
        type: Array,
        default: () => {
          return [[]]
        },
      },
      field: {
        type: String,
        default: '',
      },
      /** 全选时是否需要父级id */
      needParnetId: {
        type: Boolean,
        default: true,
      },
      /**全选时是否需要子级id */
      needChildrenIds: {
        type: Boolean,
        default: true,
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
    },
    data() {
      return {
        filterList: [],
        selectedKeys: [],
        selectedItems: [],
        /**展开收起 */
        unfold: true,
        /**实际数据是否超过一行 */
        showFold: true,
        isReset: false,
      }
    },
    watch: {
      list: {
        handler(val) {
          if (val && val.length > 0) {
            this.filterList = cloneDeep(val)
            this.$nextTick(() => {
              let FilterItems = this.$refs['FilterItem']
              let theFirstItemRect = FilterItems[0].getBoundingClientRect()
              let theLastItemRect =
                FilterItems[FilterItems.length - 1].getBoundingClientRect()
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
    methods: {
      handleFilterClick(item, pId) {
        // console.log(item)
        item.check = !item.check
        // 如果是取消选中
        if (!item.check) {
          if (pId) {
            // 如果是二级菜单
            const parent = this.filterList.filter(i => i.id == pId)[0]
            if (parent.children.every(i => !i.check)) {
              parent.check = false
              parent.half = false
            } else {
              parent.check = false
              parent.half = true
            }
          } else {
            // 如果是一级菜单
            item.children.forEach(i => {
              i.check = false
            })
            item.half = false
          }
          // 如果是选中
        } else {
          if (pId) {
            // 如果是二级菜单
            const parent = this.filterList.filter(i => i.id == pId)[0]
            if (parent.children.every(i => i.check)) {
              parent.check = true
              parent.half = false
            } else {
              parent.check = false
              parent.half = true
            }
          } else {
            // 如果是一级菜单
            item.children.forEach(i => {
              i.check = true
            })
          }
        }
        this.filterList = [...this.filterList]
        // 所有选中的二级菜单
        let secondList = []
        this.filterList.forEach(i => {
          secondList = [...secondList, ...i.children]
        })

        // 全选的情况下
        // 选中项名称使用父级名称
        // id 使用子级的id
        const selectedItems = []
        this.filterList.forEach(item => {
          // 子级是否有选中
          let hasChildrenCheck = false
          let newChildren = []
          if (item.children && item.children.length) {
            hasChildrenCheck = item.children.some(item => item.check)
            newChildren = item.children.filter(item => item.check)
          }
          if (item.check || hasChildrenCheck) {
            let newItem = Object.assign({}, item, { children: newChildren })
            selectedItems.push(newItem)
          }
        })
        const selectedKeys = []
        this.filterList.forEach(item => {
          if (item.children && item.children.length) {
            let isChildrenCheckAll = !item.children.some(d => !d.check)
            if (this.needChildrenIds) {
              item.children.forEach(d => {
                if (d.check) {
                  selectedKeys.push(d.id)
                }
              })
            }
            if (this.needParnetId && isChildrenCheckAll) {
              selectedKeys.push(item.id)
            }
          }
        })
        this.selectedItems = selectedItems
        this.selectedKeys = selectedKeys
        this.isReset = false
        this.emit()
      },
      reset() {
        this.filterList = cloneDeep(this.list)
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
  .double-filter-wrp {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;

    .double-filter-list {
      margin-right: 10px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      .filter-con {
        height: 40px;
        line-height: 40px;
      }
      /deep/ .ant-popover-inner-content {
        padding: 8px;
      }
      /deep/ .second-list {
        // min-width: 100px;
        max-height: 320px;
        padding-right: 36px;
        overflow: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        &::-webkit-scrollbar-thumb {
          background-color: #d9d9d9;
          border-radius: 4px;
        }
        .second-item {
          white-space: nowrap;
          &:last-child {
            .filter-item {
              margin: 0;
            }
          }
        }
      }
      /deep/ .filter-item {
        font-size: 12px;
        color: #444444;
        padding: 0 6px 0 0;
        display: inline-block;
        height: 24px;
        line-height: 23px;
        box-sizing: border-box;
        margin-right: 24px;
        border-radius: 2px 2px 2px 2px;
        border: 1px solid transparent;
        user-select: none;
        cursor: pointer;
        &.second {
          height: 22px;
          line-height: 21px;
          margin: 0 0 10px 0;
          display: inline-block;
        }
        &:hover {
          color: #00c7db;
        }
        &.half {
          color: #00c7db;
          border: 1px solid #00c7db;
        }
        &.all {
          color: white;
          border: 1px solid #00c7db;
          background-color: #00c7db;
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
      cursor: pointer;
      border-radius: 2px;
      display: flex;
      align-items: center;
      border: 1px solid #ebebeb;

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
