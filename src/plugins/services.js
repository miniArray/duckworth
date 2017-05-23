const fetch = require('node-fetch')

function getTone (text) {
  const username = 'cdfcfb7f-6003-4a31-98d5-87922b5fefdc'
  const password = 'oTaSLtcNu3Qy'
  const host = 'gateway.watsonplatform.net'
  const path = '/tone-analyzer/api/v3/tone'
  const url = `https://${username}:${password}@${host}${path}?version=2016-05-19&text=${text}`

  return getJson(url)
}

function getIntent (text) {
  const token = 'JAU6PCGB33TYAH2YR5WIC2SYUUZIJPUW'
  const host = 'api.wit.ai'
  const path = '/message'
  const url = `https://${host}${path}?q=${text}&access_token=${token}`

  return getJson(url)
}

/////// Helpers ////////////

function getJson (url) {
  return fetch(url)
    .then(res => res.json())
}

//////// Main //////////////

function services (cb) {
  console.log(this.message.clean)

  // return getTone(words)
  //   .then(data => {
  //     console.log(data)
  //     this.message.tone = data.document_tone
  //     cb()
  //   })
  //   .catch(console.log)

  return getIntent(this.message.clean)
    .then(data => {
      this.message.intent = data
      cb()
    })
    .catch(cb)
}

exports.services = services
