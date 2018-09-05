<template>
  <div class="woex-demo">
    <scroller class="scroller">
      <title title="woex-sixfield"></title>
      <category title="类型样式"></category>
      <woex-searchbar hasHint=true hintText="123"></woex-searchbar>
    </scroller>
  </div>
</template>


<script>
  import {WoexSearchbar} from '../../index';

  export default {
    components: {WoexSearchbar},
    methods: {

    }
  }
</script>

<style scoped>
  .woex-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
  }
  .scroller {
    flex: 1;
  }
</style>
