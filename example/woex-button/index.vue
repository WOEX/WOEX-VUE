<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="woex-button"></title>
      <category title="类型样式"></category>
      <div class="btn-list">
        <text class="btn-text">red </text>
        <woex-button @woexClicked="woexButtonClicked('red')" type="red">red</woex-button>
        <text class="btn-text">red && disabled</text>
        <woex-button @woexClicked="woexButtonClicked('red && disabled')" type="red" disabled="true">red && disabled</woex-button>
        <text class="btn-text">white</text>
        <woex-button @woexClicked="woexButtonClicked('white')" type="white">white</woex-button>
        <text class="btn-text">custom</text>
        <woex-button @woexClicked="woexButtonClicked('custom')" text="custom" style="height: 80px;background: orange;color:#333">custom</woex-button>
      </div>

    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
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
  .btn-list{
    padding-left: 17px;
  }
  .btn-text{
    margin-top: 24px;
    margin-bottom:16px;
    margin-left:8px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import {WoexButton,WoexImage, WoexToast } from '../../index';
  Vue.use(WoexToast);

  const modal = weex.requireModule('modal');
  export default {
    components: { Title, Category, WoexButton,WoexImage},
    methods: {
      woexButtonClicked (type) {
        this.$toast(`type=${type}`)
      }
    }
  }
</script>
