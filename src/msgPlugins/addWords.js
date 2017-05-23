// const fetch = require('node-fetch')
//
// function getJson (url) {
//   return fetch(url)
//     .then(res => res.json())
// }
//
// function getIntent (cb) {
//   const words = this.message.clean
//   console.log(words)
//
//   return requestIntent(words)
//     .then(data => {
//       this.message.intent = data
//       cb()
//     })
//     .catch(cb)
// }
//
// function requestIntent (text) {
//   const token = 'JAU6PCGB33TYAH2YR5WIC2SYUUZIJPUW'
//   const host = 'api.wit.ai'
//   const path = '/message'
//   const url = `https://${host}${path}?q=${text}&access_token=${token}`
//
//   return getJson(url)
// }
//
// exports.default = {
//   getIntent: getIntent
// }

const qm = function qm (cb) {
  this.message.prop = `${this.message.clean}???`
  // console.log(this.message)
  cb()
}

export default { qm }
