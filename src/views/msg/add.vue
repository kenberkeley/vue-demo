<template>
  <form @submit.prevent="handleSubmit" class="p-10">
    <div class="form-group">
      <label for="title">标题</label>
      <input type="text" v-model="title" id="title"
        class="form-control" placeholder="请输入标题...">
    </div>
    <div class="form-group">
      <label for="content">内容</label>
      <textarea v-model="content" id="content"
        class="form-control" rows="5" placeholder="请输入留言信息..."
      ></textarea>
    </div>
    <button type="submit" class="btn btn-default pull-right">
      <i class="fa fa-check m-r-5"></i>
      提交
    </button>
  </form>
</template>
<script>
import msgService from 'SERVICE/msgService'

export default {
  data: () => ({ title: '', content: '' }),
  methods: {
    handleSubmit () {
      let title = $.trim(this.title)
      let content = $.trim(this.content)
      if (!(title && content)) return $.toast({
        heading: '标题或内容为空',
        text: '请完整填写表单',
        icon: 'info',
        stack: false
      })

      msgService
        .add({ title, content })
        .then(msg => console.log(msg))
    }
  }
}
</script>
