/* eslint-disable require-jsdoc */
import log from '@/api/management-api.js'

async function addText (params, handleResult) {
  log.addText(params).then((res) => handleResult(res))
}

async function SassMessage (id, handleResult) {
  log.SassMessage(id).then((res) => handleResult(res))
}
async function deletedText (params, handleResult) {
  log.deletedText(params).then((res) => handleResult(res))
}
async function updatePhone (params, handleResult) {
  log.updatePhone(params).then((res) => handleResult(res))
}

async function SassList (params, handleResult) {
  log.SassList(params).then((res) => handleResult(res))
}
async function deletedSass (params, handleResult) {
  log.deletedSass(params).then((res) => handleResult(res))
}
async function selectText (params, handleResult) {
  log.selectText(params).then((res) => handleResult(res))
}
export default {
  addText: addText,
  selectText: selectText,
  deletedText: deletedText,
  SassMessage: SassMessage,
  updatePhone: updatePhone,
  SassList: SassList,
  deletedSass: deletedSass
}
