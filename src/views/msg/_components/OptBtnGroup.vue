<template>
  <div class="btn-group" :class="{ 'btn-group-xs': smallSize }">
    <a v-link="`/msg/update/${msgId}`" class="btn btn-default">
      <i class="fa fa-pencil m-r-5"></i>
      编辑
    </a>
    <button @click="handleDel" class="btn btn-warning">
      <i class="fa fa-times m-r-5"></i>
      删除
    </button>
  </div>
</template>
<script>
import msgService from 'SERVICE/msgService'
import updateQuery from 'MIXIN/updateQuery'

export default {
  mixins: [updateQuery],
  props: {
    msgId: { type: String, required: true },
    autoJump: { type: Boolean, default: false },
    smallSize: { type: Boolean, default: false }
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
        
        let { msgId } = this
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
