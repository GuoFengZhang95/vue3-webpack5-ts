<template>
  <div class="news-card-wrapper" @click="toNewsDetail(renderItem)">
    <img :src="cover" alt="cover" class="cover" />
    <img
      v-if="renderItem.isExplained == 1"
      src="@/assets/images/pic/news/unscramble.svg"
      alt=""
      class="unscramble"
    />
    <div class="content">
      <div class="title-box">
        <div v-if="renderItem.isTop == 1" class="top">置顶</div>
        <div v-if="renderItem.isChoice == 1" class="choice">精选</div>
        <div class="title" v-html="renderItem.title"></div>
      </div>
      <div class="abstract" v-html="renderItem.abstract || renderItem.content"></div>
      <div class="module-list">
        <div v-if="renderItem.companyList.length" class="module-item">
          <div class="dl">相关单位：</div>
          <div class="dt">
            <div class="company-list">
              <span
                v-for="(companyItem, index) in renderItem.companyList"
                :key="index"
                class="company-item"
                :class="{ active: !!companyItem.id }"
                @click.stop="goPurchaseCompanyDetail(companyItem)"
              >
                {{ companyItem.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="module-item">
          <div class="dl">相关城市：</div>
          <div class="dt">
            <div class="city-list">
              <span v-for="(cityItem, index) in renderItem.cityList" :key="index" class="city-item">
                {{ cityItem.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="module-item">
          <div class="dl">发布时间：</div>
          <div class="dt">{{ renderItem.publishTime || renderItem.createtime }}</div>
        </div>
      </div>
    </div>
    <div class="nums-wrp">
      <div class="nums-item">
        <span class="dl">浏览</span>
        <span class="dt">{{ renderItem.viewCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { formateNum, cloneDeep, replaceHtmlTag } from '@/utils/index.js'
  const NewsDetail = () => import('./NewsDetail.vue')
  const PurchaseCompanyDetail = () =>
    import('@/views/yqmmpro/components/PurchaseCompanyDetail/index.vue')
  export default {
    name: 'NewsCard',
    components: {},
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },
    data() {
      return {
        renderItem: {},
      }
    },
    computed: {
      cover() {
        return (
          this.renderItem.cover ||
          (this.renderItem.coverImg &&
          this.renderItem.coverImg instanceof Array &&
          this.renderItem.coverImg[0]
            ? this.renderItem.coverImg[0]
            : this.renderItem.coverImg
            ? this.renderItem.coverImg
            : '')
        )
      },
    },
    watch: {
      item: {
        handler(val) {
          if (val) {
            let renderItem = cloneDeep(val)
            renderItem.title = replaceHtmlTag({ value: renderItem.title })
            // 默认展示摘要字段
            // 有 <em>标签说明是搜素（列表接口的isHighlight=1）,需要高亮展示
            // 优先高亮摘要字段
            let abstract = ''
            if (renderItem.abstract?.includes('<em>')) {
              abstract = renderItem.abstract
            } else {
              if (renderItem.content?.includes('<em>')) {
                abstract = renderItem.content
              } else {
                abstract = renderItem.abstract
              }
            }
            renderItem.abstract = replaceHtmlTag({
              value: abstract,
            })
            if (renderItem.abstract.includes('</span>')) {
              renderItem.abstract = '...' + renderItem.abstract
            }
            // todo 接口调试
            renderItem.cityList = [
              {
                id: 1,
                name: '南京',
              },
              {
                id: 2,
                name: '苏州',
              },
              {
                id: 3,
                name: '这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式这是一个很长的城市名，用于测试样式',
              },
            ]
            renderItem.companyList = [
              {
                id: 1,
                name: '中兴',
              },
              {
                id: 2,
                name: '华为',
              },
              {
                id: 3,
                name: '这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式这是一个很长的公司名称用于测试样式',
              },
            ]
            renderItem.viewCount = formateNum(renderItem.viewCount)
            renderItem.collectCount = formateNum(renderItem.collectCount)
            this.renderItem = renderItem
          }
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {},
    methods: {
      async toNewsDetail(item) {
        let id = item.articleId || item.contentId || item.objectId
        this.$globalDrawer.show({
          component: NewsDetail,
          options: {
            name: 'NewsDetail',
            title: '重大商情详情',
            props: { id: id },
          },
        })
        this.$globalDrawer.reload()
      },
      /** 打开采购单位详情 */
      goPurchaseCompanyDetail(item) {
        if (item.id) {
          this.$globalDrawer.show({
            component: PurchaseCompanyDetail,
            options: {
              name: 'PurchaseCompanyDetail',
              props: {
                id: item.id,
              },
            },
          })
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .news-card-wrapper {
    position: relative;
    // height: 173px;
    padding: 16px;
    display: flex;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #ebedf0;
    cursor: pointer;

    .cover {
      flex-shrink: 0;
      width: 211px;
      height: 141px;
      margin-right: 16px;
      border-radius: 4px;
    }

    .unscramble {
      position: absolute;
      top: 23px;
      left: 12px;
    }

    .content {
      width: calc(100% - 270px);
      overflow: hidden;

      .title-box {
        width: 100%;
        display: flex;

        .choice {
          flex-shrink: 0;
          width: 36px;
          height: 20px;
          border-radius: 2px;
          background: #ff9919;
          font-size: 12px;
          line-height: 16px;
          padding-top: 2px;
          color: #ffffff;
          text-align: center;
          margin-right: 7px;
          white-space: nowrap;
        }

        .top {
          flex-shrink: 0;
          width: 36px;
          height: 20px;
          border-radius: 2px;
          background: #1aa7f1;
          font-size: 12px;
          line-height: 16px;
          padding-top: 2px;
          color: #ffffff;
          text-align: center;
          margin-right: 7px;
          white-space: nowrap;
        }

        .title {
          height: 22px;
          line-height: 22px;
          font-size: 16px;
          color: #444444;
          font-weight: bold;
          .ellipsisLines(1);
        }
      }

      .abstract {
        margin-top: 3px;
        line-height: 22px;
        font-size: 14px;
        color: #666666;
        .ellipsisLines(2);
      }

      .module-list {
        margin-top: 16px;
        line-height: 18px;
        font-size: 12px;
        color: #999999;

        .module-item {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;

          .dt {
            flex: 1;

            .company-list,
            .city-list {
              .ellipsisLines(1);

              .company-item,
              .city-item {
                margin-right: 10px;
                position: relative;

                &.active {
                  color: #00c7db;
                  cursor: pointer;
                }

                &:not(:last-child)::after {
                  position: absolute;
                  content: '，';
                }
              }
            }
          }
        }
      }
    }
    .nums-wrp {
      position: absolute;
      bottom: 16px;
      right: 16px;
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      color: #999999;
      display: flex;

      .nums-item {
        display: flex;

        .dl {
          margin-left: 5px;
          color: #999999;
          order: 1;
        }

        .dt {
          order: 0;
          color: #00c7db;
        }
      }
    }
  }
</style>
