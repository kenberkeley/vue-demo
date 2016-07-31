<template src="./opt-btn-group.html"></template>
<script>
import msgService from 'SERVICES/msgService'

/**
 * 该组件由MsgList与修改信息(/msg/detail/:msgId)所共用
 */
export default {
  props: ['isAuthor', 'msgId', 'index'],

  methods: {
    delMsg () {
      if (!confirm('确认删除？')) return
      
      msgService
        .del(this.msgId)
        .then(() => {
          console.info('OptBtnGroup dispatch DELETE_MSG')
          this.$dispatch('DELETE_MSG', { index: this.index })

          // 避免alert阻塞线程
          setTimeout(() => { alert('删除成功') })

          if (this.$route.path.startsWith('/msg/detail')) {
            // 若是在详情页，就要跳回msg首页
            this.$router.go('/msg')
          }
        })
    }
  }
}
</script>
