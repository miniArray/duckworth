import Subsonic from './subsonic'

const subsonic = new Subsonic({
  username: 'simonwjackson',
  password: 'Magn0v0X',
  server: 'http://goomba.mynetgear.com:7007',
  application: 'subsonic node.js api', // optional
  format: 'json', // optional
  version: 1.14, // optional
  show_file: true
})

subsonic.search('ttng').then(console.log)
