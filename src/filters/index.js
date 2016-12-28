/**
 * 按需全局化过滤器
 * 您还可以在组件定义时的 filters 属性中按需引入
 */
import Vue from 'vue'

Vue.filter('dateTimeFormatter', require('./dateTimeFormatter').default)
