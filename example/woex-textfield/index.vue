<template>
  <div class="woex-demo">
    <scroller class="scroller">
      <title title="woex-textfield"></title>
      <category title="类型样式"></category>
      <text class="cate-title">普通输入框</text>
      <woex-textfield placeholder="我是个普通输入框"></woex-textfield>
      <text class="cate-title">带标题输入框</text>
      <woex-textfield placeholder="我是个带标题输入框" title="标题"></woex-textfield>
      <text class="cate-title">下划线输入框</text>
      <woex-textfield placeholder="我是个带下划线输入框" hasBorder=true></woex-textfield>
      <woex-textfield placeholder="我是个带下划线输入框" title="标题" hasBorder=true></woex-textfield>
      <text class="cate-title">手机号输入框</text>
      <woex-textfield placeholder="我是个手机号输入框" type="phone" hasBorder=true></woex-textfield>
      <text class="cate-title">身份证输入框</text>
      <woex-textfield placeholder="我是个身份证输入框" type="idCard" hasBorder=true></woex-textfield>
    </scroller>
  </div>
</template>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import {WoexTextfield} from '../../index';

  export default {
    components:{Title, Category, WoexTextfield}
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
  .scroller {
    flex: 1;
  }
  .cate-title{
    margin-left:34px;
    color:#333333;
    font-size:34px;
    margin-top:20px;
    color: orange
  }
</style>
