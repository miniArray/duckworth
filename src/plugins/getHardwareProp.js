const details = {
  ram: {
    meta: {
      icon: 'https://cdn1.iconfinder.com/data/icons/network-devices/64/ram-card-512.png'
    },
    spec: {
      make: "Samsung",
      ammount: "8 GB",
      speed: "1333mhz",
      model: "M393A4K40BB1",
      form: "288-PIN RDIMM"
    }
  },
  display: {
    meta: {
      icon: 'http://orig05.deviantart.net/4c93/f/2011/042/6/a/monitor_icon_by_ducky108-d39bda2.png'
    },
    spec: {
      make: "Dell",
      resolution: "1920 x 1080",
      rate: "75Hz",
      speed: "6 milliseconds",
      model: "SE2717HX",
    }
  }
}

exports.getHardwareProp = function getHardwareProp (type, part, cb) {
  const memory = this.user.memory
  const userId = this.user.id

  if (typeof(part) === 'function') {
    cb = part

    memory.db.get({ subject: 'hardware', predicate: userId }, (err, results) => {
      let part = results[0].object.replace("'", '')
      cb(err, determine(part, type))
    })
  } else {
    cb(null, determine(part, type))
  }
}

function determine (part, type) {
  let message = ''

  const addObj = `^addMessageProp('details', ${JSON.stringify(details[part])})`

  switch (type) {
    // case "ammount":
    //   message = `You have ${details[part].spec[type]} of ${part}. ${addObj}`
    //   break
    case "resolution":
      message = `Your ${part} has a resolution of ${details[part].spec[type]}`
      break
    case "details":
      message = `Right, here is a more detailed look at your ${part}. ${addObj}`
      break
  }

  return message
}
