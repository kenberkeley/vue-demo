<template src="./msg-list.html"></template>
<script>
import DisplayControl from './DisplayControl'
import NoticeBar from './NoticeBar'
import Pagination from './Pagination'
import OptBtnGroup from 'COMPONENT/Msg/OptBtnGroup'
import msgService from 'SERVICE/msgService'

export default {
  // 都是绝对私有的组件
  components: { DisplayControl, NoticeBar, OptBtnGroup, Pagination },

  route: {
    // 路由变化则重取数据
    data () {
      this.fetchMsg()
    }
  },

  // 由于有了上面的route.data，此处无需手动初始化请求数据
  // ready () { this.fetchMsg() },

  data () {
    return {
      msgs: [],
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
      console.info('[MsgList:XHR] 获取 msg 列表')

      this.pageIdx = this.pageIdx < 1 ? 1 : this.pageIdx + optNum
      this.quantity = ~~this.quantity || 10

      msgService
        .fetch({
          author: this.$route.query.author,
          pageIdx: this.pageIdx,
          quantity: this.quantity
        })
        .then(msgs => this.msgs = msgs)
    }
  },

  events: {
    /**
     * 由于OptBenGroup封装成组件，因此删除后需要通知父组件更新视图
     * @param {Number} idx
     */
    DELETE_MSG (idx) {
      console.info('[MsgList:Event] 收到 DELETE_MSG 事件')

      let target = this.msgs[idx]
      this.msgs.$remove(target)
      // $remove是Vue在Array.prototype中添加的便捷函数

      // 若要事件继续往上传递，需要显示返回true
      // return true // 不过显然这里不需要继续往上传递
    }
  }
}  
</script>
