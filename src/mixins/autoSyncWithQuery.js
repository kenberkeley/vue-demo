import updateQuery from 'MIXIN/updateQuery'
/**
 * 引入本 mixin 的组件
 * 相应字段须以 $ 结尾
 * 并须在 ready 内调用：
 * this.autoSyncWithQuery()
 * 此时参数 isInvokedByMe 为 undefined
 * 会执行【本地变量 => query】代码一次
 *
 * 注：【query => 本地变量】赋值类型为 String
 */
export default {
  mixins: [updateQuery],
  data: () => ({ specialFields: [] }),
  watch: {
    '$route.query' () {
      // query => 本地变量
      this.autoSyncWithQuery(true)
    }
  },
  methods: {
    getSpecialFields () {
      var specialFields = []
      for (var field in this.$data) {
        field.endsWith('$') &&
        specialFields.push(field.replace(/\$$/, ''))
      }
      return specialFields
    },
    autoSyncWithQuery (isInvokedByMe) {
      const { query } = this.$route

      if (!this.specialFields.length)
        this.specialFields = this.getSpecialFields()

      this.specialFields.forEach(field => {
        if (query[field])
          this[`${field}$`] = query[field]
        
        if (isInvokedByMe) return
        // 本地变量 => query
        this.$watch(`${field}$`, function (v) {
          this.updateQuery({ [field]: v })
        }/* , { immediate: true }*/)
      })
    }
  }
}

// 考虑到 String.prototype.endsWith 为 ES6 新特性，
// 建议此处引入 Polyfill 保证兼容性：
// https://github.com/mathiasbynens/String.prototype.endsWith
