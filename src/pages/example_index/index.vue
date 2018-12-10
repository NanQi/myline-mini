<template>
    <div class="example-div">
       <mp-button type="primary" size="large" @click="$ui.navigateTo('example_api')">wx.api</mp-button>
       <mp-button type="primary" size="large" @click="toModal">wx.modal</mp-button>
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
    async toModal() {
      let res = await wx.modal.open('example_modal')
      console.log('res', res)
    }
  },
}
</script>

<style scoped>

</style>
