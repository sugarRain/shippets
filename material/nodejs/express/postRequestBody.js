/**
 * @keywords express post request only
 * express获取POST请求参数内容
 */

const only = require('only')
function login (req, res) {
  const loginModel = only(req.body, 'username password verifyCode')
}