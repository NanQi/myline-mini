<template>
    <div>
      <button @click="openModal">openModal</button>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    openModal() {
      wx.modal.open('example_modal')
        .then(res => {
          console.log('then', res)
        })
        .catch(err => {
          console.log('catch', err)
        })
        .finally(() => {
          console.log('finally')
        })
    }
  },
}
</script>

<style scoped>

</style>
