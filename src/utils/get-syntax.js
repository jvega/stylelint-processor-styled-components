const getLang = require('postcss-syntax/get-lang')

module.exports = (path, source) => {
  const { lang, extract } = getLang(path, source) || { lang: 'css' }
  return extract || lang
}
