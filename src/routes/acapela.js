import { join, parse } from 'path'
import { existsSync, statSync, createWriteStream, createReadStream } from 'fs'
import jsonp from 'then-jsonp'
import mkdirp from 'mkdirp'
import request from 'request'

import hash from '../utils/hash'

export default async (req, res, next) => {
  const id = req.query.id || hash(req.query.text)
  console.log(id)
  const voice = req.query.voice
  const codec = 'mp3'
  const url = "http://vaas.acapela-group.com/Services/UrlMaker"
  const file = `${id}.${codec}`
  const filePath = join(__dirname, '..', '..', 'public', 'sounds', 'voices', 'acapela', voice, file)
  const baseDir = parse(filePath).dir

  const options = {
    callbackParameter: 'jsoncallback',
    qs: {
      prot_vers: 2,
      cl_login: process.env.CL_LOGIN,
      cl_app: process.env.CL_APP,
      cl_pwd: process.env.CL_PWD,
      req_voice: voice,
      req_snd_type: codec.toUpperCase(),
      req_text: `${req.query.text}`
    }
  }

  console.log(req.query)

  if (existsSync(filePath)) {
    const stat = statSync(filePath)

    res.writeHead(200, {
      'Content-Type': `audio/${codec}`,
      'Content-Length': stat.size,
      'content-disposition': `attachment; filename=${file}`
    })

    const readStream = createReadStream(filePath)
    readStream.pipe(res)
  }

  else {
    mkdirp.sync(baseDir)
    const result = await jsonp('GET', url, options)
    console.log(result)
    const writeStream = createWriteStream(filePath)

    console.dir(result, {depth:null})

    const response = request(result.snd_url)
    response.on('response', () => {
      res.writeHead(200, {
        'Content-Type': `audio/${codec}`,
        'Content-Length': result.snd_size,
        'content-disposition': `attachment; filename=${file}`
      })
    })
    response.on('error', next)
    response.pipe(writeStream)
    response.pipe(res)
  }
}
