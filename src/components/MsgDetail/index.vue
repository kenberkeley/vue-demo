<template src="./msg-detail.html"></template>
<script>
import OptBtnGroup from 'COMPONENT/OptBtnGroup/'
import msgService from 'SERVICE/msgService'

export default {
  components: { OptBtnGroup },

  // 设置默认值（Vue不会像Angular那样吞掉异常）
  data () {
    return {
      msg: {}
    }
  },

  // 初始化：根据msgId请求msg内容
  ready () {
    msgService
      .fetch({
        msgId: this.$route.params.msgId
      })
      .then((msg) => {
        this.msg = msg
      })
  },

  methods: {
    /**
     * 返回前一个路由
     */
    goBack () {
      history.back()
    }
  }
}
</script>
