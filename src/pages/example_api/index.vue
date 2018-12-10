<template>
  <div class="example-div">
    <mp-button type="primary" size="large" @click="get">wx.api.get</mp-button>
    <mp-button type="primary" size="large" @click="fetch">wx.api.fetch</mp-button>
  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button';
export default {
  components: {
    mpButton,
  },
  data () {
    return {
    }
  },
  methods: {
    async get() {
      let res = await wx.api.get('https://api.youyag.com/employees')
      console.log(res)
    },
    async fetch() {
      let res = await wx.api.fetch('https://api.youyag.com/employees')
      console.log(res)
    }
  },
}
</script>

<style scoped>

</style>
