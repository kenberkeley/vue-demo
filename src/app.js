/* 启动文件 */
import Vue from 'vue'
import 'COMPONENT/globalize' // 需要全局化的组件
import './directives/'
import './filters/'
import router from './routes/'
import App from 'COMPONENT/App'

// 把根组件挂载到id为app的DOM上
router.start(App, '#app')

/**
 * 根据https://github.com/vuejs/vue-devtools#NOTES
 * Vue 1.0.18以上版本需要如下配置devtools
 */
if (__DEV__) {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = true
}

if (__PROD__) {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}
