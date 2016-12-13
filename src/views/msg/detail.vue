<template>
{{ msg | json }}
</template>
<script>
import msgService from 'SERVICE/msgService'

export default {
  route: {
    activate ({ next, redirect }) {
      let msgId = $.trim(this.$route.params.msgId)

      if (!msgId || msgId[0] === ':') {
        window.swal({
          type: 'info',
          title: '本页面不能直接点击访问',
          text: '$route.params.msgId 为空',
          timer: 2500,
          showConfirmButton: false
        })
        return redirect('/msg')
      }

      msgService.getById(msgId).then(msg => this.msg = msg)

      next()
    }
  },
  data: () => ({ msg: {} })
}
</script>
