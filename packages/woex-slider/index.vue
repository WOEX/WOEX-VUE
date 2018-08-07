<template>
  <div>
    <div class="progress"></div>
    <div class="circle"></div>
    <div class="popup"></div>
  </div>
</template>
<script>
export default {
  props: {
    progressHeight:{
      type: [String, Number],
      default: 4
    },
    selectedColor: {
      type: String,
      default: '#47b09d'
    },
    normalColor: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    
  }

}
</script>
<style scoped>

</style>
