import updateQuery from '@/utils/updateQuery'

export default {
  methods: {
    /**
     * 更新当前 URL 中的 query string
     * @param {Object} newQsObj
     */
    updateQuery (newQsObj) {
      this.$router.go(updateQuery(this.$route.path, newQsObj))
    }
  }
}
