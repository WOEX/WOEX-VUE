<template>
  <div class="woex-btn" @click="onClicked" :style="mrBtnStyle" :accessable="true" :aria-label="text">
    <woex-text class="btn-text" :style="mrTextStyle">{{text}}</woex-text>
  </div>
</template>

<script>
  import WoexText from '../woex-text/index';

  import {STYLE_MAP,TEXT_STYLE_MAP,TEXT_FONTSIZE_STYLE_MAP,DISABLE_STYLE_MAP} from './type';

  export default {
    components: {WoexText},
    props: {
      text:{
        type: String,
        default: '确 定'
      },
      size: {
        type: String,
        default: 'full'
      },
      disabled:{
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'red'
      },
      btnStyle: Object,
      textStyle: Object
    },

    computed: {
      mrBtnStyle() {
        const {type, disabled, btnStyle} = this;

        const mrBtnStyle = {
          ...btnStyle,
          ...STYLE_MAP[type]
        };


        return disabled ? {
          ...mrBtnStyle,
          ...DISABLE_STYLE_MAP[type]
        } : mrBtnStyle;
      },

      mrTextStyle() {
        const {type, size, textStyle} = this;
        const mrTextStyle = {
          ...textStyle,
          ...TEXT_STYLE_MAP[type],
          ...TEXT_FONTSIZE_STYLE_MAP[size]
        };

        return mrTextStyle;
      }
    },
    methods:{
      onClicked(e) {
        const {type, disabled} = this;
        this.$emit('woexClicked', {e, type, disabled});
      }
    }
  }

</script>

<style scoped>
  .woex-btn{
    width: 716px;
    height:88px;
    align-items: center;
    justify-content:center;
    opacity: 1;
  }

  .btn-text{
    text-overflow:ellipsis;
    lines:1;
    font-size:34px;
    color:#fff;
  }


</style>
