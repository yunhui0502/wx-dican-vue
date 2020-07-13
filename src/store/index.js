/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
// 负责：用户信息的  存储 获取 删除 三个函数
const KEY = 'total-pc-sass'
export default {
  setUser (user) {
    // 存储用户信息
    // user 数据类型  对象
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    // 获取用户信息
    const jsonStr = window.sessionStorage.getItem(KEY) || '{}'
    return JSON.parse(jsonStr)
  },
  delUser () {
    // 删除用户信息
    window.sessionStorage.removeItem(KEY)
  },
  getUuid (len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
    var uuid = []; var i
    radix = radix || chars.length
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
    } else {
      var r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16
          // eslint-disable-next-line eqeqeq
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  },
  getNowDate () {
    var date = new Date()
    var seperator1 = '-'
    var seperator2 = ':'
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    var hour = date.getHours()
    // 获取分钟
    var minute = date.getMinutes()
    // 获取秒
    var second = date.getSeconds()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    if (hour >= 0 && hour <= 9) {
      hour = '0' + hour
    }
    if (minute >= 0 && minute <= 9) {
      minute = '0' + minute
    }
    if (minute >= 0 && minute <= 9) {
      minute = '0' + minute
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + seperator2 + minute + seperator2 + second
    return currentdate
  }
}
