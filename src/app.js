/* 启动文件 */
import Vue from 'vue'
import './directives/'
import './filters/'
import router from './routes/'
import App from 'COMPONENT/App'

// 把根组件挂载到 id 为 app 的 DOM 上
router.start(App, '#app')

/**
 * 根据 https://github.com/vuejs/vue-devtools#NOTES
 * Vue 1.0.18 以上版本需要如下配置 devtools
 */
if (__DEV__) {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = true
}

if (__PROD__) {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}
