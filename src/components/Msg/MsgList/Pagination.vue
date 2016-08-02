<template>
  <nav>
    <ul class="pager">
      <li
        class="previous"
        v-show="pageIdx > 1"
        @click="fetchMsg(-1)">
        <a href="javascript:;">
          <span aria-hidden="true">&larr;</span>
          上一页
        </a>
      </li>
      <!-- 输入框中的值类型为String，使用==隐式转换较为优雅 -->
      <li
        class="next"
        v-show="msgs && msgs.length == quantity"
        @click="fetchMsg(1)">
        <a href="javascript:;">
          下一页
          <span aria-hidden="true">&rarr;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['msgs', 'pageIdx', 'quantity', 'fetchMsg']
}
</script>
