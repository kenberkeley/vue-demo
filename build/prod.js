var fs = require('fs-extra'),
  webpack = require('webpack'),
  gulp = require('./gulpfile'),
  PATHS = require('./config/PATHS'),
  config = require('./webpack.prod.conf');

// 避免 html-minifier 省去 HTML 属性引号而引起的 bug
config.vue.loaders.html = 'vue-html?minimize=true&removeAttributeQuotes=false';

fs.emptyDirSync(PATHS.DIST); // 清空 build 目录
fs.copySync(PATHS.STATIC, PATHS.DIST.join('static')); // 复制高度静态资源
fs.copySync(PATHS.DOCS.join('_book'), PATHS.DIST.join('docs')); // 复制文档

webpack(config, function(err, stats) {
  // show build info to console
  console.log(stats.toString({ chunks: false, color: true }));

  // save build info to file
  // fs.writeFile(
  //   PATHS.DIST.join('__build_info__'),
  //   stats.toString({ color: false })
  // );

  // bundle plugins
  gulp.start('default');
});
