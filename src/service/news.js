/* eslint-disable require-jsdoc */
import api from '@/api/news-api.js'

async function agreeMessageApply (params, handleResult) {
  api.agreeMessageApply(params).then((res) => handleResult(res))
}
async function refuseMessageApply (params, handleResult) {
  api.refuseMessageApply(params).then((res) => handleResult(res))
}
async function getMessageApplyList (handleResult) {
  api.getMessageApplyList().then((res) => handleResult(res))
}
export default {
  agreeMessageApply: agreeMessageApply,
  refuseMessageApply: refuseMessageApply,
  getMessageApplyList: getMessageApplyList
}
