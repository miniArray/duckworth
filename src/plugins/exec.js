const table = {
  "battery saver": "ms-settings:batterysaver",
  "battery settings": "ms-settings:batterysaver-settings",
  "battery useage": "ms-settings:batterysaver-usagedetails",
  "bluetooth": "ms-settings:bluetooth",
  "colors": "ms-settings:colors",
  "data usage": "ms-settings:datausage",
  "date and time": "ms-settings:dateandtime",
  "closed captioning": "ms-settings:easeofaccess-closedcaptioning",
  "high contrast": "ms-settings:easeofaccess-highcontrast",
  "magnifier": "ms-settings:easeofaccess-magnifier",
  "narrator": "ms-settings:easeofaccess-narrator",
  "keyboard": "ms-settings:easeofaccess-keyboard",
  "mouse": "ms-settings:easeofaccess-mouse",
  "other options (ease of access)": "ms-settings:easeofaccess-otheroptions",
  "lockscreen": "ms-settings:lockscreen",
  "offline maps": "ms-settings:maps",
  "airplane mode": "ms-settings:network-airplanemode",
  "proxy": "ms-settings:network-proxy",
  "vpn": "ms-settings:network-vpn",
  "notifications & actions": "ms-settings:notifications",
  "account info": "ms-settings:privacy-accountinfo",
  "calendar": "ms-settings:privacy-calendar",
  "contacts": "ms-settings:privacy-contacts",
  "other devices": "ms-settings:privacy-customdevices",
  "feedback": "ms-settings:privacy-feedback",
  "location": "ms-settings:privacy-location",
  "messaging": "ms-settings:privacy-messaging",
  "microphone": "ms-settings:privacy-microphone",
  "motion": "ms-settings:privacy-motion",
  "radios": "ms-settings:privacy-radios",
  "speech, inking, & typing": "ms-settings:privacy-speechtyping",
  "camera": "ms-settings:privacy-webcam",
  "region & language": "ms-settings:regionlanguage",
  "speech": "ms-settings:speech",
  "windows update": "ms-settings:windowsupdate",
  "work access": "ms-settings:workplace",
  "connected devices": "ms-settings:connecteddevices",
  "for developers": "ms-settings:developers",
  "display": "ms-settings:display",
  "mouse & touchpad": "ms-settings:mousetouchpad",
  "cellular": "ms-settings:network-cellular",
  "dial-up": "ms-settings:network-dialup",
  "directaccess": "ms-settings:network-directaccess",
  "ethernet": "ms-settings:network-ethernet",
  "mobile hotspot": "ms-settings:network-mobilehotspot",
  "wi-fi": "ms-settings:network-wifi",
  "manage wi-fi settings": "ms-settings:network-wifisettings",
  "optional features": "ms-settings:optionalfeatures",
  "family & other users": "ms-settings:otherusers",
  "personalization": "ms-settings:personalization",
  "backgrounds": "ms-settings:personalization-background",
  "colors": "ms-settings:personalization-colors",
  "start": "ms-settings:personalization-start",
  "power & sleep": "ms-settings:powersleep",
  "proximity": "ms-settings:proximity",
  "display": "ms-settings:screenrotation",
  "sign-in options": "ms-settings:signinoptions",
  "storage sense": "ms-settings:storagesense",
  "themes": "ms-settings:themes",
  "typing": "ms-settings:typing",
  "tablet mode": "ms-settings:tabletmode",
  "privacy": "ms-settings:privacy",
  "upgrade1": "http://www.dell.com/en-us/shop/dell-32-ultrasharp-8k-monitor-up3218k/apd/210-alez/monitors-monitor-accessories",
  "upgrade2": "http://www.ebay.com/itm/SOLD-AS-IS-CRACKED-ASUS-VX228H-22-1080p-Ultra-Slim-Gaming-Monitor-1ms-/382030704586?hash=item58f2cdefca:g:TBYAAOSww3tY5EsH",
  "upgrade3": "http://www.dell.com/en-us/shop/dell-22-monitor-s2216h/apd/210-afut/monitors-monitor-accessories",
  "upgrade4": "http://www.dell.com/en-us/shop/serviceselection/210-afut"
}

exports.exec = function exec(setting, cb) {
  console.log(setting)
  setting = setting.toLowerCase()
    .replace('settings', '')
    .replace('setting', '')
    .replace('app', '')
    .trim()

  console.log(setting)

  const msg = `^addMessageProp('exec', '${table[setting]}')`
  console.log(msg)
  cb(null, msg)
}
