import updateQs from 'UTIL/updateQs'

export default {
  methods: {
    /**
     * 更新当前 URL 中的 query string
     * @param {Object} newQsObj
     */
    updateQs (newQsObj) {
      this.$router.go(updateQs(this.$route.path, newQsObj))
    }
  }
}
