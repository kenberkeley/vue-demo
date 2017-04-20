var extract = require('extract-text-webpack-plugin').extract,
  ENV = require('./ENV');

var basicLoaders = ['css'];
var LOADERS = {
  css: basicLoaders,
  less: basicLoaders.concat('less'),
  sass: basicLoaders.concat('sass?indentedSyntax=true'),
  scss: basicLoaders.concat('sass')
};

function ruleGen(ext, isForVueLoader) {
  var useLoaders = LOADERS[ext];
  if (isForVueLoader) return extract('vue-style', useLoaders.join('!'));

  // 开发环境下直接内嵌 CSS 以支持热替换
  if (ENV.__DEV__) return ['style'].concat(useLoaders).join('!');
  // 生产环境下分离出 CSS 文件
  return extract('style', useLoaders.join('!'));
}

function styleRulesGen(isForVueLoader) {
  var rules = isForVueLoader ? {} : [];
  Object.keys(LOADERS).forEach(function (ext) {
    isForVueLoader ?
      rules[ext] = ruleGen(ext, true) :
      rules.push({ test: new RegExp('\\.' + ext + '$'), loader: ruleGen(ext) });
  });
  return rules;
}

exports.basic = styleRulesGen();
exports.vueLoader = styleRulesGen(true);
