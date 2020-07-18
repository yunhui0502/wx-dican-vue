/* eslint-disable require-jsdoc */
import Axios from 'axios'

function addText (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('richText', params.richText)
  fd.append('projectId', params.projectId)
  fd.append('textType', params.textType)
  return Axios.post('/api/api/dichan/company/addText', fd)
}
// 获取富文本
function selectText (params) {
  console.log(params)
  return Axios.get('/api/api/dichan/company/selectText?projectId=' + params.projectId + '&type=' + params.textType)
  // return Axios.get('/api/api/dichan/company/selectText?projectId=60' + '&type=category')
}
// 删除富文本
function deletedText (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('productId', params.productId)
  fd.append('type', params.type)
  return Axios.post('/api/api/dichan/company/deletedText', fd)
}
function SassMessage (id) {
  console.log(id)
  return Axios.get('/api/api/user/hf-auth/SassMessage?accountId=' + id)
}

function SassList (params) {
  console.log(params)
  return Axios.get('/api/api/user/hf-auth/SassList', { params })
}

function updatePhone (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('authKey', params.authKey)
  fd.append('passwd', params.passwd)
  return Axios.post('/api/api/user/hf-auth/updatePhone', fd)
}

function deletedSass (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('AccountId', params.AccountId)
  fd.append('isDeleted', params.isDeleted)
  return Axios.post('/api/api/user/hf-auth/deletedSass', fd)
}
export default {
  addText: addText,
  selectText: selectText,
  SassMessage: SassMessage,
  updatePhone: updatePhone,
  SassList: SassList,
  deletedSass: deletedSass,
  deletedText: deletedText
}
