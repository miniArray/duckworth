import Subsonic from '../subsonic'

const subsonic = new Subsonic({
  username: 'simonwjackson',
  password: 'Magn0v0X',
  server: 'goomba.mynetgear.com:7007',
  application: 'subsonic node.js api', // optional
  format: 'json', // optional
  version: 1.14 // optional
})

export function music (type, query, cb) {
  subsonic.album(query).then(album => {
    cb(null, {
      meta: { album }
    })
  })
}
