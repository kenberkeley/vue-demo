/**
 * 启动器文件
 */
import './components/'
import './directives/'
import './filters/'
import router from './routes/'
import app from './appx'

// 把根组件挂载到id为app的DOM上
router.start(app, '#app')

/*
  // https://github.com/vuejs/vue-devtools#NOTES
  Vue.config.devtools = true // v1.0.18+
 */
