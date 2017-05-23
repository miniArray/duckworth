import superscript from 'superscript'
import express from 'express'
import Message from 'ss-message'
import { join } from 'path'

import hash from './utils/hash'

const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 5000
// const pluginsPath = `${__dirname}/../msgPlugins`;

let bot
const options = {
  factSystem: {
    clean: false,
  },
  messagePluginsPath: `${join(__dirname, 'msgPlugins')}`,
  pluginsPath: `${join(__dirname, 'plugins')}`,
  importFile: './data.json',
}

Message.loadPlugins(options.messagePluginsPath)

module.exports = hash;

var botHandle = function(err, bot) {
  io.on('connection', socket => {
    let watermark = 0
    let botId = 0
    let youId = 0
    let topicName = 'random'

    console.log(`User ${socket.id} has connected.\n`)

    socket.on('chat', msg => {
      Message.createMessage(msg, {}, (err, resultObj) => {
        resultObj.nlp = null

        socket.emit('you', {
          ...resultObj,
          topicName,
          subReplies: [{
            id: ++youId,
            string: resultObj.original,
            delay: 0
          }],
          watermark: ++watermark,
          from: 'you'
        })
      })

      bot.reply(socket.id, msg, (err, resultObj) => {
        topicName = resultObj.topicName

        console.log(resultObj)

        resultObj.subReplies.unshift({
          string: resultObj.string,
          delay: 0
        })

        resultObj.subReplies = resultObj.subReplies.map(r => ({
          ...r,
          from: resultObj.from,
          watermark: resultObj.watermark,
          replyId: resultObj.replyId,
          createdAt: resultObj.createdAt,
          topicName: resultObj.topicName,
          id: ++botId,
          hash: hash(r.string)
        }))

        socket.emit('chat', {
          ...resultObj,
          hash: hash(resultObj.string),
          watermark: ++watermark,
          from: 'bot'
        })
      })
    })
  })

  http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`)
  })
}

// const defaultOptions = {
//   mongoURI: 'mongodb://localhost/superscriptDB',
//   importFile: null,
//   factSystem: {
//     clean: false,
//     importFiles: null,
//   },
//   scope: {},
//   editMode: false,
//   pluginsPath: `${process.cwd()}/plugins`,
//   logPath: `${process.cwd()}/logs`,
//   useMultitenancy: false,
//   messagePluginsPath: null,
//   conversationTimeout: 1000 * 300,
// };

superscript.setup(options, (err, botInstance) => {
  if (err) console.error(err)

  botHandle(null, botInstance)
})
