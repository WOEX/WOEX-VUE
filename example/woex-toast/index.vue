<template>
<div class="woex-demo">
  <scroller class="scroller">
    <title title="woex-toast"></title>
    <category title="类型样式"></category>
    <div class="btn-list">
      <text class="btn-text">普通浮框展示 </text>
      <woex-button @woexClicked="showNormal">普通浮框展示</woex-button>
      <text class="btn-text">多行浮框展示</text>
      <woex-button @woexClicked="showLines">多行浮框展示</woex-button>
      <text class="btn-text">控制显示时间</text>
      <woex-button @woexClicked="showDuration">控制显示时间</woex-button>
    </div>
  </scroller>
</div>
</template>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import { WoexButton, WoexToast } from '../../index'
  Vue.use(WoexToast)

  export default {
    components: { Title, Category, WoexButton, WoexToast },
    methods:{
      showNormal(e){
        this.$toast('welcome to use WOEX !');
      },
      showLines(e){
        this.$toast('welcome to use WOEX ! In this toast, we will show you the appearance for long text.')
      },
      showDuration(e){
        this.$toast('welcome to use WOEX ! this toast should hold 5 secs', 5000);
      }
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
  .btn-list{
    padding-left: 17px;
  }
  .btn-text{
    margin-top: 24px;
    margin-bottom:16px;
    margin-left:8px;
  }
</style>

