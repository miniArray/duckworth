exports.del = function del(key, cb) {
  const memory = this.user.memory
  const userId = this.user.id

  memory.db.get({ subject: key, predicate: userId }, (err, results) => {
    console.log()

    memory.db.del(results[0], (err, res) => {
      console.log(err, res)

      memory.db.get({ subject: 'name'}, (err, results) => {
        console.log(results)
      })
      cb(null, '')
    })
  })
}
