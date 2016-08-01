<template src="./msg-list.html"></template>
<script>
import OptBtnGroup from 'COMPONENT/OptBtnGroup/'
import msgService from 'SERVICE/msgService'

export default {
  components: { OptBtnGroup },

  route: {
    // 路由变化则重取数据
    data () {
      this.fetchMsg()
    }
  },

  // 由于有了上面的route.data，此处无需手动初始化请求数据
  // ready () {
  //   this.fetchMsg()
  // },

  data () {
    return {
      msgs: [],

      // 分页采用“无限刷新”形式
      pageIdx: 1, // 默认当前是第1页
      quantity: 10 // 默认每页10条
    }
  },

  methods: {
    /**
     * 根据条件取msg
     * @param  {Number} optNum 需要操作的页数（可正可负）
     * e.g. 当前页pageIdx为2，若fetchMsg(-1)，则pageIdx变为1
     */
    fetchMsg (optNum = 0) {
      this.pageIdx = this.pageIdx < 1 ? 1 : this.pageIdx + optNum
      this.quantity = ~~this.quantity || 10

      msgService
        .fetch({
          author: this.$route.query.author,
          pageIdx: this.pageIdx,
          quantity: this.quantity
        })
        .then((msgs) => {
          this.msgs = msgs
        })
    }
  },

  events: {
    /**
     * 由于OptBenGroup封装成组件，因此删除后需要通知父组件更新视图
     * @param {Number} [object].index msgId
     */
    DELETE_MSG ({ index }) {
      console.info('MsgList on DELETE_MSG')

      let target = this.msgs[index]
      this.msgs.$remove(target)
      // $remove是Vue在Array.prototype中添加的便捷函数
    }
  }
}  
</script>
