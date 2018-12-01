/**
 * 执行CMD命令
 */

let { exec } = require('child_process')

export async function execCmd(cmd) {
  let res = await exec(cmd, async (error, stdout, stderr) => {
    if (error) {
      return error
    }
    return stderr
  })
  return res
}