<template>
  <div class="woex-demo">
    <woex-tableview class="woex-table" :numberOfSections="caculateSectons">
      <header>
        <div class="header">
          <text class="header-text">I'm a ordinary header</text>
        </div>
      </header>
      <woex-cell v-for="(item, i) in params" :key="i"  label='测试标题' title="123456" desc="描述文字" hasArrow="true" arrowIcon="https://gw.alicdn.com/tfs/TB11zBUpwMPMeJjy1XbXXcwxVXa-22-22.png">

      </woex-cell>
    </woex-tableview>
  </div>
</template>

<script>
  import {WoexTableview,WoexCell} from '../../index';
  export default{
    components:{WoexTableview, WoexCell},
    data(){
      return {
        params: ['a','b','c','d']
      };
    },
    methods:{
      caculateSectons:function () {
        console.log('123131231');
        return 10;
      }
    }
  }
</script>

<style scoped>
  .woex-demo{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0
  }
  .woex-table{
    height: 100%;
    width: 100%;
  }
  .header{
    background-color: orangered;
    width: 100%;
    height:80px;
    align-items: center;
    justify-content: center;
  }
  .header-text{
    text-align: center;
    color:#ffffff;
    font-size:34px;
  }
</style>
