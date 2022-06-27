<template>
  <div class="date-range-wrp">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="middle">
      <span v-if="label" class="label">{{ label }}</span>
      <a-range-picker
        :mode="mode"
        :format="format"
        :allow-clear="false"
        :get-calendar-container="triggerNode => triggerNode.parentNode"
        :placeholder="['开始时间', '结束时间']"
        separator="——"
        class="date-filter"
        :value="dateString"
        @openChange="handleDateOpenChange"
        @change="handleDatePanelChange"
        @panelChange="handlePanelChange"
      >
        <template slot="suffixIcon">
          <i class="mmxlicon mi-date-picker"></i>
        </template>
      </a-range-picker>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DateRange',
    filters: {},
    props: {
      mode: {
        type: Array,
        default: () => [],
      },
      format: {
        type: String,
        default: 'YYYY-MM-DD',
      },
      label: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        dateString: [null, null], // 日期
        filterDateChange: false, // 日期选择是否改变
        isReset: false,
      }
    },
    computed: {},
    methods: {
      // 日期选择事件
      handleDatePanelChange(value) {
        if (value) {
          this.filterDateChange = true
          this.dateString = [value[0].format(this.format), value[1].format(this.format)]
          this.isReset = false
          this.emit()
        }
      },

      // mode 设置为month year时会触发
      handlePanelChange(value) {
        if (value) {
          this.filterDateChange = true
          this.dateString = [value[0].format(this.format), value[1].format(this.format)]
          this.isReset = false
          this.emit()
        }
      },

      reset() {
        this.dateString = [null, null]
        this.filterDateChange = false
        this.isReset = true
        this.emit()
      },
      // 日期选择框打开关闭事件
      handleDateOpenChange(val) {
        // 如果关闭选择框
        if (!val) {
          // 如果日期改变
          if (this.filterDateChange) {
            this.filterDateChange = false
          }
        }
      },

      emit() {
        let params = {
          selectedKeys: this.dateString,
          isReset: this.isReset,
        }
        this.$emit('change', params)
      },
    },
  }
</script>

<style lang="less" scoped>
  .date-range-wrp {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .middle {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .date-filter {
        width: 250px;

        /deep/ .ant-calendar-picker-input.ant-input {
          border-radius: 2px;
        }

        .mi-date-picker {
          margin-top: -6px;
          width: 12px;
          height: 12px;
          font-size: 12px;
          line-height: 12px;
        }
      }

      .label {
        padding: 0 6px;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
      }
    }

    /deep/ .date-filter.ant-calendar-picker {
      .ant-calendar-picker-input.ant-input {
        height: 24px;
        font-size: 12px;
        line-height: 15px;
        .ant-calendar-range-picker-separator {
          color: #d9d9d9;
        }
      }
    }
  }
</style>
