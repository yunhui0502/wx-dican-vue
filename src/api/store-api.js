/* eslint-disable require-jsdoc */
import Axios from 'axios'

// ----------------------------------------------------------------------------------------
function selectUser () {
  return Axios.get('/api/api/dichan/company/selectUser')
}
// 添加用户
function addUser (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('name', params.name)
  fd.append('phone', params.phone)
  return Axios.post('/api/api/dichan/company/addUser', fd)
}
// 删除用户
function deletedUser (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('userId', params.userId)
  return Axios.post('/api/api/dichan/company/deletedUser', fd)
}

function findDownCategory (params) {
  console.log(params)
  return Axios.get('/api/api/dichan/category/findDownCategory?parentCategoryId=' + params.parentCategoryId + '&projectId=' + params.projectId)
}

// 删除类目
function deleteCategory (params) {
  console.log(params)
  return Axios.get('/api/api/dichan/category/deleteCategory', { params })
}

// 获取项目
function getProject () {
  return Axios.get('/api/api/dichan/project/getProject')
}
// 添加项目
function addCategory (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('levelId', params.levelId)
  fd.append('category', params.category)
  fd.append('parentCategoryId', params.parentCategoryId)
  fd.append('projectId', params.projectId)
  return Axios.post('/api/api/dichan/category/addCategory', fd)
}
// 编辑
function updateCategory (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('category', params.category)
  fd.append('categoryId ', params.categoryId)
  return Axios.post('/api/api/dichan/category/updateCategory', fd)
}
// 获取项目概况图
function selectProject (projectId) {
  return Axios.get('/api/api/dichan/company/selectProject?projectId=' + projectId)
}
// 删除项目概况图
function deletedProject (fileId) {
  const fd = new FormData()
  fd.append('fileId', fileId)
  return Axios.post('/api/api/dichan/company/deletedProject?fileId=', fd)
}
// // 添加项目概况图
// function deletedProject (fileId) {
//   const fd = new FormData()
//   fd.append('fileId', fileId)
//   fd.append('projectId', projectId)
//   return Axios.post('/api/api/dichan/company/addProject?fileId=', fd)
// }
// 获取轮播图
function getRatation (projectId) {
  return Axios.get('/api/api/dichan/ratation/getRatation?projectId=' + projectId + '&type=homePage')
}

// 删除轮播图
function deleteRatation (id) {
  return Axios.get('/api/api/dichan/ratation/deleteRatation?id=' + id)
}
// 添加项目
function addProject (params) {
  const fd = new FormData()
  fd.append('projectName', params.projectName)
  return Axios.post('/api/api/dichan/project/addProject', fd)
}
// 删除项目
function deleteProject (id) {
  return Axios.get('/api/api/dichan/project/deleteProject?id=' + id)
}
// 编辑项目
function updateProject (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('id', params.id)
  fd.append('name', params.projectName)
  return Axios.post('/api/api/dichan/project/updateProject', fd)
}
// ----------------------------------------------------------------------------------------
// 添加
function AddApplet (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('domain', params.domain)
  fd.append('expireTime', params.expireTime)
  fd.append('isPerpetual', params.isPerpetual)
  fd.append('name', params.name)
  fd.append('phone', params.phone)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/AddApplet', fd)
}
// 编辑
function updateApp (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('bossId', params.bossId)
  // fd.append('domain', params.domain)
  fd.append('expireTime', params.expireTime)
  fd.append('isPerpetual', params.isPerpetual)
  fd.append('name', params.name)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/updateApp', fd)
}
function AppletList (params) {
  return Axios.get('/api/api/user/hf-auth/AppletList', { params })
}

function deleted (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('bossId', params.bossId)
  fd.append('isDeleted', params.isDeleted)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/deleted', fd)
}

function migration (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('accountId', params.accountId)
  fd.append('bossId', params.bossId)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/migration', fd)
}
function updateCopyright (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('Copyright', params.Copyright)
  fd.append('bossId', params.bossId)
  fd.append('multipartFile', params.multipartFile)
  fd.append('type', params.type)
  return Axios.post('/api/api/user/hf-auth/updateCopyright', fd)
}
function payment (params) {
  console.log(params)
  const fd = new FormData()
  fd.append('appid', params.appid)
  fd.append('payKey', params.payKey)
  fd.append('lastModifier', params.lastModifier)
  fd.append('mchid', params.mchid)
  fd.append('miniappid', params.miniappid)
  fd.append('publicappid', params.publicappid)
  fd.append('userId', params.userId)
  // fd.append('id', params.id)
  fd.append('bossId', params.bossId)
  return Axios.post('/api/api/cart/PayBoss/payment', fd)
}
export default {
  AppletList: AppletList,
  AddApplet: AddApplet,
  updateApp: updateApp,
  deleted: deleted,
  migration: migration,
  updateCopyright: updateCopyright,
  payment: payment,

  selectUser: selectUser,
  deletedUser: deletedUser,
  addUser: addUser,
  findDownCategory: findDownCategory,
  deleteCategory: deleteCategory,
  getProject: getProject,
  addCategory: addCategory,
  updateCategory: updateCategory,
  selectProject: selectProject,
  deletedProject: deletedProject,
  getRatation: getRatation,
  deleteRatation: deleteRatation,
  addProject: addProject,
  deleteProject: deleteProject,
  updateProject: updateProject
}
