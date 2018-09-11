<template>
  <scroller>
    <div :style="scrollStyle">
      <slot></slot>
    </div>
  </scroller>
</template>

<script>
  export default {
    props: {
      scrollStyle: {
        type: Object,
        default: ()=> ({})
      }

    },
    methods: {
      handleTouchStart: function (e) {

      },
      handleTouchMove: function (e) {

      },
      handleTouchEnd: function (e) {

      },
      handleScroll: function (e) {

      }
    }
  }
</script>

<style>

</style>
