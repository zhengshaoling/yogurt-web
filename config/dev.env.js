'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '""',
  UPLOADS_URL:'""', // 上传文件路径
  EDITOE_URL:'"/static/UEditor/"' // ueditor暂存文件路径
})
