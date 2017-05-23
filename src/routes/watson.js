import { join } from 'path'
import { existsSync, statSync, createWriteStream, createReadStream } from 'fs'

const watson = require('watson-developer-cloud')
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1')
const textToSpeech = new TextToSpeechV1()

export default (req, res, next) => {
  const file = `${req.query.id}.wav`
  const filePath = join(__dirname, '..', 'public', 'sounds', 'voices', file)

  if (existsSync(filePath)) {
    console.log(filePath)
    const stat = statSync(filePath)

    res.writeHead(200, {
      'Content-Type': 'audio/wav',
      'Content-Length': stat.size,
      'content-disposition': `attachment; filename=${file}`
    })

    const readStream = createReadStream(filePath)
    readStream.pipe(res)
  }

  else {
    const transcript = textToSpeech.synthesize(req.query)
    const writeStream = createWriteStream(filePath)

    transcript.on('response', (response) => {
      response.headers['content-disposition'] = `attachment; filename=${file}`
    })

    transcript.on('error', next)
    transcript.on('end', next)

    transcript.pipe(writeStream)
    transcript.pipe(res)
  }
}
