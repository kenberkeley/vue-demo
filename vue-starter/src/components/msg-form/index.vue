<template src="./msg-form.html"></template>
<script>
import msgService from 'SERVICES/msgService'
import userService from 'SERVICES/userService'

/**
 * 该组件由新增信息(/msg/add)与修改信息(/msg/modify/:msgId)所共用
 * 为区分状态，使用isModMsg来标识
 */
export default {
  route: { canReuse: false },

  data () {
    return {
      msg: {},
      isModMsg: false
    }
  },

  ready () {
    // 初始化：非修改页面状态下，毋须远程取消息
    if (!this.$route.path.startsWith('/msg/modify')) return

    this.isModMsg = true // 设置正在处于修改页面的标识

    msgService
      .fetch({
        msgId: this.$route.params.msgId
      })
      .then((msg) => {
        // 虽说后端会有过滤，但还是要严谨一点
        if (!msg || msg.author !== userService.data.username) {
          setTimeout(() => { alert('非法访问') }) // 避免alert阻塞线程
          return this.$router.replace('/msg')
        }

        this.msg = msg
      })
  },

  methods: {
    /**
     * 根据标识位进行请求（最后都跳转到详情页）
     */
    addOrModMsg () {
      let opt = this.isModMsg ? 'mod' : 'add'

      msgService[opt](this.msg)
        .then(this.jumpToDetailMsg)
    },

    /**
     * 跳转到详情页
     * @param  {Number} [object].id  msgId
     */
    jumpToDetailMsg ({ id }) {
      this.$router.go({
        name: 'detailMsg',
        params: { msgId: id }
      })
    },

    /**
     * 返回上一页
     */
    goBack () {
      history.back()
    }
  }
}
</script>
