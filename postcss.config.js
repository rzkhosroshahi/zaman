const nested = require('postcss-nested')
const cssnano = require('cssnano')
const simplevars = require('postcss-simple-vars')

module.exports = {
  modules: true,
  plugins: [simplevars(), nested(), cssnano()]
}
