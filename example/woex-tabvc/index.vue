<template>
  <div class="woex-demo">
     <woex-tab-v-c :tabTitles="tabTitles" :tabStyles="tabStyles">
       <div class="item-container" ><text>首页</text></div>
       <div class="item-container"><text>特别推荐</text></div>
       <div class="item-container"><text>消息中心</text></div>
       <!--<div class="item-container" :style="contentStyle"><text>我的主页</text></div>-->
     </woex-tab-v-c>
  </div>
</template>

<script>
  import {WoexTabVC} from '../../index'
  import Config from './config';
  export default {
    components: {WoexTabVC},
    data: () => ({
      tabTitles: Config.tabTitles,
      tabStyles: Config.tabStyles
    })
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
  .item-container{
    width: 750px;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    height: 1000px;
  }

</style>
