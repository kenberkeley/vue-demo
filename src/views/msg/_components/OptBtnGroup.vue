<template>
  <div class="btn-group" :class="{ 'btn-group-xs': smallSize }">
    <slot><!-- 不具名插槽 --></slot>
    <template v-if="shouldShowOptBtn">
      <a v-link="`/msg/update/${msg.id}`" class="btn btn-default">
        <i class="fa fa-pencil m-r-5"></i>
        编辑
      </a>
      <button @click="handleDel" class="btn btn-warning">
        <i class="fa fa-trash-o m-r-5"></i>
        删除
      </button>
    </template>
  </div>
</template>
<script>
import msgService from 'SERVICE/msgService'
import updateQuery from 'MIXIN/updateQuery'

export default {
  mixins: [updateQuery],
  props: {
    msg: { type: Object, required: true },
    autoJump: { type: Boolean, default: false },
    smallSize: { type: Boolean, default: false }
  },
  computed: {
    // 显示操作按钮需要满足：1.已登录 2.当前用户是发布者
    shouldShowOptBtn () {
      const { userData } = this.$root
      if (!userData) return
      return userData.username === this.msg.author
    }
  },
  methods: {
    handleDel () {
      window.swal({
        title: '确认删除？',
        text: '删除后不可恢复',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonColor: '#DD6B55',
        confirmButtonText: '删除'
      }, v => {
        if (!v) return
        
        const { id: msgId } = this.msg
        msgService.del(msgId).then(() => {
          $.toast({ heading: '删除成功', icon: 'success' })
          this.autoJump
              // 跳回列表页面
            ? this.$router.replace('/msg')
              // 已在列表页面，触发 URL 变化以重刷列表
            : this.updateQuery({ _: Date.now() })
        })
      })
    }
  }
}
</script>
