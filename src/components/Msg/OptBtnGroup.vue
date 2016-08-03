<template>

  <div role="group" class="btn-group btn-group-xs pull-right">
    <slot name="detailMsgBtn"></slot>
    <slot name="goBackBtn"></slot>
    <a v-if="isAuthor"
      class="btn btn-warning"
      v-link="{ name: 'modifyMsg', params: { msgId: msg.id } }"
      @click.stop>
      修改
    </a>
    <button v-if="isAuthor"
      class="btn btn-danger"
      @click="delMsg">
      删除
    </button>
  </div>
  
</template>

<script>
import msgService from 'SERVICE/msgService'
/* 该组件由MsgList与MsgDetail所共用 */
export default {
  props: ['msg', 'index', 'parentName'],

  computed: {
    isAuthor () {
      let { userData } = this.$root
      return userData && userData.username === this.msg.author
    }
  },

  methods: {
    delMsg () {
      if (!confirm('确认删除？')) return
      
      msgService
        .del(this.msg.id)
        .then(() => {
          // 根据父组件执行不同动作
          switch (this.parentName) {
          case 'MsgList':
            // 通知MsgList更新列表
            console.info(`[OptBtnGroup:Event] 派发 DELETE_MSG 事件，通知 MsgList 删掉索引为 ${this.index} 的 msg`)
            this.$dispatch('DELETE_MSG', this.index)
            break
          case 'MsgDetail':
          default:
            // 若是在详情页，则需要跳回msg首页
            console.info('[OptBtnGroup:Route] 跳转到 /msg ')
            this.$router.replace('/msg')
            break
          }
        })
    }
  }
}
</script>
