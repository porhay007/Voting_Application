const fs = require('fs')

exports.readFile = function (pathname) {
  return new Promise((resovle, reject) => {
    fs.readFile(pathname, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      }
      resovle(data)
    })
  })
}

exports.writeFile = function (pathname, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(pathname, data, err => {
      if (err) {
        reject(err)
      }
      resolve('write to' + pathname + 'sucessfully')
    })
  })
}
