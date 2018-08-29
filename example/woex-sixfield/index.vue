<template>
  <div class="woex-demo">
    <scroller class="scroller">
      <title title="woex-sixfield"></title>
      <category title="类型样式"></category>
      <woex-sixfield></woex-sixfield>
    </scroller>
  </div>
</template>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import { WoexSixfield } from '../../index';

  export default {
    components: { Title, Category, WoexSixfield }
  }
</script>
<style scoped>
  .woex-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #f5f5f5;
  }
  .scroller {
    flex: 1;
  }
</style>
