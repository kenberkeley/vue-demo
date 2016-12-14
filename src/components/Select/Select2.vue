<template>
  <select v-model="model" :multiple="conf.multiple" :style="{ width: conf.width || '100%' }">
    <option v-for="opt in options" :value="opt[valueField]">
      {{ opt[textField] }}
    </option>
  </select>
</template>
<script>
/**
 * 对 Select2 的封装
 * @props {String/Array} model   必须 .sync
 * @props {String}       models  必须 .sync，仅在多选时有效
 * @props {Object[]}     options，格式形如 [{ value: 'v1', text: 'V1' }]
 * @props {String}       valueField 非必须，默认 'value'
 * @props {String}       textField  非必须，默认 'text'
 * @props {Object}       config  配置参数，非必须，见 https://select2.github.io/examples.html
 */
export default {
  props: {
    model: { twoWay: true, default: () => [] },
    models: { twoWay: true, default: '' },
    options: { type: Array, required: true },
    valueField: { type: String, default: 'value' },
    textField: { type: String, default: 'text' },
    config: { type: Object, default: () => ({}) }
  },
  computed: {
    conf () {
      return {
        allowClear: true,
        /* 以上是默认配置 */
        ...this.config
      }
    }
  },
  attached () {
    this.init()
  },
  watch: {
    options () {
      this.init()
    },
    model (v) {
      this.init()
      this.syncModelsWithModel()
    },
    models (v) {
      this.syncModelWithModels()
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
    syncModelsWithModel () {
      if (!this.config.multiple) return

      // 清空会导致 model 变成 null
      if (!this.model) this.model = []
      this.models = this.model.join(',')
    },
    syncModelWithModels () {
      if (!this.config.multiple) return
      this.model = this.models.split(',')
    }
  }
}
</script>
