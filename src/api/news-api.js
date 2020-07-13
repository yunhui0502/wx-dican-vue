/* eslint-disable require-jsdoc */
import Axios from 'axios'
// 同意
function agreeMessageApply (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('applyId', params.applyId)
  return Axios.post('/api/api/user/user/agreeMessageApply', fd)
}
// 拒绝
function refuseMessageApply (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('applyId', params.applyId)
  fd.append('refuseReason', params.refuseReason)
  return Axios.post('/api/api/user/user/refuseMessageApply', fd)
}
// 列表
function getMessageApplyList () {
  return Axios.get('/api/api/user/user/getMessageApplyList')
}
export default {
  agreeMessageApply: agreeMessageApply,
  refuseMessageApply: refuseMessageApply,
  getMessageApplyList: getMessageApplyList
}
