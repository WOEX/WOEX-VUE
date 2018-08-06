<template>
  <div class="woex-demo">
    <scroller class="scroller">
      <title title="woex-label"></title>
      <category title="类型样式"></category>
      <div class="switcher-list">
        <text class="switcher-text">普通switcher</text>
        <woex-switcher @switch="switch0Event" :selected="switch0"></woex-switcher>
        <text class="switcher-text">默认关闭switcher</text>
        <woex-switcher @switch="switch1Event" :selected="switch1"></woex-switcher>
        <text class="switcher-text">红色的switcher</text>
        <woex-switcher @switch="switch2Event" selectedColor='rgb(255, 19, 29)'  :selected="switch2"></woex-switcher>
      </div>

    </scroller>
  </div>
</template>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import { WoexSwitcher } from '../../index';

  export default {
    components: {Title, Category, WoexSwitcher },
    data : {
      switch0: true,
      switch1: false,
      switch2: true
    },
    methods:{
      switch0Event(){
        this.switch0 = !this.switch0;
      },
      switch1Event(){
        this.switch1 = !this.switch1;
      },
      switch2Event(){
        this.switch2 = !this.switch2;
      }
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
    background-color: #f5f5f5;
  }
  .scroller {
    flex: 1;
  }
  .switcher-list{
    padding-left: 17px;
  }
  .switcher-text{
    margin-top: 24px;
    margin-bottom:16px;
    margin-left:8px;
  }
</style>
