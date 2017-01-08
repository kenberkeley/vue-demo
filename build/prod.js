require('es6-promise').polyfill();
var fs = require('fs-extra'),
  webpack = require('webpack'),
  I18nPlugin = require('i18n-webpack-plugin'),
  PATHS = require('./config/PATHS'),
  runGulpTasks = require('./gulpfile'),
  i18n = require(PATHS.ROOT.join('i18n')),
  config = require('./webpack.prod.conf');

var langs = Object.keys(i18n);
var indexHtml = PATHS.DIST.join('index.html');

fs.emptyDirSync(PATHS.DIST); // 清空 build 目录
fs.copySync(PATHS.SRC.join('index.html'), indexHtml);
fs.copySync(PATHS.STATIC, PATHS.DIST.join('static'));

runGulpTasks().then(function () {
  return new Promise(function (resolve) {
    langs.forEach(function (lang, idx) {
      var conf = Object.assign({}, config);
      conf.output.path = PATHS.DIST.join(lang);
      conf.plugins.unshift(new I18nPlugin(i18n[lang]));

      webpack(conf, function (err, stats) {
        if (err) return console.error(err);
        if (idx === langs.length - 1) resolve();
        console.info(stats.toString({ chunks: false, color: true }));
      });
    });
  });
}).then(function () {
  fs.remove(indexHtml);
  fs.remove(PATHS.DIST.join('static/plugins'));
});
