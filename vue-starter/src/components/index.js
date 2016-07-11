import Vue from 'vue'

// 部分组件需要全局化的，在这里引入
// P.S 为了lazyLoad，请勿把所有组件都全局化

Vue.component('navbar', require('./navbar/'))
