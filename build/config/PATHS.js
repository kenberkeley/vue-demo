var path = require('path');

/**
 * 便捷求取路径
 * @param  {String} target
 * @return {String} path to target
 */
String.prototype.join = function (target) {
  return path.join(this.toString(), target);
};

var ROOT = path.resolve(__dirname, '../..'); // 项目根目录

module.exports = {
  ROOT: ROOT,
  BUILD: ROOT.join('build'),                 // 构建工具配置目录
  DIST: ROOT.join('dist'),                   // build 后输出目录
  MOCK: ROOT.join('mock'),                   // Mock Server 目录
  SRC: ROOT.join('src'),                     // 源码目录
  STATIC: ROOT.join('static')                // 高度静态资源目录
};
