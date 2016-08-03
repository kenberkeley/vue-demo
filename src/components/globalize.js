// 需要全局化的组件，在这里引入
// 一般只有直接用在 index.html 上的组件才需要这样做
// P.S 为了lazyLoad，请勿把所有组件都全局化
import Vue from 'vue'

Vue.component('navbar', require('./Navbar/'))
