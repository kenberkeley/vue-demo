<template>
  <div>
    <msg-form :msg.sync="msg">
      <button slot="submit" @click="handleSubmit"
        type="button" class="btn btn-success">
        <i class="fa fa-floppy-o m-r-5"></i>
        保存修改
      </button>
    </msg-form>
  </div>
</template>
<script>
import MsgForm from './_components/MsgForm'
import msgService from 'SERVICE/msgService'
import autoLoadByParams from './_mixins/autoLoadByParams'

export default {
  mixins: [autoLoadByParams],
  components: { MsgForm },
  data: () => ({ msg: {} }),
  methods: {
    handleSubmit () {
      msgService.update(this.msg).then(({ id }) => {
        $.toast({
          heading: '更新成功',
          text: '已自动跳转到详情页',
          icon: 'success'
        })
        this.$router.replace(`/msg/detail/${id}`)
      })
    }
  }
}
</script>
