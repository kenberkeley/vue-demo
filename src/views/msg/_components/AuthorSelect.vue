<template>
  <span class="dsp-tbl w-100pct">
    <label class="dsp-tbl-cell" style="width:8em">
      <i class="fa fa-filter"></i>
      筛选发布者：
    </label>
    <select2 class="dsp-tbl-cell"
      :models.sync="authors$"
      :options="opts"
      :config="{ multiple: true, placeholder: '请选择发布者...' }">
    </select2>
  </span>
</template>
<script>
import Select2 from 'COMPONENT/Select/Select2'
import autoSyncWithQuery from 'MIXIN/autoSyncWithQuery'
import msgService from 'SERVICE/msgService'

export default {
  mixins: [autoSyncWithQuery],
  components: { Select2 },
  data: () => ({ authors$: '', authorList: [] }),
  computed: {
    opts () {
      return this.authorList.map(
        author => ({ value: author, text: author })
      )
    }
  },
  ready () {
    this.autoSyncWithQuery()

    if (msgService.authorList)
      return this.authorList = msgService.authorList

    msgService.fetchAuthorList().then(authorList => {
      // 将数据缓存在服务中
      this.authorList = msgService.authorList = authorList
    })
  }
}
</script>
