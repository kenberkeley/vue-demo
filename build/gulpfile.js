/**
 * 把 index.html 中用标签引入的文件全部打包
 * @export {gulp} 使用方式 gulp.start('default')
 */
var gulp = require('gulp'),
  fs = require('fs-extra'),
  PATHS = require('./config/PATHS'),
  rev = require('gulp-rev'),
  csso = require('gulp-csso'),
  filter = require('gulp-filter'),
  uglify = require('gulp-uglify'),
  useref = require('gulp-useref'),
  revReplace = require('gulp-rev-replace'),
  config = require('./webpack.base.conf');

gulp.task('bundleExternalFiles', function () {
  var jsFilter = filter('**/*.js', { restore: true }),
    cssFilter = filter('**/*.css', { restore: true }),
    userefAssets = useref.assets();
  
  console.log('Webpack tasks finished, now run Gulp tasks...');

  return gulp.src(PATHS.DIST.join('index.html'))
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
    .pipe(gulp.dest(PATHS.DIST))
    .on('end', function () {
      gulp.start('clean');
    });
});

gulp.task('clean', function () {
  fs.extra(PATHS.DIST.join('static/plugins'));
});

gulp.task('default', ['bundleExternalFiles']);

if (module.parent) {
  module.exports = gulp;
} else {
  gulp.start('default');
}
