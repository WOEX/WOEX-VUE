<template>
  <div class="woex-demo ">
    <scroller class="scroller">
      <title title="woex-datepicker"></title>
      <category title="类型样式"></category>
      <div class="datepicker-list">
        <text class="btn-text">默认日期选择器</text>
        <woex-button text="开启" @woexClicked="showNormalPicker"></woex-button>
      </div>
      <woex-datepicker :show="show" @woexConfirm="confirmEvent" @woexCancel="cancelEvent"></woex-datepicker>
    </scroller>
  </div>
</template>

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
  .datepicker-list{
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
  import {WoexButton, WoexDatepicker, WoexToast} from '../../index';

  export default {
    components: { Title, Category, WoexButton, WoexDatepicker},
    data: () => ({
      show: false,
      hasAnimation: true
    }),
    methods: {
      woexButtonClicked (e) {
        const { type, disabled } = e;
      },
      showNormalPicker (e) {
        this.show = true;
      },
      cancelEvent (e) {
        this.show = false;
      },
      confirmEvent (e) {
        this.show = false;
        this.$toast(e);

      }
    }
  }
</script>
