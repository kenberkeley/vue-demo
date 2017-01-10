/**
 * @export {gulp}
 * 1. gulp.start('default')
 * 2. 命令行执行 gulp
 */
var gulp = require('gulp'),
  fs = require('fs-extra'),
  rev = require('gulp-rev'),
  csso = require('gulp-csso'),
  debug = require('gulp-debug'),
  filter = require('gulp-filter'),
  uglify = require('gulp-uglify'),
  useref = require('gulp-useref'),
  replace = require('gulp-replace'),
  revReplace = require('gulp-rev-replace'),
  i18n = require('./i18n/'),
  PATHS = require('./config/PATHS');

// 合并压缩打包 index.html 中 build 标签内的资源
gulp.task('bundle', function () {
  var jsFilter = filter('**/*.js', { restore: true }),
    cssFilter = filter('**/*.css', { restore: true }),
    userefAssets = useref.assets();

  return gulp.src(PATHS.I18N_SRC.join('index.html'))
    .pipe(userefAssets)
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(rev())
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest(PATHS.I18N_SRC));
});

// 由于插件均被合并压缩打包，故可删除以减少生产环境下的文件量
gulp.task('clean', ['bundle'], function () {
  fs.remove(PATHS.DIST.join('static/plugins'));
});

// 国际化
gulp.task('i18n', ['bundle', 'clean'], function () {
  var langs = Object.keys(i18n);
  var reg = /_#(.*?)#_/g;
  
  langs.forEach(function (lang) {
    var targetDir = PATHS.DIST.join(lang);
    fs.copySync(PATHS.I18N_SRC, targetDir);

    gulp.src(['*.js', '!mainifest.*.js', '!vendor.*.js'], { cwd: targetDir })
      .pipe(debug({ title: 'translating ' + lang + ' :' }))
      .pipe(replace(reg, function (match, target) {
        if (lang === 'zh-cn') return target; // 中文无需翻译
        
        var translation = i18n[lang][target];
        return translation ? translation
          : console.log(match, ' is not translated\n') || target;
      }))
      .pipe(gulp.dest(targetDir));
  });
});

gulp.task('default', ['i18n']);

if (module.parent) {
  module.exports = gulp;
} else {
  gulp.start('default');
}
