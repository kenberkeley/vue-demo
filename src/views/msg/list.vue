<template>
  <div>
    <div class="row">
      <div class="col-sm-6 col-md-5 col-lg-4">
        <author-select></author-select>
      </div>
      <div v-if="$root.userData" class="col-sm-6 col-md-7 col-lg-8">
        <a v-link="`/msg/add`" class="btn btn-default pull-right">
          <i class="fa fa-comment-o m-r-5"></i>
          添加留言信息
        </a>
      </div>
    </div>
    
    <div class="row min-h-180">
      <ul class="list-group m-t-5">
        <li v-for="msg in msgs" class="list-group-item">
          <h4 class="list-group-item-heading">
            <a v-link="`/msg/detail/${msg.id}`">
              {{ msg.title }}
            </a>
            <small> by
              <a v-link="{ path: '/msg', query: { authors: msg.author } }">
                {{ msg.author }}
              </a>
            </small>
            <span class="badge pull-right">
              {{ msg.ctime | dateTimeFormatter }}
            </span>
          </h4>
          <small class="list-group-item-text">
            {{ msg.content | cutLongText }}
          </small>
          <opt-btn-group class="pull-right" :msg="msg" :small-size="true">
            <a v-link="`/msg/detail/${msg.id}`" class="btn btn-default">
              <i class="fa fa-eye m-r-5"></i>
              详情
            </a>
          </opt-btn-group>
        </li>
      </ul>

      <h4 v-show="!total" class="text-muted text-center line-h-150">
        （暂无留言信息）
      </h4>
    </div>
    
    <div class="row">
      <div class="col-sm-6 nowrap">
        共 <span class="badge">{{ total }}</span> 条记录，
        <limit-select></limit-select>
      </div>
      <div class="col-sm-6">
        <pagination :total="total" class="pull-right"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from 'COMPONENT/Pagination'
import LimitSelect from 'COMPONENT/Select/LimitSelect'
import AuthorSelect from './_components/AuthorSelect'
import OptBtnGroup from './_components/OptBtnGroup'
import msgService from 'SERVICE/msgService'

export default {
  components: { Pagination, LimitSelect, AuthorSelect, OptBtnGroup },
  data: () => ({ total: 0, msgs: [] }),
  route: {
    data () {
      msgService
        .fetchList(this.$route.query)
        .then(({ total, rows }) => {
          this.total = total
          this.msgs = rows
        })
    }
  },
  filters: {
    cutLongText (txt, limit = 10) {
      return txt.length > limit
        ? txt.substr(0, limit) + '···'
        : txt
    }
  }
}
</script>
<style>
.min-h-180 {
  min-height: 180px;
}
.line-h-150 {
  line-height: 150px;
}
.nowrap {
  white-space: nowrap;
}
</style>
