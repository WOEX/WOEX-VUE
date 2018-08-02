<template>
  <image class="woex-label-icon"
        :src="iconSrc"
         @load="onLoad"
         :style="{ width: computedStyle.width, height: computedStyle.height }">

  </image>
</template>

<script>
  export default {
    props: {
      iconSrc: String,
      iconStyle: {
        type: Object,
        default: () => ({
          height: 24
        })
      }
    },
    data: () => ({
      width: 90
    }),
    computed: {
      computedStyle() {
        const { width, iconStyle } = this;
        if (iconStyle && iconStyle.width && iconStyle.height) {
          return {
            width: `${iconStyle.width}px`,
            height: `${iconStyle.height}px`
          }
        }else {
          return {
            width: `${width}px`,
            height: `${iconStyle.height}px`
          }
        }
      }
    },
    methods: {
      onLoad(e) {
        if (e.success && e.size && e.size.naturalWidth > 0) {
          const width = e.size.naturalWidth;
          const height = e.size.naturalHeight;
          this.width = width * (this.iconStyle.height / height);
        }
      }
    }
  }
</script>

<style scoped>
  .woex-label-icon {
    width: 24px;
    height: 24px;
    margin: 0 4px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
