/* eslint-disable require-jsdoc */
import store from '@/api/store-api.js'
// ------------------------------------------------------------------------
async function selectUser (params, handleResult) {
  store.selectUser(params).then((res) => handleResult(res))
}
async function deletedUser (params, handleResult) {
  store.deletedUser(params).then((res) => handleResult(res))
}
async function addUser (params, handleResult) {
  store.addUser(params).then((res) => handleResult(res))
}
async function findDownCategory (params, handleResult) {
  store.findDownCategory(params).then((res) => handleResult(res))
}
async function deleteCategory (params, handleResult) {
  store.deleteCategory(params).then((res) => handleResult(res))
}
async function selectProject (projectId, handleResult) {
  store.selectProject(projectId).then((res) => handleResult(res))
}
async function deletedProject (fileId, handleResult) {
  store.deletedProject(fileId).then((res) => handleResult(res))
}
async function getRatation (fileId, handleResult) {
  store.getRatation(fileId).then((res) => handleResult(res))
}
async function deleteRatation (id, handleResult) {
  store.deleteRatation(id).then((res) => handleResult(res))
}
async function deleteProject (id, handleResult) {
  store.deleteProject(id).then((res) => handleResult(res))
}
async function updateProject (params, handleResult) {
  store.updateProject(params).then((res) => handleResult(res))
}
async function selectAdmin (handleResult) {
  store.selectAdmin().then((res) => handleResult(res))
}
async function addAdmin (userId, handleResult) {
  store.addAdmin(userId).then((res) => handleResult(res))
}
// ------------------------------------------------------------------------
async function AppletList (params, handleResult) {
  store.AppletList(params).then((res) => handleResult(res))
}

async function AddApplet (params, handleResult) {
  store.AddApplet(params).then((res) => handleResult(res))
}
async function updateApp (params, handleResult) {
  store.updateApp(params).then((res) => handleResult(res))
}
async function deleted (params, handleResult) {
  store.deleted(params).then((res) => handleResult(res))
}
async function migration (params, handleResult) {
  store.migration(params).then((res) => handleResult(res))
}
async function updateCopyright (params, handleResult) {
  store.updateCopyright(params).then((res) => handleResult(res))
}
async function payment (params, handleResult) {
  store.payment(params).then((res) => handleResult(res))
}
async function getProject (handleResult) {
  store.getProject().then((res) => handleResult(res))
}
async function addCategory (params, handleResult) {
  store.addCategory(params).then((res) => handleResult(res))
}
async function updateCategory (params, handleResult) {
  store.updateCategory(params).then((res) => handleResult(res))
}
async function addProject (params, handleResult) {
  store.addProject(params).then((res) => handleResult(res))
}
async function deleteAdmin (userId, handleResult) {
  store.deleteAdmin(userId).then((res) => handleResult(res))
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
  updateProject: updateProject,
  selectAdmin: selectAdmin,
  addAdmin: addAdmin,
  deleteAdmin: deleteAdmin
}
