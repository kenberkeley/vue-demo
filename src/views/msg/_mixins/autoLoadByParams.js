import msgService from 'SERVICE/msgService'

export default {
  route: {
    activate ({ next }) {
      msgService
        .fetchById(this.$route.params.msgId)
        .then(msg => {
          this.msg = msg
          this.$emit('MSG_LOADED')
          next()
        })
    }
  }
}
