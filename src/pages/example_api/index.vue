<template>
  <div class="example-div">
    <mp-button type="primary" size="large" @click="get">wx.api.get</mp-button>
    <mp-button type="primary" size="large" @click="post">wx.api.post</mp-button>
    <mp-button type="primary" size="large" @click="fetch">wx.api.fetch</mp-button>
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
    async get() {
      let res = await wx.api.get('getData')
      console.log(res)
    },
    async post() {
      let res = await wx.api.post('login');
      console.log(res)
    },
    async fetch() {
      await wx.api.fetch('employees')
    }
  },
}
</script>

<style scoped>
</style>
