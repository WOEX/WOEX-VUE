<template>
  <text ref="text" :lines="lines">
    <slot></slot>
  </text>
</template>

<script>
  export default {
    props:{
      lines: Number
    },
    computed: {
      value: function () {
        return text = this.$refs.text.value;
      }
    }
  }
</script>
