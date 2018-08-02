<template>
  <span class="woex-label-text" :style="themeStyle">{{textValue}}</span>
</template>

<script>
  export default {
    props: {
      textValue: {
        type: String,
        default: ''
      },
      textStyle: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      themeStyle() {
        const {textStyle} = this;
        return {...textStyle};
      }
    }
  }
</script>

<style scoped>
  .woex-label-text {
    color: #333;
    font-size: 28px;
    vertical-align: middle;
  }
</style>
