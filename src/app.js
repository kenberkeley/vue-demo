/* 启动文件 */
import 'COMPONENT/globalize' // 需要全局化的组件
import './directives/'
import './filters/'
import router from './routes/'
import App from 'COMPONENT/App'

// 把根组件挂载到id为app的DOM上
router.start(App, '#app')

/**
 * 根据https://github.com/vuejs/vue-devtools#NOTES
 * Vue 1.0.18以上版本需要加入下面一行代码以启用devtools
 * 生产环境下记得注释掉
 */
// Vue.config.devtools = true
