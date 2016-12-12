/**
 * 按需全局化过滤器
 */
import Vue from 'vue'

Vue.filter('dateTimeFormatter', require('./dateTimeFormatter').default)
