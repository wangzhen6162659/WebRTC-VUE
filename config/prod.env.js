'use strict'
const system = require('./../build/system')
module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '"/api"',
  PLATFORM: '"MZJ"',
  SYSTEM_STATIC: '\'/' + system.assetsSubDirectory + '\'',
  SYSTEM_PREFIX: '\'' + system.name + '\'',
  SYSTEM_APP: '"dist"'
}
