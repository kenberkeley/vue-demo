// 官方文档 http://vuejs.github.io/vue-validator/zh-cn/

// 对于使用 Webpack Code-Splitting 的项目存在如下问题
// https://github.com/vuejs/vue-validator/issues/130
// 
// 因此解决方案是，组件内部需要用到表单验证才引入本文件：
// import 'VALIDATOR' // Webpack 路径别名

import Vue from 'vue'
import VueValidator from 'vue-validator'

// 保持单例避免重复
if (!Vue.validator) {
  Vue.use(VueValidator)

  /** 下面是自定义验证规则 **/

  /* 打印 Vue.options.validators 可知原生自带
    min max minlength maxlength pattern required */

  Vue.validator('email', {
    message: '邮件格式有误',
    check: function (val) {
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
    }
  })
}
