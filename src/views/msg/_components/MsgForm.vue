<template>
  <form @submit.prevent class="p-10">
    <div class="form-group">
      <label for="title">标题</label>
      <input type="text" v-model="msg.title" id="title"
        class="form-control" placeholder="请输入标题..." required>
    </div>
    <div class="form-group">
      <label for="content">内容</label>
      <textarea v-model="msg.content" id="content" required
        class="form-control" rows="5" placeholder="请输入留言信息..."
      ></textarea>
    </div>
    <div class="pull-right">
      <span v-show="allowToSubmit">
        <slot name="submit"><!-- 提交按钮插槽 --></slot>
      </span>
      <span v-show="!allowToSubmit">
        <button class="btn" disabled>
          <i class="fa fa-pencil-square-o m-r-5"></i>
          请完整填写表单
        </button>
      </span>
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
