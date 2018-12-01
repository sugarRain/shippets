/**
 * @keywords 颜色 随机
 * 获取一个随机颜色
 */
export function randomColor() {
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += randomHex()
  }
  return color
}

function randomHex() {
  return Math.floor(Math.random() * 16).toString(16)
}
