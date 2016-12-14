<template>
  <ul class="pagination m-t-0">
    <li :class="{ 'disabled': isFirstPage }"
      @click="turnPage(-1)">
      <a href="javascript:;">
        <i class="fa fa-arrow-left"></i>
      </a>
    </li>
    <li v-for="i in displayPageBtns" track-by="$index"
      :class="{ 'active': i === curPageIdx + 1 }">
      <a v-if="i" href="javascript:;" @click="handleClick(i)">
        {{ i }}
      </a>
      <a v-else>···</a>
    </li>
    <li :class="{ 'disabled': isLastPage }"
      @click="turnPage(1)">
      <a href="javascript:;">
        <i class="fa fa-arrow-right"></i>
      </a>
    </li>
  </ul>
</template>
<script>
import autoSyncWithQuery from 'MIXIN/autoSyncWithQuery'
/**
 * 表格分页
 * @props total 记录总数
 * TODO：bug with limit
 */
export default {
  mixins: [autoSyncWithQuery],
  ready () {
    this.autoSyncWithQuery()
  },
  props: {
    total: { type: Number, required: true }
  },
  data: () => ({ offset$: 0 }),
  computed: {
    limit () { // 默认每页显示 5 条记录
      return +this.$route.query.limit || 5
    },
    isFirstPage () { // 若是第一页就禁用“上一页”按钮
      return +this.offset$ === 0 || this.limit >= this.total
    },
    isLastPage () { // 没有下一页则禁用“下一页”按钮
      return +this.offset$ + this.limit >= this.total
    },
    totalPageIdx () {
      return Math.ceil(this.total / this.limit) - 1
    },
    curPageIdx () {
      return Math.ceil(+this.offset$ / this.limit)
    },
    // 只能显示 9 个按钮，包括两个[上一页][下一页]，因此只计算 7 个按钮
    displayPageBtns () {
      let n = this.totalPageIdx + 1 // 总页数 为 总页索引加 1
      let i = this.curPageIdx + 1 // 当前页数 为 当前索引加 1

      // 0 表示 '···' 占位符
      if (n <= 7)
        return (n => {
          let arr = []
          while (n) { arr.unshift(n--) }
          return arr
        })(n)

      if (i <= 3 || n - i < 3)
        return [1, 2, 3, 0, n - 2, n - 1, n]

      if (i === 4)
        return [1, 2, 3, 4, 0, n - 1, n]

      if (i === n - 3)
        return [1, 2, 0, i, n - 2, n - 1, n]

      return [1, 0, i - 1, i, i + 1, 0, n]
    }
  },
  methods: {
    handleClick (n) {
      this.offset$ = (n - 1) * this.limit
    },
    turnPage (i) {
      // 设置 class 为 disabled 并不能阻止 @click 
      if (i < 0 && this.isFirstPage || i > 0 && this.isLastPage) return
      this.offset$ = +this.offset$ + i * this.limit
    }
  }
}
</script>
