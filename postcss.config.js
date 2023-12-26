const nested = require('postcss-nested')
const cssnano = require('cssnano')
const simplevars = require('postcss-simple-vars')
const pandacss = require('@pandacss/dev/postcss')

module.exports = {
  modules: true,
  plugins: [simplevars(), nested(), cssnano(), pandacss()]
}
