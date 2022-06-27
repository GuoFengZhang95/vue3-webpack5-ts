<template>
  <div class="text-range-wrp">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <span v-if="label" class="label">{{ label }}</span>
      <div class="text-content">
        <div class="range-one">
          <a-input
            :value="valueMin"
            :placeholder="placeholders.l"
            @input="handleInput($event, 'l')"
            @blur="handleBlur($event, 'l')"
          ></a-input>
          <span v-if="units.l" class="unit">{{ units.l }}</span>
        </div>
        <span class="link">-</span>
        <div class="range-two">
          <a-input
            :value="valueMax"
            :placeholder="placeholders.r"
            @input="handleInput($event, 'r')"
            @blur="handleBlur($event, 'r')"
          ></a-input>
          <span v-if="units.r" class="unit">{{ units.r }}</span>
        </div>
        <div class="operations-wrapper">
          <!-- <a-config-provider :auto-insert-space-in-button="false">
            <a-button :auto-insert-space-in-button="false" class="cancel" @click="reset">
              取消
            </a-button>
          </a-config-provider> -->
          <a-config-provider :auto-insert-space-in-button="false">
            <a-button :auto-insert-space-in-button="false" class="confirm" @click="confirm">
              确定
            </a-button>
          </a-config-provider>
        </div>
      </div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TextRange',
    filters: {},
    props: {
      label: {
        type: String,
        default: '',
      },
      /**单位 */
      units: {
        type: Object,
        default: () => {
          return { l: '', r: '' }
        },
      },
      placeholders: {
        type: Object,
        default: () => {
          return { l: '', r: '' }
        },
      },
    },
    data() {
      return {
        valueMin: '',
        valueMax: '',
        isReset: false,
        max: 99999999,
        min: 0,
      }
    },
    computed: {},
    methods: {
      handleInput() {
        this.handleValue(arguments)
      },
      handleBlur() {
        this.handleValue(arguments)
      },
      handleValue([e, type]) {
        let value = this.NumberCheck(e.target.value)
        if (type === 'l') {
          if (value > this.max) {
            value = this.max
          }
          this.valueMin = value
          e.target.value = value
        } else if (type === 'r') {
          if (value > this.max) {
            value = this.max
          }
          this.valueMax = value
          e.target.value = value
        }
      },
      /**确认 */
      confirm() {
        // 校验最大值和最小值
        if (this.valueMin && this.valueMax && Number(this.valueMin) > Number(this.valueMax)) {
          this.valueMax = this.valueMin
        }
        this.isReset = false
        if (this.valueMin && this.valueMax) {
          this.emit()
        }
      },
      /**重置 */
      reset() {
        this.valueMin = ''
        this.valueMax = ''
        this.isReset = true
        this.emit()
      },

      emit() {
        let params = {
          selectedKeys: [this.valueMin, this.valueMax],
          isReset: this.isReset,
        }
        this.$emit('change', params)
      },
      NumberCheck(num) {
        // 只能输入非负整数
        let str = String(num).replace(/[^\d]+/g, '')
        return str
      },
    },
  }
</script>

<style lang="less" scoped>
  .text-range-wrp {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .middle {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .label {
        padding: 0 6px;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
      }

      .text-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .range-one,
        .range-two {
          position: relative;

          .ant-input {
            padding-right: 24px;
            width: 78px;
            height: 24px;
            border-radius: 2px;
          }

          .unit {
            position: absolute;
            right: 8px;
            top: 50%;
            transform: translateY(-50%);
          }
        }

        .link {
          margin: 0 6px;
        }

        .operations-wrapper {
          margin-left: 8px;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .ant-btn {
            margin-right: 8px;
            padding: 0;
            width: 36px;
            height: 24px;
            font-size: 12px;
            border-radius: 2px;
          }

          .cancel:hover,
          .cancel:focus {
            color: rgba(0, 0, 0, 0.65);
            border-color: rgb(217, 217, 217);
          }

          .confirm {
            color: #00c7db;
            border-color: #00c7db;
          }
        }
      }
    }
  }
</style>
