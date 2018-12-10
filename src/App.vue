<script>
export default {
  initData () {
      let isLogin = wx.cache.get('storage:isLogin')
      if (!isLogin) {
          wx.pro.redirectTo('login')
          return
      }
  },
}
</script>

<style>

</style>
