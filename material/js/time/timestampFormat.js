/**
  * 时间戳转换为时间
  * @keywords 时间戳 格式化
  * @param {number} timestamp 时间戳 291913132191
  * @param {string} format 格式 YYYY-MM-DD hh-mm-ss
  * @returns
  */
export function timestampFormat (timestamp, format = 'YYYY-MM-DD hh-mm-ss') {
  let stamp = Number(timestamp)
  if (Number.isNaN(stamp)) {
    return stamp
  } else {
    if (stamp.toString().length === 10) { // 10位时间戳,表示后端返回的时间戳。
      stamp = stamp * 1000
    }
    let date = new Date(stamp)
    let regs = [{
      reg: /Y+/,
      fn: function ($1) {
        let year = date.getFullYear().toString()
        if ($1 === 'YYYY') {
          return year
        } else {
          return year.substring(year.length - $1.length, year.length)
        }
      }
    }, {
      reg: /MM/,
      fn: function () {
        return (date.getMonth() + 1).toString().padStart(2, '0')
      }
    }, {
      reg: /DD/,
      fn: function () {
        return date.getDate().toString().padStart(2, '0')
      }
    }, {
      reg: /hh/,
      fn: function () {
        return date.getHours().toString().padStart(2, '0')
      }
    }, {
      reg: /mm/,
      fn: function () {
        return date.getMinutes().toString().padStart(2, '0')
      }
    }, {
      reg: /ss/,
      fn: function () {
        return date.getSeconds().toString().padStart(2, '0')
      }
    }]
    regs.map((r) => {
      format = format.replace(r.reg, r.fn)
    })
  }
  return format
}