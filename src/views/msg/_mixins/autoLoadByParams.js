import msgService from 'SERVICE/msgService'

export default {
  route: {
    activate ({ next, redirect }) {
      const { msgId } = this.$route.params

      if (msgId === ':msgId') {
        window.swal({
          type: 'info',
          title: '本页面不能直接点击访问',
          text: '$route.params.msgId 为空',
          timer: 2500
        })
        return redirect('/msg')
      }

      msgService.fetchById(msgId).then(msg => {
        this.msg = msg
        next()
      })
    }
  }
}
