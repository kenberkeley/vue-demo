import updateQuery from 'MIXIN/updateQuery'
import _difference from 'lodash/difference'
/**
 * 引入本 mixin 的组件，相应字段须以 $ 结尾
 * 并须在 ready 内调用：this.autoSyncWithQuery()
 *
 * 注：【query 同步到本地变量】这一步，赋值类型为 String
 */
export default {
  mixins: [updateQuery],
  // 须知：Vue 不代理前缀为 $ 或 _ 的变量，皆因这些变量会被视为私有变量
  data: () => ({ specialFields_: [] }),
  watch: {
    '$route.query' (curQuery, oldQuery) {
      const missingKeys = _difference(
        Object.keys(oldQuery),
        Object.keys(curQuery)
      )
      this.autoSyncWithQuery(missingKeys)
    }
  },
  methods: {
    _init () {
      let specialFields = []
      for (let origField in this.$data) {
        if (!origField.endsWith('$')) continue

        var field = origField.replace(/\$$/, '')
        specialFields.push(field)
        this._cache(origField)
        this._watch(origField, field)
      }
      this.specialFields_ = specialFields
    },
    // 缓存其默认值（例如 limit$ 默认值 5，对应使用 limit$$ 缓存 5）
    _cache (origField) {
      this.$data[`${origField}$`] = this[origField]
    },
    _restore(origField) {
      this[origField] = this.$data[`${origField}$`]
    },
    _watch (origField, field) {
      this.$watch(origField, function (v) {
        // 本地变量同步到 query
        this.updateQuery({ [field]: v })
      })
    },
    autoSyncWithQuery (missingKeys) {
      if (!missingKeys) this._init() // 初始化
      
      const { query } = this.$route
      this.specialFields_.forEach(field => {
        var origField = `${field}$`
        query[field] && (this[origField] = query[field]) // query 同步到本地变量
        missingKeys && missingKeys.includes(field) && this._restore(origField)
      })
    }
  }
}
