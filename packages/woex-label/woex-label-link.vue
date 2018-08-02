<template>
  <woex-label-text
    :text-value="linkValue"
    :text-style="linkStyle"
    ></woex-label-text>
</template>

<script>
  import WoexLabelText from './woex-label-text.vue'

  export default {
    components: { WoexLabelText },
    props: {
      linkValue: {
        type: String,
        default: ''
      },
      linkHref: {
        type: String
      },
      linkStyle: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style scoped>


</style>
