<template>
  <div class="woex-demo ">
    <scroller class="scroller">
      <title title="woex-datepicker"></title>
      <category title="类型样式"></category>
      <div class="datepicker-list">
        <text class="btn-text">默认日期选择器</text>
        <woex-button text="开启" @woexButtonClicked="showNormalPicker"></woex-button>
      </div>
      <woex-datepicker :show="show" @woexConfirm="confirmEvent" @woexCancel="cancelEvent"></woex-datepicker>
      <!--<div class="btn-list">-->
        <!--<text class="btn-text">red </text>-->
        <!--<woex-button @woexButtonClicked="woexButtonClicked" text="red" type="red"></woex-button>-->
        <!--<text class="btn-text">red && disabled</text>-->
        <!--<woex-button @woexButtonClicked="woexButtonClicked" text="red && disabled" type="red" disabled="true"></woex-button>-->
        <!--<text class="btn-text">white</text>-->
        <!--<woex-button @woexButtonClicked="woexButtonClicked" text="white" type="white"></woex-button>-->
      <!--</div>-->

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
  import {WoexButton, WoexDatepicker} from '../../index';

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
        console.log('222222');
        this.show = true;
      },
      cancelEvent (e) {
        console.log('2222');
        this.show = false;
      },
      confirmEvent (e) {
        console.log('1111');

      }
    }
  }
</script>
