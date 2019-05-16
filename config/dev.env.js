'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const system = require('./../build/system')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"/api"',
  PLATFORM: '"MZJ"',
  SYSTEM_STATIC: '\'/' + system.assetsSubDirectory + '\'',
  SYSTEM_PREFIX: '\'' + system.name + '\'',
  SYSTEM_APP: '"dist"'
})
