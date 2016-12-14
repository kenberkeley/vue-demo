<template>
  <div>
    <div class="row">
      <div class="col-sm-6 col-md-5 col-lg-4">
        <author-select></author-select>
      </div>
    </div>

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
        <opt-btn-group class="pull-right"
          :msg-id="msg.id" :small-size="true">
        </opt-btn-group>
      </li>
    </ul>
    
    <div class="row">
      <div class="col-sm-6">
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
