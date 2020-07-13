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
  SassMessage: SassMessage,
  updatePhone: updatePhone,
  SassList: SassList,
  deletedSass: deletedSass
}
