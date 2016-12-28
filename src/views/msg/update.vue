<template>
  <div>
    <msg-form :msg.sync="msg">
      <opt-btn-group slot="opt"
        :msg="msg"
        :edit-btn="false"
        :auto-jump="true">
        <button @click="handleSubmit"
          type="button" class="btn btn-default">
          <i class="fa fa-floppy-o"></i>
        </button>
      </opt-btn-group>
    </msg-form>
  </div>
</template>
<script>
import MsgForm from './_components/MsgForm'
import OptBtnGroup from './_components/OptBtnGroup'
import msgService from 'SERVICE/msgService'
import autoLoadByParams from './_mixins/autoLoadByParams'

export default {
  mixins: [autoLoadByParams],
  components: { MsgForm, OptBtnGroup },
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
  },
  events: {
    MSG_LOADED () {
      // 检测当前用户是否有权限修改本留言信息
      if (this.msg.author !== this.$root.userData.username) {
        $.toast({ heading: '非法访问', icon: 'error' })
        this.$router.replace('/msg')
      }
    }
  }
}
</script>
