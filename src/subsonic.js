var request = require('superagent-promise')(require('superagent'), Promise)

// Subsonic
class Subsonic {
  // Subsonic
  //
  // @param  {object} config username, password, server are all required (application, format, and version optional)
  // @return {Subsonic} this
  constructor(config) {
    ;({
      username: this.username,
      password: this.password,
      server: this.server,
      application: this.application,
      format: this.format,
      version: this.version,
      show_file: this.show_file
    } = config)

    if (!this.application) this.application = 'subsonic node.js api'
    if (!this.format) this.format = 'json'
    if (!this.show_file) this.show_file = false
    if (!this.version) this.version = '1.7'

    return this
  }

  // get
  //
  // @param  {string}   path
  // @param  {object}   query
  // @param  {function} callback err, response
  // @return {Subsonic} this
  get(path, query, cb) {
    cb = arguments[arguments.length - 1]

    return request
      .get(`${this.server}/rest/${path}.view`)
      .query({
        u: this.username,
        p: this.password,
        c: this.application,
        v: this.version,
        f: this.format
      })
      .query(typeof query !== 'function' ? query : undefined)
      .end()
      .then(res => res.body['subsonic-response'])
  }

  // http://your-server/rest/ping.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  ping(cb) {
    return this.get('ping', response => cb(null, response))
  }

  // http://your-server/rest/getMusicFolders.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  topLevelFolders(cb) {
    return this.get('getMusicFolders', res => cb(null, res.musicFolders.musicFolder))
  }

  // http://your-server/rest/getIndexes.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  indexes(cb) {
    return this.get('getIndexes', res => cb(null, res.indexes.index))
  }

  // http://your-server/rest/getMusicDirectory.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  folder(id, cb) {
    return this.get('getMusicDirectory', { id }, response =>
      cb(null, {
        children: response.directory != null ? response.directory.child : undefined,
        id: response.directory != null ? response.directory.id : undefined,
        name: response.directory != null ? response.directory.name : undefined
      })
    )
  }

  // http://your-server/rest/getArtists.view
  //
  // @param  {function} callback err, response
  // @return {Subsonic} this
  artists(cb) {
    return this.get('getArtists', res => cb(null, res.artists.index))
  }

  // http://your-server/rest/getArtist.view
  //
  // @param  {number} id
  // @return {Subsonic} this
  artist(id, cb) {
    return this.get('getArtist', { id }).then(res => res.album)
  }

  // http://your-server/rest/getAlbum.view
  //
  // @param  {number} id
  // @return {Subsonic} Promise
  album(id) {
    return this.get('getAlbum', { id }).then(res => res.album)
  }

  // http://your-server/rest/getAlbum.view
  //
  // @param  {number} id
  // @return {Subsonic} Promise
  search(
    query,
    artistCount = 20,
    artistOffset = 0,
    albumCount = 20,
    albumOffset = 0,
    songCount = 20,
    songOffset = 0,
    musicFolderId
  ) {
    return this.get('search3', {
      query,
      artistCount,
      artistOffset,
      albumCount,
      albumOffset,
      songCount,
      songOffset,
      musicFolderId
    }).then(res => res.searchResult3)
  }

  // http://your-server/rest/getSong.view
  //
  // @param  {number} id
  // @param  {function} callback err, response
  // @return {Subsonic} this
  song(id, cb) {
    return this.get('getSong', { id }, res => cb(null, res.song))
  }

  // http://your-server/rest/createShare.view
  //
  // @param  {number} id
  // @param  {number} expires date share should expire in epoch time (ms since 1970) (optional)
  // @param  {function} callback err, response
  // @return {Subsonic} this
  createShare(id, expires, cb) {
    if (typeof expires === 'function') {
      cb = expires.bind({})
      // valid for 1 hour
      expires = Date.now() / 1000 + 3600
    }
    return this.get('createShare', { id, expires }, function(res) {
      if (!res.shares) {
        return cb('No share found')
      }
      return cb(null, res.shares.share)
    })
  }

  v() {
    return '0.0.4'
  }
}

export default Subsonic
