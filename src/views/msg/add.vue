<template>
  <div>
    <msg-form :msg.sync="msg">
      <button slot="submit" @click="handleSubmit"
        type="submit" class="btn btn-success">
        <i class="fa fa-check m-r-5"></i>
        确认提交
      </button>
    </msg-form>    
  </div>
</template>
<script>
import MsgForm from './_components/MsgForm'
import msgService from 'SERVICE/msgService'

export default {
  components: { MsgForm },
  data: () => ({
    msg: { title: '', content: '' }
  }),
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
