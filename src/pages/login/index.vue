<template>
  <div>
    <van-notify id="van-notify"/>
    <div class="example-div">
      <mp-button type="primary" size="large" @click="login">login</mp-button>
    </div>
  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button';

export default {
  components: {
    mpButton,
  },
  data() {
    return {
    }
  },
  methods: {
    async login() {
        // wx.api.get('getData') 
        let resource = wx.resource('departments')
        let res = await resource.getList()
        console.log(res)
        // this.$navigate.redirectTo('example_index')
    }
  },
}
</script>

<style scoped>
</style>
