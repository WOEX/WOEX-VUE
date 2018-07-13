<template>
  <main ref="wrapper" class="woex-root woex-ct woex-scroller woex-scroller-wrapper" @scroll="handleScroll" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <article class="woex-scroller-inner">
      <slot></slot>
    </article>
  </main>
</template>

<script>
  export default {
    methods: {
      handleTouchStart: function (e) {

        console.log('111111')
      },
      handleTouchMove: function (e) {

        console.log('3333');
      },
      handleTouchEnd: function (e) {

        console.log('444444');
      },
      handleScroll: function (e) {
        console.log('2222')
      }
    }
  }
</script>

<style>
  @import '../style/base.css';
  @import './style.css';
</style>
