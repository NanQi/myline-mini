<template>
  <div>
    <van-notify id="van-notify"/>
    <div class="example-div">
      <mp-button type="primary" size="large" @click="$navigate.to('example_api')">wx.api</mp-button>
      <mp-button type="primary" size="large" @click="toModal">wx.modal</mp-button>
      <mp-button type="primary" size="large" @click="show">wx.notify</mp-button>
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
    async toModal() {
      let res = await wx.modal.open('example_modal')
      console.log('res', res)
    },
    show() {
      this.showNotify('通知内容');
    }
  },
  initData() {
    console.log('index initData')
  }
}
</script>

<style scoped>
</style>
