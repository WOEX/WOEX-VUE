<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="woex-button"></title>
      <category title="类型样式"></category>
      <div class="btn-list">
        <text class="btn-text">red </text>
        <woex-button @woexClicked="woexButtonClicked" text="red" type="red"></woex-button>
        <text class="btn-text">red && disabled</text>
        <woex-button @woexClicked="woexButtonClicked" text="red && disabled" type="red" disabled="true"></woex-button>
        <text class="btn-text">white</text>
        <woex-button @woexClicked="woexButtonClicked" text="white" type="white"></woex-button>
        <text class="btn-text">custom</text>
        <woex-button text="custom" type="custom" :textStyle='{color:"#333"}' style="height: 80px;background: orange;"></woex-button>
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
  import {WoexButton,WoexImage} from '../../index'

  const modal = weex.requireModule('modal');
  export default {
    components: { Title, Category, WoexButton,WoexImage},
    methods: {
      woexButtonClicked (e) {
        const { type, disabled } = e;
        modal.toast({
          message: disabled ? `disabled=${disabled}` : `type=${type}`
        })
      }
    }
  }
</script>
