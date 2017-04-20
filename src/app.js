/* 启动文件 */
import 'es6-shim'
import '@/assets/css/common.css'
import Vue from 'vue'
import '@/filters/'
import router from '@/routes/'
import App from '@/components/App'
import authService from '@/services/authService'

// 先检测登录状态再挂载根组件以便控权
authService.checkLogin().then(userData => {
  if (userData) {
    const data = App.data // data 属性是一个函数
    App.data = () => ({ ...data(), userData })
  }
  // 挂载到 DOM，自此外部就可通过 router.app 访问到根组件
  router.start(App, '#app')
})

if (__DEV__) {
  console.info('[当前环境] 开发环境')
  Vue.config.devtools = true
}

if (__PROD__) {
  console.info('[当前环境] 生产环境')
  Vue.config.devtools = false
}

// === 以下是 Webpack 处理其他 assets 的测试，取消注释即可进行测试 === //
/* 处理 less / sass */
// import '@/assets/less/normalize.less'
// import '@/assets/scss/normalize.scss'

/* 处理 img，小于 10KB 的转为 base64，否则使用 URL */
// import base64 from '@/assets/img/smaller.png'
// import url from '@/assets/img/larger.png'

// appendImgToBody(base64)
// appendImgToBody(url)

// function appendImgToBody(content) {
//   const img = document.createElement('img')
//   img.src = content
//   document.body.appendChild(img)
// }
