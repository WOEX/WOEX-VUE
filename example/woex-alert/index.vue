<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="woex-button"></title>
      <category title="类型样式"></category>
      <div class="btn-list">
        <text class="btn-text">单个确定选项弹框 </text>
        <woex-button @woexClicked="woexButtonClicked(0)">单个确定选项弹框</woex-button>
        <text class="btn-text">两个确定选项弹框</text>
        <woex-button @woexClicked="woexButtonClicked(1)">两个确定选项弹框</woex-button>
        <text class="btn-text">自定义样式弹框</text>
        <woex-button @woexClicked="woexButtonClicked(2)">自定义样式弹框</woex-button>
      </div>
    </scroller>
    <woex-alert v-if="showAlert" class="alert-view" :titleStyle="titleStyle" :title="title" :cancelText="cancelText" :otherText="otherText" @cancel="cancelEvent" @other="otherEvent"></woex-alert>
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
  .alert-view{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import {WoexButton, WoexAlert } from '../../index';

  export default {
    components: { Title, Category, WoexButton, WoexAlert },
    data: ()=>({
      showAlert: false,
      title: '',
      cancelText: '',
      otherText: '',
      titleStyle: ()=>({})
    }),
    methods: {
      woexButtonClicked (index) {
        if ( 0 === index ) {
          this.title = '单个确定选项弹框';
          this.cancelText = '确定';
          this.titleStyle = {};
          this.showAlert = true;
        }else if(1 === index) {
          this.title = '单个确定选项弹框';
          this.cancelText = '确定';
          this.otherText = '取消';
          this.titleStyle = {};
          this.showAlert = true;

        }else if(2 === index) {
          this.title = '自定义样式弹框';
          this.cancelText = '确定';
          this.otherText = '取消';
          this.titleStyle = {
            color: 'red'
          };
          this.showAlert = true;

        }
      },
      otherEvent(){
        this.showAlert = false;
      },
      cancelEvent(){
        this.showAlert = false;
      }
    }
  }
</script>
