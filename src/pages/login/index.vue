<template>
  <div id="main-page">
    <navbar />
    <van-notify id="van-notify"/>
    <div class="example-div">
      <mp-button type="primary" size="large" @click="login">login</mp-button>
    </div>
  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button';
import navbar from '@/components/navbar';

export default {
  components: {
    mpButton,
    navbar
  },
  data() {
    return {
    }
  },
  methods: {
    async login() {
        this.$ui.showNotify("alert")
        return
        // wx.api.get('getData') 
        // let resource = wx.resource('employees')
        // let res = await resource.list({page: 100000})
        // console.log(res)
        // this.$navigate.redirectTo('example_index')
    }
  },
}
</script>

<style scoped lang="less">
.example-div {
    position: absolute;
    width: 750rpx;
    top: 60px;
}
</style>
