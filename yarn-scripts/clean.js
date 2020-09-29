const fs = require('fs')
const DISTRIBUTE_PATH = 'dist'
const PACKAGE_PATH = 'package'
const INSTALLER_PATH = 'installer'

const PATHS = new Array(DISTRIBUTE_PATH, PACKAGE_PATH, INSTALLER_PATH)

function rmDirectory(path) {
  if (PATHS.includes(path)) {
    fs.rmdir('./' + path, { recursive: true }, (err) => {
      if (err) {
        throw err
      }
    })
  } else {
    throw new Error('One of these arguments should be passed; ' + PATHS.join(', '))
  }
}

const argument = process.argv[2] || undefined
rmDirectory(argument)
