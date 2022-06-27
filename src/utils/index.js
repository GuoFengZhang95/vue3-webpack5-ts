/**
 * @author zevan
 * @description 通用的工具方法
 */
export { debounce, cloneDeep } from 'lodash-es'
/**处理数字显示 */
export const formateNum = num => {
  if (!isNaN(num)) {
    num = Number(num)
    if (num >= 0) {
      if (num >= 10000) {
        return (num / 10000).toFixed(1) + 'w'
      } else if (num >= 1000) {
        let count = (num / 1000).toFixed(1)
        if (count < 10) {
          return count + 'k'
        } else {
          return (count / 10).toFixed(1) + 'w'
        }
      } else {
        return num
      }
    }
  } else {
    return num
  }
}
/**
 * @description 替换em标签
 * @param {object} data
 * @param {string} data.value 需要处理的值
 * @param {string} [data.originTag] 被替换的标签
 * @param {string} [data.targetTag] 替换标签
 * @param {string} [data.color] 颜色
 * @returns {string}
 */
export const replaceHtmlTag = ({ value = '', originTag = 'em', targetTag = 'span', color = '#FF4433' }) => {
  // console.log(value)
  // console.log(originTag)
  // console.log(targetTag)
  // console.log(color)
  if (!value) return ''
  if (!targetTag) {
    return value.replaceAll(`<${originTag}>`, '').replaceAll(`</${originTag}>`, '')
  } else {
    return value.replaceAll(`<${originTag}>`, `<${targetTag} style="color:${color}">`).replaceAll(`</${originTag}>`, `</${targetTag}>`)

  }
}
/**
* @description 获取当前日期指定天数前的日期字符串
* @param {object} params 
* @param {string} params.days 天数
* @param {'prev'|'next'} [params.direction] 当前日期前后
* @param {'YYYY-MM-DD'|'YYYY-MM'|'YYYY'} [params.format] 当前日期前后
* @return {string} 'yyyy-mm-dd'
*/
export const filterRecentDate = ({ days, direction = 'prev', format = 'YYYY-MM-DD' }) => {
  const date = new Date()
  const currentTime = date.getTime()
  const diffTime = Number(days) * 24 * 60 * 60 * 1000
  let targeTime = ''
  if (direction == 'prev') {
    targeTime = currentTime - diffTime
  } else {
    targeTime = currentTime + diffTime
  }
  const targetDate = new Date(targeTime).toLocaleDateString()
  // console.log(targetDate)
  let formateDate = ''
  const formateDateArr = targetDate
    .split('/')
    .map((item, index) => {
      if (index > 0) {
        if (item.length === 1) {
          item = '0' + item
        }
      }
      return item
    })

  if (format === 'YYYY-MM-DD') {
    formateDate = formateDateArr.join('-')
  } else if (format === 'YYYY-MM') {
    formateDate = `${formateDateArr[0]}-${formateDateArr[1]}`
  } else if (format === 'YYYY') {
    formateDate = formateDateArr[0]
  } else {
    formateDate = ''
  }
  return formateDate
}
