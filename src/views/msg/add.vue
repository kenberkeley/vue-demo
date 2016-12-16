<template>
  <div>
    <msg-form :msg.sync="msg">
      <button slot="opt" @click="handleSubmit"
        type="button" class="btn btn-default">
        <i class="fa fa-check"></i>
      </button>
    </msg-form>    
  </div>
</template>
<script>
import MsgForm from './_components/MsgForm'
import msgService from 'SERVICE/msgService'

export default {
  components: { MsgForm },
  data: () => ({ msg: { title: '', content: '' } }),
  methods: {
    handleSubmit () {
      msgService.add(this.msg).then(({ id }) => {
        $.toast({
          heading: '发布成功',
          text: '已自动跳转到详情页',
          icon: 'success'
        })
        this.$router.replace(`/msg/detail/${id}`)
      })
    }
  }
}
</script>
