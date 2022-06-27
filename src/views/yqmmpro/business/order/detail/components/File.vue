<template>
  <div class="mumu-file-list">
    <div
      v-for="(item, index) in fileList"
      :key="index"
      class="download-item"
      @click="downLoad(item.filePath)"
    >
      <img
        class="icon"
        :src="`https://img.mumuxili.com/yqmm/pc/saas/images/icon/${getFileIcon(
          item.fileExt
        )}.svg`"
        alt=""
      />
      <div class="content">
        <div class="title show-line_1">{{ item.fileName }}</div>
        <div class="info">
          <span>{{ transformFileSize(item.fileSize) }}</span>
          <a-divider type="vertical"></a-divider>
          <span>{{ item.createtimeFormat }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getFileUrl } from '@/api/index.js'
  export default {
    name: 'File',
    props: {
      fileList: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {}
    },
    methods: {
      getFileIcon(fileExt) {
        let icon = ''
        switch (fileExt) {
          case 'pdf':
            icon = 'icon-pdf'
            break
          case 'doc':
          case 'docx':
            icon = 'icon-word'
            break
          case 'xls':
          case 'xlsx':
            icon = 'icon-excel'
            break
        }
        return icon
      },
      //下载附件
      async downLoad(val) {
        let params = {
          fileUrl: val,
        }
        let res = await getFileUrl(params)
        window.open(res.data)
      },
      //文件大小保留一位小数
      transformFileSize(fileSize) {
        const unitGB = 1024 * 1024 * 1024
        const unitMB = 1024 * 1024
        const unitKB = 1024
        let strLen, tempFileSize
        if (fileSize > unitGB) {
          strLen = fileSize / unitGB
          tempFileSize = this.returnFloat(strLen) + 'GB'
        } else if (fileSize > unitMB) {
          strLen = fileSize / unitMB
          tempFileSize = this.returnFloat(strLen) + 'MB'
        } else if (fileSize > unitKB) {
          strLen = fileSize / unitKB
          tempFileSize = this.returnFloat(strLen) + 'KB'
        } else {
          strLen = fileSize
          tempFileSize = this.returnFloat(strLen) + 'B'
        }
        return tempFileSize
      },
      //保留一位小数
      returnFloat(value) {
        let tempValue = 0
        tempValue = Math.round(parseFloat(value) * 100) / 100
        let xsd = []
        xsd = tempValue.toString().split('.')
        if (xsd.length === 1) {
          tempValue = tempValue.toString() + '.0'
        }
        if (xsd.length > 1) {
          if (xsd[1].length > 1) {
            tempValue = `${xsd[0]}.${xsd[1].slice(0, 1)}`
          }
        }
        return tempValue
      },
    },
  }
</script>

<style lang="less" scoped>
  .mumu-file-list {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .download-item {
      transition: all 0.3s;

      &:hover {
        border-color: #00c7db;
        // box-shadow: -10px 0px 20px 0px rgba(0, 0, 0, 0.16);
        box-shadow: 0 0 4px 0 rgba(0, 199, 219, 0.38);
      }

      margin-bottom: 16px;
      margin-right: 16px;
      padding: 8px 0 8px 32px;
      position: relative;
      width: 370px;
      height: 51px;
      border: 1px solid #e9e9e9;
      border-radius: 4px;
      cursor: pointer;

      .icon {
        position: absolute;
        left: 12px;
        top: 8px;
        width: 14px;
        height: 14px;
      }

      .content {
        .title {
          width: 239px;
          height: 18px;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          color: #666;
          line-height: 13px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .info {
          height: 17px;
          font-size: 12px;
          color: #ccc;
          line-height: 17px;
        }
      }
    }
  }
</style>
