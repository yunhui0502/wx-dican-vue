/* eslint-disable require-jsdoc */
import Axios from 'axios'

function login (params) {
  console.log(params)
  const fd = new FormData()
  // ---------------短信登录-------------------
  if (params.authKey !== '') {
    // fd.append('authKey', params.authKey)
    fd.append('phone', params.authKey)
  }
  if (params.passwd !== '') {
    fd.append('passwd', params.passwd)
  }
  // ---------------密码登录-------------------
  if (params.password !== '') {
    fd.append('password', params.password)
  }
  if (params.username !== '') {
    fd.append('username', params.username)
  }

  fd.append('loginType', params.loginType)
  // return Axios.post('/api/api/user/hf-auth/LoginSass', fd)
  return Axios.post('/api/api/dichan/login/adminLogin', fd)
}

function token (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('merId', params.merId)
  fd.append('type', params.type)
  fd.append('userId', params.userId)
  return Axios.post('/api/api/user/hf-auth/token', fd)
}
function code (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('phone', params.phone)
  fd.append('type', params.type)
  return Axios.post('/api/api/dichan/login/code', fd)
  // return Axios.post('/api/api/user/user/code', fd)
}
function authCode (uuid) {
  // var num = Math.ceil(Math.random() * 10)
  return Axios.get('/api/api/user/hf-auth/code?uuid=' + uuid)
}
function codeGit (uuid) {
  // var num = Math.ceil(Math.random() * 10)
  return Axios.get('/api/api/user/hf-auth/codeGit?uuid=' + uuid)
}
function updatePasswd (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('AccountId', params.AccountId)
  fd.append('newPassWord', params.newPassWord)
  fd.append('oldPaddWord', params.oldPaddWord)
  return Axios.post('/api/api/user/hf-auth/updatePasswd', fd)
}
export default {
  login: login,
  token: token,
  code: code,
  authCode: authCode,
  codeGit: codeGit,
  updatePasswd: updatePasswd
}
