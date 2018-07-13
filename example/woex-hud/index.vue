<template>
<div class="woex-demo">
  <scroller class="scroller">
    <title title="woex-hud"></title>
    <category title="类型样式"></category>
    <!--<woex-hud></woex-hud>-->
  </scroller>
</div>
</template>

<script>
  import Vue from 'vue';
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';

  export default {
    components: { Title, Category},
    mounted:function (e) {

      this.$loading();
      this.$unloading();
    }
  }

</script>

<style scoped>
  .woex-demo{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .scroller{
    flex:1
  }
</style>

