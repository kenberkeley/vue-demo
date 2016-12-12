<template>
  <select v-model="model" :multiple="conf.multiple" :style="{ width: conf.width || '100%' }">
    <option v-for="opt in options"
      :value="opt[valueField] || opt.id || opt.type || opt.value || 'NO_VALUE'">
      <template v-if="conf.showValInText">
        ({{ opt[valueField] || opt.id || opt.type || opt.value || 'NO_VALUE' }})
      </template>
      {{ opt[textField] || opt.title || opt.text || opt.name || 'bug：无值' }}
    </option>
  </select>
</template>
<script>
/**
 * 对 Select2 的封装
 * @props {String/Array} model   必须 .sync
 * @props {String}       models  必须 .sync，仅在多选时有效
 * @props {Array}    options，格式形如 [{ id: 1, name: 'haha' }]
 * @props {String}   valueField 非必须，默认 'id / type / value'
 * @props {String}   textField  非必须，默认 'title / text / name'
 * @props {Object}   config  配置参数，非必须，见
 *  https://select2.github.io/examples.html
 */
export default {
  props: {
    model: { twoWay: true, default: () => [] },
    models: { twoWay: true, default: '' },
    options: { type: Array, required: true },
    valueField: String,
    textField: String,
    config: { type: Object, default: () => ({}) }
  },
  computed: {
    conf () {
      return {
        allowClear: true, // 显示清空叉叉
        /* 上面是默认配置 */
        ...this.config
      }
    }
  },
  attached () { // 挂载 DOM 后初始化
    this.init()

    // 这虽然有点反规范，但却非常实用
    this.conf.autoInit && this.$parent.init && this.$parent.init()
  },
  watch: {
    options () { // 动态 options 需重新渲染
      this.init()
    },
    model (v) { // 父组件 model 变动需重新渲染
      this.init()
      this.syncModelToModels()
    },
    models (v) {
      this.syncModelsToModel()
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        const $el = $(this.$el)
        $el.select2(this.conf)
        $el.on('change', () => this.model = $el.val())
      })
    },
    // 多选框的值同步 model => models
    syncModelToModels () {
      if (!this.config.multiple) return

      // 清空会导致 model 变成 null，需要兜底
      if (!this.model) this.model = []
      this.models = this.model.join(',')
    },
    // 多选框的值同步 models => model
    syncModelsToModel () {
      if (!this.config.multiple) return
      this.model = this.models.split(',')
    }
  }
  // events: {
  //   RESET_SELECT () {
  //     // 注意：这里仅重置样式，model/models 需要父组件自行重置
  //     this.$nextTick(() => this.init())
  //   }
  // }
}
</script>
