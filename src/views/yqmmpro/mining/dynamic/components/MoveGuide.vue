<template>
  <div
    v-if="visible"
    class="move-guide-wrapper"
    :style="{ width: htmlScrollWidth + 'px', height: htmlScrollHeight + 'px' }"
  >
    <div class="current-node-wrapper" :style="currentNodeStyle"></div>
    <!-- 给a-popover占位的元素 -->
    <a-popover
      placement="bottomRight"
      :default-visible="false"
      :visible="popoverVisible"
      :get-popup-container="triggerNode => triggerNode.parentNode"
    >
      <template slot="content">
        <div @click="handleClickTargetNode">
          <div class="slots-wrapper">
            <template v-for="item in renderGuideSteps">
              <div
                v-if="currentStep.slotName === item.slotName"
                :key="item.slotName"
                class="slot-item"
              >
                <slot :name="item.slotName"></slot>
              </div>
            </template>
          </div>
        </div>
      </template>
      <div class="seat-node" :style="seatNodeStyle" @click="handleClickTargetNode"></div>
    </a-popover>
  </div>
</template>

<script>
  export default {
    name: 'MoveGuide',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      maskVisible: {
        type: Boolean,
        default: false,
      },
      guideSteps: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        htmlScrollWidth: 0,
        htmlScrollHeight: 0,
        currentIndex: 0,
        renderGuideSteps: [],
        popoverVisible: true,
      }
    },
    computed: {
      currentStep() {
        return this.renderGuideSteps[this.currentIndex]
      },
      currentNodeStyle() {
        let style = {}
        let rect = this.currentStep.rect
        // let currentNodeStyle = getComputedStyle(this.currentStep.node)
        // console.log(currentNodeStyle)
        if (rect) {
          // console.log(rect)
          style.width = rect.width + 'px'
          style.height = rect.height + 'px'
          style.borderLeftWidth = rect.left + 'px'
          style.borderRightWidth = this.htmlScrollWidth - rect.right + 'px'
          style.borderTopWidth = rect.top + 'px'
          style.borderBottomWidth = this.htmlScrollHeight - rect.bottom + 'px'
        }
        if (this.maskVisible) {
          style.borderColor = 'rgba(0, 0, 0, 0.4)'
        }
        return style
      },
      seatNodeStyle() {
        let style = {}
        let rect = this.currentStep?.rect
        if (rect) {
          style.width = rect.width + 'px'
          style.height = rect.height + 'px'
          style.left = rect.left + 'px'
          style.top = rect.top + 'px'
        }
        return style
      },
    },
    watch: {
      guideSteps: {
        handler(val) {
          if (val?.length) {
            this.renderGuideSteps = val.map(stepItem => {
              let rect = stepItem.node.getBoundingClientRect()
              return {
                ...stepItem,
                rect,
              }
            })
          }
        },
        immediate: true,
      },
    },
    mounted() {
      document.body.appendChild(this.$el)
      this.getHtmlScrollRect()
    },
    beforeDestroy() {
      document.body.removeChild(this.$el)
    },
    methods: {
      getHtmlScrollRect() {
        this.htmlScrollWidth = document.documentElement.scrollWidth
        this.htmlScrollHeight = document.documentElement.scrollHeight
      },

      handleClickTargetNode() {
        this.$emit('guideClick', this.currentStep)
        if (this.currentIndex < this.guideSteps.length - 1) {
          this.currentIndex++
        } else {
          this.popoverVisible = false
        }
      },
    },
  }
</script>

<style lang="less">
  .move-guide-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;

    .seat-node {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .current-node-wrapper {
      position: absolute;
      border-style: solid;
      border-color: transparent;
      box-sizing: content-box;
      background-clip: content-box;
      // transition: all 0.3s;
    }

    .slots-wrapper {
      cursor: pointer;
    }

    .ant-popover-inner-content {
      background: rgba(0, 199, 219, 0.15);
    }

    .ant-popover-arrow {
      border-top-color: rgba(0, 199, 219, 0.15)!important;
      border-left-color: rgba(0, 199, 219, 0.15)!important;
    }
  }
</style>