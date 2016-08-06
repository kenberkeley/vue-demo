<template>
  <center>
  <validator name="displayControl">
    <form class="form-inline">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-addon">
            当前为第
            <span class="badge">
              {{ pageIdx }}
            </span>
            页（当页共
            <span class="label label-default">
              {{ msgs.length }}
            </span>
            条数据），限制每页加载数量为
          </div>
          <input
            type="text"
            class="form-control"
            style="width: 4em"
            placeholder="默认10"
            v-model="quantity"
            v-validate:quantity="{ min: 1, max: 20 }"/>
          <div class="input-group-addon">
            <div class="btn-group">
              <button
                :disabled="$displayControl.invalid || !$displayControl.quantity.modified"
                type="button"
                class="btn btn-xs"
                @click="fetchMsg(0)">
                OK
              </button>
              <button
                class="btn btn-xs dropdown-toggle"
                data-toggle="dropdown">
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a @click.stop
                    v-link="{ path: '/redirect?dest=/msg' }">
                    重置页面（强制刷新）
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <span
          class="label label-warning"
          v-show="$displayControl.invalid">
          可选范围 1 ~ 20
        </span>
      </div>
    </form>
  </validator>
  </center>
</template>
<script>
import 'VALIDATOR'
export default {
  props: ['msgs', 'pageIdx', 'quantity', 'fetchMsg']
}
</script>
