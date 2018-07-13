<template>
  <div class="woex-demo">
      <woex-nav title='标题' @leftBarClick="leftHandler">
        <text>右侧按钮</text>
      </woex-nav>
    <div class="content"></div>
      <woex-nav position="bottom" mode="custom">
        <div class="bottom-bar">
          <text class="bottom-title">底部自定义Bar</text>
        </div>
      </woex-nav>

  </div>
</template>

<script>
  import {WoexNav} from '../../index';

  export default {
    components: {WoexNav},
    methods:{
      leftHandler(){
        console.log('顶部左侧ItemBar被点击！');
      }
    }
  }
</script>

<style scoped>
  .woex-demo{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .bottom-bar{
    background: orangered;
    width:100%;
    height:100%;
    justify-content:center;
    align-items:center
  }
  .bottom-title{
    font-size: 32px;
    color:white;
  }
  .content{
    background: #ededed;
    position: absolute;
    top:88px;
    bottom: 88px;
    left:0;
    right:0
  }
</style>
