/**
 * @author zevan
 * @description 用于项目的工具方法
 */
import store from '../store/index.js'
/**给表格数据增加id */
export const addListId = function (list, listIdName, e = true) {
  if (e) {
    list.forEach((item, index) => {
      item['listId'] = item[listIdName] ? item[listIdName] : index
      for (let attr in item) {
        if (
          item[attr] === undefined ||
          item[attr] === null ||
          item[attr] === ''
        )
          item[attr] = '-'
      }
    })
  }
}
/**获取列表页表格的高度 */
export const getLPTableSize = function () {
  if (document.getElementsByClassName('list-page-table-wrp')[0]) {
    let pageTableWrpHeight = document.getElementsByClassName(
      'list-page-table-wrp'
    )[0].offsetHeight
    // console.log('pageTableWrpHeight', pageTableWrpHeight)
    if (document.getElementsByClassName('ant-table-thead')[0]) {
      // 重新计算 app-main 中表格的scroll: X,y
      let appMainWidth = document.getElementById('app-main').offsetWidth
      store.dispatch('app/setTableWidth', appMainWidth - 8)
      let antDesignTableHeight =
        document.getElementsByClassName('ant-table-thead')[0].offsetHeight
      store.dispatch(
        'app/setTableHeight',
        pageTableWrpHeight - antDesignTableHeight
      )
      // console.log('x', appMainWidth - 8)
      // console.log('y', pageTableWrpHeight - antDesignTableHeight)
    }
  }
}
/**
 * @description 用于给导出的filter字段中时间增加后缀
 * @param {string} field
 * @returns {string} text
*/
export function addExportSortDataSuffix(field) {
  let text = ''
  if (!field) {
    text = ''
  } else if (field === 'descend') {
    text = '降序'
  } else if (field === 'ascend') {
    text = '升序'
  } else {
    text = ''
  }
  return text
}