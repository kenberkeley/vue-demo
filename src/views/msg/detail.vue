<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      标题：<strong>{{ msg.title }}</strong>
      <span class="badge pull-right">
        {{ msg.ctime | dateTimeFormatter }}
      </span>
      <br>
      发布者：
      <a v-link="`/msg?authors=${msg.author}`">
        {{ msg.author }}
      </a>
    </div>
    <div class="panel-body min-h-180">
      <p class="lead">{{ msg.content }}</p>
    </div>
    <div class="pull-right m-t-5">
      <opt-btn-group
        :msg-id="$route.params.msgId"
        :auto-jump="true">
      </opt-btn-group>
    </div>
  </div>
</template>
<script>
import OptBtnGroup from './_components/OptBtnGroup'
import autoLoadByParams from './_mixins/autoLoadByParams'

export default {
  mixins: [autoLoadByParams],
  components: { OptBtnGroup },
  data: () => ({ msg: {} }),
  computed: {
    isMine () {
      let { author } = this.msg
      let { userData } = this.$root
      if (!author || !userData) return
      return author === userData.username
    }
  }
}
</script>
<style>
.min-h-180 {
  min-height: 180px;
}
</style>
