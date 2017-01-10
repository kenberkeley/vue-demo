<template>
  <form @submit.prevent class="p-10">
    <div class="form-group">
      <label for="title">_#标题#_</label>
      <input type="text" v-model="msg.title" id="title"
        class="form-control" placeholder="_#请输入标题#_..." required>
    </div>
    <div class="form-group">
      <label for="content">_#内容#_</label>
      <textarea v-model="msg.content" id="content" required
        class="form-control" rows="5" placeholder="_#请输入留言信息#_..."
      ></textarea>
    </div>
    <div class="clearfix">
      <div class="pull-right">
        <span v-show="allowToSubmit">
          <slot name="opt"><!-- 操作按钮插槽 --></slot>
        </span>
        <span v-show="!allowToSubmit">
          <button class="btn" disabled>
            <i class="fa fa-pencil-square-o m-r-5"></i>
            _#请完整填写表单#_
          </button>
        </span>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  props: {
    msg: { type: Object, required: true, twoWay: true }
  },
  computed: {
    allowToSubmit () {
      let { title, content } = this.msg
      return title && content
    }
  }
}
</script>
<style>
.p-10 {
  padding: 10px;
}
</style>
