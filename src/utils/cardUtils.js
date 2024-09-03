/*
 * @Author: ZengJun
 * @Date: 2024-08-23 20:42:22
 * @LastEditors: ZengJun
 * @LastEditTime: 2024-09-03 19:56:56
 * @Description: 
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // 随机选择一个索引，从0到i（包括i）
    const j = Math.floor(Math.random() * (i + 1))
    // 交换元素
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function sortByColorThenPoint(arr) {
  if (arr) {
    return arr.sort((a, b) => {
      // 首先按 color 排序
      if (a.color < b.color) {
        return -1
      }
      if (a.color > b.color) {
        return 1
      }
      // 如果 color 相同，则按 point 排序
      if (a.point < b.point) {
        return -1
      }
      if (a.point > b.point) {
        return 1
      }
      // 如果 color 和 point 都相同，则它们被视为相等，排序顺序不变
      return 0
    })
  }
  return []
}
