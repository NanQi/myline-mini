<template>
  <div class="example-div">
    <mp-button type="primary" size="large" @click="close">closeModal</mp-button>
  </div>
</template>

<script>
import modal from 'myline/mixin/modal'
import mpButton from 'mpvue-weui/src/button';
export default {
  components: {
    mpButton,
  },
  mixins: [modal],
  data () {
    return {
    }
  },
  methods: {
    close() {
      this.closeModal('nanqi')
    }
  },
}
</script>

<style scoped>

</style>
