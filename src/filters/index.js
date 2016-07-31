/**
 * 此处须把所有过滤器全局化
 */
import Vue from 'vue'
import dateTimeFormatter from './dateTimeFormatter'

Vue.filter('dateTimeFormatter', dateTimeFormatter)
