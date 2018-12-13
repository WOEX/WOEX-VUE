<template>
  <button class="woex-btn" @click="onClicked" :style="mrBtnStyle" :accessable="true" :aria-label="text">
    <slot></slot>
  </button>
</template>

<script>

  import {STYLE_MAP,TEXT_STYLE_MAP,TEXT_FONTSIZE_STYLE_MAP,DISABLE_STYLE_MAP} from './type';

  export default {
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
        const { type, disabled, btnStyle, size } = this;

        const mrBtnStyle = {
          ...btnStyle,
          ...STYLE_MAP[type],
          ...TEXT_STYLE_MAP[type],
          ...TEXT_FONTSIZE_STYLE_MAP[size]
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
        const { disabled } = this;
        if (!disabled) {
          this.$emit('woexClicked', e);
        }

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
    display: flex;
    outline: none;
    text-overflow:ellipsis;
    font-size:34px;
    color:#fff;
  }
</style>
