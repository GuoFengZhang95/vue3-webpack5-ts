<template>
  <transition name="fade">
    <div v-show="visible" class="school-screen-wrp">
      <div class="main">
        <!-- 搜索框 -->
        <div class="search-wrp">
          <div class="search_inner">
            <a-input placeholder="请输入学校名称" :value="searchKey" @input="searchInput"></a-input>
            <i class="mmxlicon mi-search"></i>
          </div>
        </div>
        <!-- 热搜词 -->
        <div class="hot-wrp">
          <div
            v-for="item in hotList"
            :key="item.id"
            class="hot-item show-line_1"
            @click="handleHotClick(item)"
          >
            {{ item.searchKey }}
          </div>
        </div>
        <!-- 首字母 -->
        <div
          v-if="!searchKey && step === 'school'"
          class="firstletter-wrp"
          :style="{
            'margin-top': hotList.length ? 'margin-top: 4px;' : 'margin-top: 12px;',
          }"
        >
          <div class="firstletter">学校首字母</div>
          <div class="firstletter-list">
            <div
              v-for="item in firstletterList"
              :key="item"
              class="firstletter-item"
              :class="{ active: activeLetter == item }"
              @click="activeLetter = item"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <!-- 学校列表 -->
        <div v-if="step === 'school'" class="content">
          <div v-if="searchKey && searchSchools.length" class="search-tips">搜索结果</div>
          <div v-if="searchKey && searchSchools.length === 0" class="search-tips">暂无搜索结果</div>
          <div v-else class="school-list list-wrp">
            <div
              v-for="item in currentSchools"
              :key="item.id"
              class="school-college-item show-line_1"
              :class="{ active: !!item.checked }"
              @click="selectSchoolItem(item)"
            >
              <a-tooltip placement="topLeft" :title="item.name" arrow-point-at-center>
                <span>{{ item.name }}</span>
              </a-tooltip>
            </div>
          </div>
        </div>
        <div v-if="step === 'college'" class="content">
          <!-- 学院列表 -->
          <div class="school-college-list list-wrp">
            <div v-for="item in selectedSchoolItems" :key="item.id" class="college-module">
              <div class="school-name">{{ item.name }}</div>
              <div class="college-list">
                <div
                  v-for="college in colleges[item.id]"
                  :key="college.id"
                  class="school-college-item show-line_1"
                  :class="{ active: !!college.checked }"
                  @click="selectCollege(college)"
                >
                  {{ college.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <!-- 已选学校 -->
        <div v-show="step === 'school'" class="result-wrp">
          <div class="top">
            <div class="title">已筛选（{{ selectedSchoolKeys.length }}/{{ schoolsNum }}）</div>
            <div class="reset-wrp" @click="innerReset">
              <i class="mmxlicon mi-refresh-s reset-img"></i>
              <div class="reset">重置</div>
            </div>
          </div>
          <!-- 已选学校 -->
          <div class="result-list">
            <div v-for="item in selectedSchoolItems" :key="item.id" class="result-item show-line_1">
              <a-tooltip placement="topLeft" :title="item.name" arrow-point-at-center>
                <span>{{ item.name }}</span>
              </a-tooltip>
              <i class="mmxlicon mi-close icon-del" @click="deleteSchoolItem(item)"></i>
            </div>
          </div>
        </div>
        <!-- 已选学院 -->
        <div v-show="step === 'college'" class="result-wrp">
          <div class="top">
            <div class="title">
              已筛选（{{ selectedCollegeKeys.length }}/{{ currentCollegesNum }}）
            </div>
            <div class="reset-wrp" @click="innerReset">
              <i class="mmxlicon mi-refresh-s reset-img"></i>
              <div class="reset">重置</div>
            </div>
          </div>
          <!-- 已选学院 -->
          <div class="result-list">
            <div
              v-for="item in selectedCollegeItems"
              :key="item.id"
              class="result-item show-line_1"
            >
              <a-tooltip
                placement="topLeft"
                :title="item.name + '(' + item.schoolName + ')'"
                arrow-point-at-center
              >
                <span>{{ item.name }}（{{ item.schoolName }}）</span>
              </a-tooltip>
              <i class="mmxlicon mi-close icon-del" @click="deleteCollegeItem(item)"></i>
            </div>
          </div>
        </div>
        <!-- 操作区域 -->
        <div class="operate-wrp">
          <a-button @click="cancel">取消</a-button>
          <a-button v-if="selectedSchoolItems.length" @click="toggle">
            {{ btnText }}
          </a-button>
          <a-button type="primary" @click="confirm">确定</a-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {
    getSchoolListWithResearchers,
    getCollegeList,
    addYqmmSearchLog,
    getYqmmSearchLog,
  } from '@/api/index.js'
  import { debounce } from '@/utils/index'
  export default {
    name: 'SchoolScreen',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      list: {
        type: Array,
        default: () => {},
      },
    },
    data() {
      return {
        hotList: [],
        /**所有首字母 */
        firstletterList: [],
        searchKey: '',
        /** 所有学校 */
        schools: {},
        /**所有学院 */
        colleges: {},
        /**已选学校 */
        selectedSchoolItems: [],
        /**已选学院 */
        selectedCollegeItems: [],
        /**模糊搜索学校 */
        searchSchools: [],
        activeLetter: '',
        step: 'school',
        isReset: false,
      }
    },
    computed: {
      /**当前渲染数据 */
      currentSchools() {
        if (this.searchKey && this.searchSchools.length) {
          return this.searchSchools
        } else {
          return this.schools[this.activeLetter]
        }
      },
      /**学校id */
      selectedSchoolKeys() {
        return this.selectedSchoolItems.map(item => item.id)
      },
      /**学院id */
      selectedCollegeKeys() {
        return this.selectedCollegeItems.map(item => item.id)
      },
      /**底部按钮文字 */
      btnText() {
        let btnText = ''
        if (this.step === 'school') {
          btnText = '选学院'
        }
        if (this.step === 'college') {
          btnText = '上一步'
        }
        return btnText
      },
      /**学校总数 */
      schoolsNum() {
        return Object.values(this.schools).reduce(
          (previousValue, currentValue) => previousValue + currentValue.length,
          0
        )
      },
      /**当前学院总数 */
      currentCollegesNum() {
        return this.selectedSchoolItems
          .filter(school => this.colleges[school.id])
          .map(school => this.colleges[school.id].length)
          .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      },
    },
    watch: {},
    mounted() {
      this.searchInput = debounce(this.searchInput, 1200)
      getSchoolListWithResearchers().then(res => {
        for (const attr in res.data) {
          if (!res.data[attr].length) {
            delete res.data[attr]
          }
        }
        this.firstletterList = Reflect.ownKeys(res.data)
        this.activeLetter = this.firstletterList[0]
        this.schools = res.data
      })
      getYqmmSearchLog({ searchType: 10 }).then(res => {
        this.hotList = res.data.yqmmHotSearchs
      })
    },
    methods: {
      /**点击热搜词 */
      handleHotClick(item) {
        this.searchKey = item.searchKey
        this.handleSearch()
      },
      /**点击学校项 */
      selectSchoolItem(school) {
        const checked = school.checked
        this.setTargetStatus(Object.assign({}, school, { checked: !checked }), this.schools)
        if (!checked) {
          this.setSchoolSelectedItems(school)
        } else {
          this.deleteSchoolItem(school)
        }
      },
      /**选中学校已选项 */
      setSchoolSelectedItems(school) {
        this.selectedSchoolItems.push(school)
      },
      /**删除学校已选项 */
      deleteSchoolItem(school) {
        school.checked = false
        this.selectedSchoolItems = this.selectedSchoolItems.filter(
          schoolItem => schoolItem.id !== school.id
        )
        // 更新学校的学院已选项

        this.selectedCollegeItems
          .filter(collegeItem => school.id == collegeItem.companyId)
          .forEach(collegeItem => {
            collegeItem.checked = false
            this.deleteCollegeItem(collegeItem)
          })
      },
      /**去选择学院 */
      toggle() {
        if (this.step === 'school') {
          let targetColleges = this.selectedSchoolKeys.filter(
            item => !Reflect.has(this.colleges, item)
          ) //未请求过的学校id
          let pros = targetColleges.map(item => {
            return getCollegeList({
              schoolId: item,
              page: 1,
              pageSize: 99999,
            })
          })

          Promise.all(pros)
            .then(res => {
              res.forEach((item, index) => {
                this.$set(this.colleges, targetColleges[index], item.data)
              })
            })
            .finally(() => {
              this.step = 'college'
            })
        }
        if (this.step === 'college') {
          this.step = 'school'
        }
      },
      /**点击学院项 */
      selectCollege(college) {
        const checked = college.checked
        this.setTargetStatus(Object.assign({}, college, { checked: !checked }), this.colleges)
        if (!checked) {
          this.setCollegeSelectedItems(college)
        } else {
          this.deleteCollegeItem(college)
        }
      },
      /**选中学院已选项 */
      setCollegeSelectedItems(college) {
        let schoolName = this.selectedSchoolItems.filter(school => school.id == college.companyId)[0]
          .name
        college.schoolName = schoolName
        this.selectedCollegeItems.push(college)
      },
      /**删除学院已选项 */
      deleteCollegeItem(college) {
        college.checked = false
        this.selectedCollegeItems = this.selectedCollegeItems.filter(
          collegeItem => collegeItem.id !== college.id
        )
      },
      /**
       * @description 设置某一项的状态
       * @param {object} target 目标项
       * @param {object} data 目标项所在对象
       */
      setTargetStatus(target, data) {
        let flag = false
        for (const attr in data) {
          if (flag) break
          let tempArr = data[attr]
          for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i].id === target.id) {
              tempArr[i].checked = target.checked
              this.$set(data[attr], i, tempArr[i])
              this.$set(data, attr, data[attr])
              flag = true
              break
            }
          }
        }
      },
      /**输入框input事件 */
      searchInput(e) {
        this.searchKey = e.target.value
        this.handleSearch()
      },
      /**执行搜索 */
      handleSearch() {
        this.searchSchools = this.searchSchool()
        if (this.searchKey) {
          addYqmmSearchLog({
            isHotSearch: !!this.searchSchools.length,
            searchClient: 1,
            searchKey: this.searchKey,
            searchPlatform: 8,
            searchType: 10,
          })
        }
      },
      /**
       * @description 搜索学校
       * @returns {array}
       */
      searchSchool() {
        let searchRes = []
        if (this.searchKey) {
          for (const attr in this.schools) {
            this.schools[attr].forEach(item => {
              if (item.name.includes(this.searchKey)) {
                searchRes.push(item)
              }
            })
          }
        }
        return searchRes
      },
      confirm() {
        this.isReset = false
        if (this.step === 'school') {
          this.emit()
        } else if (this.step === 'college') {
          /**
           * 为了兼容接口，此处进行特殊判断
           * 如果检测到有学校（数量大于0并且小于已选学校总数量）中选择学院的数量为0，那么此时需要手动的把改学校下的所有学院的id存到 selectedCollegeKeys中
           */
          const targetUnSelectCollegeSchoolsIds = Object.keys(this.colleges).filter(
            schoolId =>
              !this.selectedCollegeItems.some(collegeItem => collegeItem.companyId == schoolId)
          )

          if (
            targetUnSelectCollegeSchoolsIds.length &&
            targetUnSelectCollegeSchoolsIds.length < Object.keys(this.colleges).length
          ) {
            let extraSelectedCollegeIds = []
            targetUnSelectCollegeSchoolsIds.forEach(schoolId => {
              extraSelectedCollegeIds = extraSelectedCollegeIds.concat(
                this.colleges[schoolId].map(collegeItem => collegeItem.id)
              )
            })
            let params = {
              selectedSchoolKeys: this.selectedSchoolKeys,
              selectedSchoolItems: this.selectedSchoolItems,
              selectedCollegeKeys: [...this.selectedCollegeKeys, ...extraSelectedCollegeIds],
              selectedCollegeItems: this.selectedCollegeItems,
              isReset: this.isReset,
            }
            this.$emit('change', params)
            this.cancel()
          } else {
            this.emit()
          }
        } else {
          return
        }
      },
      cancel() {
        this.$emit('close')
      },
      reset() {
        this.resetSchool()
        this.resetCollege()
        this.step = 'school'
      },
      innerReset() {
        if (this.step === 'school') {
          this.resetSchool()
        } else if (this.step === 'college') {
          this.resetCollege()
        } else {
          this.isReset = true
          this.resetSchool()
          this.resetCollege()
        }
      },
      resetSchool() {
        this.selectedSchoolItems.forEach(school => {
          this.deleteSchoolItem(school)
        })
      },
      resetCollege() {
        this.selectedCollegeItems.forEach(college => {
          this.deleteCollegeItem(college)
        })
      },
      emit() {
        let params = {
          selectedSchoolKeys: this.selectedSchoolKeys,
          selectedSchoolItems: this.selectedSchoolItems,
          selectedCollegeKeys: this.selectedCollegeKeys,
          selectedCollegeItems: this.selectedCollegeItems,
          isReset: this.isReset,
        }
        this.$emit('change', params)
        this.cancel()
      },
    },
  }
</script>

<style lang="less" scoped>
  .school-screen-wrp {
    position: relative;
    width: 600px;
    height: 465px;
    padding: 16px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px 0px 24px 1px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    opacity: 1;
    display: flex;
    flex-direction: column;

    .main {
      height: calc(100% - 170px);
      display: flex;
      flex-direction: column;

      .search-wrp {
        margin-top: 9px;
        width: 295px;
        height: 32px;

        .search_inner {
          position: relative;

          /deep/ .ant-input {
            padding-left: 30px;
          }

          .mi-search {
            position: absolute;
            left: 11px;
            top: 50%;
            transform: translateY(-50%);
            color: #999999;
          }
        }
      }

      .hot-wrp {
        padding-top: 8px;
        padding-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;

        .hot-item {
          margin-right: 16px;
          height: 18px;
          font-size: 12px;
          color: #999999;
          line-height: 18px;
          cursor: pointer;

          &:hover {
            color: #00c7db;
          }
        }
      }

      .firstletter-wrp {
        .firstletter {
          height: 22px;
          font-size: 14px;
          color: #444444;
          line-height: 22px;
        }

        .firstletter-list {
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          .firstletter-item {
            margin-right: 2px;
            width: 18px;
            height: 18px;
            line-height: 18px;
            font-size: 14px;
            background-color: white;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;

            &:hover {
              color: #00c7db;
            }

            &.active {
              background: #00c7db;
              color: white;
            }
          }
        }
      }

      .content {
        flex: 1;
        position: relative;
        padding-bottom: 15px;
        padding-top: 10px;
        box-sizing: border-box;
        overflow: hidden;
        overflow-y: auto;

        .search-tips {
          margin-top: 12px;
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          color: #444444;
          font-weight: 500;
        }

        .list-wrp {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: flex-start;
          // display: grid;
          // grid-template-columns: repeat(5, 110px);
          // grid-template-rows: repeat(auto-fill, 22px);
          // column-gap: 12px;
          // row-gap: 12px;

          .school-college-item {
            margin-right: 36px;
            margin-bottom: 11px;
            width: 105px;
            height: 24px;
            padding: 3px 6px;
            font-size: 12px;
            border-radius: 2px;
            box-sizing: border-box;
            color: #666666;
            cursor: pointer;

            &:hover {
              color: #00c7db;
            }

            &.active {
              color: #ffffff;
              background-color: #00c7db;
            }
          }
        }

        .school-list {
        }

        .school-college-list {
          display: block;

          .college-module {
            .school-name {
              height: 22px;
              line-height: 22px;
              font-size: 14px;
              font-weight: 500;
              color: #444444;
            }

            .college-list {
              margin-top: 10px;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
              align-content: flex-start;

              .school-college-item {
                margin-right: 35px;
              }
            }
          }
        }
      }
    }

    .footer {
      position: relative;
      height: 140px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background-color: #e9e9e9;
      }

      .result-wrp {
        position: relative;
        margin-top: 12px;

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .title {
            height: 22px;
            font-size: 14px;
            color: #444444;
            line-height: 22px;
          }

          .reset-wrp {
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
          }
        }

        .result-list {
          height: 58px;
          overflow: hidden;
          overflow-y: auto;
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-content: flex-start;

          .result-item {
            position: relative;
            margin-right: 10px;
            margin-bottom: 10px;
            padding-right: 22px;
            padding-left: 6px;
            width: 121px;
            height: 24px;
            line-height: 22px;
            font-size: 12px;
            border-radius: 2px;
            border: 1px solid rgba(0, 199, 219, 0.3);
            color: #00c7db;
            box-sizing: border-box;

            .icon-del {
              position: absolute;
              right: 6px;
              top: 50%;
              transform: translateY(-50%);
              color: #00c7db;
              font-size: 15px;
              cursor: pointer;
            }
          }
        }
      }

      .operate-wrp {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        > .ant-btn {
          margin-left: 12px;
          &.ant-btn-default {
            &:focus {
              border-color: #d9d9d9;
              color: rgba(0, 0, 0, 0.65);
            }
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
