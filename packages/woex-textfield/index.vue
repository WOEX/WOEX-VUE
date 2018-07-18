<template>
  <div class="textfield-wrapper" :style="wrapperStyle">
    <text v-if="title" :style="titleStyle" class="title">{{title}}</text>
    <input ref="textfield" :id="inputId" class="textfield textfield-clear" :style="inputStyle" :type="inputType" :placeholder="placeholder" :disabled="disabled" :autofocus="autofocus" :maxlength="maxlength" :returnKeyType="returnKeyType"
           @focus="focusEvent" @blur="blurEvent" @input="inputEvent" @click.prevent="clickEvent"/>
    <slot></slot>
  </div>
</template>

<script>
  import MathUtils from '../utils/math';
  import {INPUT_FORMATTER, INPUT_FILTER} from './config';

  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },
      placeholder: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number
      },
      returnKeyType: {
        type: String,
        default: 'default'
      },
      height: {
        type: [String, Number],
        default: 100
      },
      hasBorder: {
        type: Boolean,
        default: false
      },
      padding: {
        type: [String, Number],
        default: 34
      },
      fontSize: {
        type: [String, Number],
        default: 32
      },
      fontColor:{
        type: String,
        default: '#333333'
      },
      placeholderColor: {
        type: String,
        default: '#B0B0B0'
      },
      title: {
        type: String,
        default: null
      },
      hasClear: {
        type: Boolean,
        default: true
      }
    },
    data: function(){
      return {
        focus: false,
        value: '',
        val: '',
        inputId: MathUtils.randomString(8),
        clearFocus: false
      }
    },
    computed:{
      wrapperStyle: function () {
        const {hasBorder, padding} = this;
        return {
          borderBottomWidth:hasBorder ? '1px' : 0,
          marginLeft: padding + 'px',
          marginRight: padding + 'px'
        }
      },
      inputStyle: function() {
        const {fontSize, placeholderColor, fontColor, height, focus, value, hasClear} = this;
        const styles = {
          fontSize: fontSize + 'px',
          placeholderColor: placeholderColor,
          color: fontColor,
          height: height + 'px',
          };

        if (hasClear ) {
          if (focus && value.length > 0) {
            return {
              ...styles,
              paddingRight: '1rem',
              backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAQAAAD97QrkAAABuklEQVRIx52VvU4CQRDHB60M8Q0IDQnvYUFi4wNYWFBYESpCa6eVPohUYuELzOxFwkEgGqMm0uhZAA0NH41/Czi4vdvdA3a7ycxvZ+eTyHhaRanLI/v8KwsJpC1NrqkCbXdwqC75jWG68qLKOEgB8JnNfIPxTu3vH6hbt/kac4OMASDH8rQdgMGQZj+b8GAXAIMhDzFP+G43AIMh13oQsc+V0jqN0Sx8YoYfswECzPARlfRWKVaXUcUZAGBkAIwBAFNNqi6W39Aq4QcwQEIA8K3Lu0TUKsbfGyUgG8Aw6V2epJ78tQ5xARiqSvJoCt0G4gYwuEHsmxMWQuZuAFgR/9qyHkKcAPCAZGEtnLUHc1d5TUgCG2Ac8WJkh3yRtN2AeRpESJouwNBYJ5ruPXHNDeA0SIVUIQ3ghjzniEheo6LAksYQEutif9mp5WSnDq11oneqdx4OvZeN8APTWDdGu3iK96iksx5+3uleM+tPTqLz+2YPxJU+wTOm+nDeRmKX9LPysAvAOzJts4xcbxmDK+M2W8WkJL0UREcLomWzXkjXYu575473Y97kVZUbrHggEx6wyD1XnnNm3X+CKiA+VpC08gAAAABJRU5ErkJggg==')",
            }
          }else {
            return {
              ...styles,
              paddingRight: '1rem'
            }
          }
        }else {
          return styles;
        }
      },
      titleStyle: function () {
        const {height} = this;
        return {
          lineHeight: height + 'px'
        }
      },
      clearStyle: function () {
        const {focus, value} = this;

        return ( focus && value.length > -1) ? {
          'backgroundImage': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAQAAAD97QrkAAABuklEQVRIx52VvU4CQRDHB60M8Q0IDQnvYUFi4wNYWFBYESpCa6eVPohUYuELzOxFwkEgGqMm0uhZAA0NH41/Czi4vdvdA3a7ycxvZ+eTyHhaRanLI/v8KwsJpC1NrqkCbXdwqC75jWG68qLKOEgB8JnNfIPxTu3vH6hbt/kac4OMASDH8rQdgMGQZj+b8GAXAIMhDzFP+G43AIMh13oQsc+V0jqN0Sx8YoYfswECzPARlfRWKVaXUcUZAGBkAIwBAFNNqi6W39Aq4QcwQEIA8K3Lu0TUKsbfGyUgG8Aw6V2epJ78tQ5xARiqSvJoCt0G4gYwuEHsmxMWQuZuAFgR/9qyHkKcAPCAZGEtnLUHc1d5TUgCG2Ac8WJkh3yRtN2AeRpESJouwNBYJ5ruPXHNDeA0SIVUIQ3ghjzniEheo6LAksYQEutif9mp5WSnDq11oneqdx4OvZeN8APTWDdGu3iK96iksx5+3uleM+tPTqLz+2YPxJU+wTOm+nDeRmKX9LPysAvAOzJts4xcbxmDK+M2W8WkJL0UREcLomWzXkjXYu575473Y97kVZUbrHggEx6wyD1XnnNm3X+CKiA+VpC08gAAAABJRU5ErkJggg==')",
          'display': 'inherit'
        } : {
          'display': 'none'
        }
      },
      clearWrapperStyle: function(){
        const {height} = this;
        return {
          height: height + 'px'
        }
      },
      clearShow: function () {
        const {focus, value} = this;
        return focus && value.length > 0;
      },
      inputType: function () {
        const {type} = this;
        //判断输入框键盘类型
        if ('text' === type){
          return 'text';
        }

        return 'text';
      }
    },
    methods:{
      focusEvent: function (e) {
        this.focus = true;

      },
      blurEvent: function(e) {
        this.focus = false;
      },
      inputEvent: function (event) {
        const {type} = this;

        if ('phone' === type) {
          const selectionEnd = event.target.selectionEnd;
          let targetSelectEnd = INPUT_FILTER.phone(event.value.substr(0, selectionEnd)).length;
          if (targetSelectEnd > 7) {
            targetSelectEnd = targetSelectEnd + 2;
          }else if (targetSelectEnd > 3) {
            targetSelectEnd = targetSelectEnd + 1;
          }

          this.$refs.textfield.$el.value = INPUT_FORMATTER[type](event.value);
          this.$refs.textfield.setSelectionRange(targetSelectEnd, targetSelectEnd);
        }else if ('idCard' === type) {
          const selectionEnd = event.target.selectionEnd;
          let targetSelectEnd = INPUT_FILTER.idCard(event.value.substr(0, selectionEnd)).length;
          if (targetSelectEnd > 14) {
            targetSelectEnd = targetSelectEnd + 2;
          }else if (targetSelectEnd > 6) {
            targetSelectEnd = targetSelectEnd + 1;
          }

          this.$refs.textfield.$el.value = INPUT_FORMATTER[type](event.value);
          this.$refs.textfield.setSelectionRange(targetSelectEnd, targetSelectEnd);
        }

        this.value = event.value;
        this.$emit('valueChanged', this.value);
      },
      clickEvent: function (e) {
        const {hasClear} = this;
        // 若不含清除标签，则停止后续判断
        if (!hasClear) {
          return false;
        }

        // 若无输入，则不处理
        if (this.value.length == 0) {
          return false;
        }

        const x = e.touch.pageX - e.currentTarget.offsetParent.offsetLeft;
        const width = e.currentTarget.clientWidth;
        if (x > width - 0.8 * parseFloat(document.documentElement.style.fontSize)) {
          this.$refs.textfield.$el.value = '';
          this.value = '';
          this.$emit('valueChanged', this.value);
        }

        return false;
      }
    }
  }
</script>

<style scoped>
  .textfield-wrapper{
    flex-direction: row;
    border-color: #DFDFDF;
    padding-bottom: 1px
  }
  .textfield{
    outline:none;
    flex:1;
    caret-color: #FA5E5B;
  }
  .title{
    margin-right: 40px;
    color:#333333
  }
  .clear{
    width: 50px;
    height: 50px;
    margin: auto 0;
    background-size: 33px 33px;
    background-position: 8px 8px;
    background-repeat: no-repeat;
  }
  .textfield-clear{
    background-size: 33px 33px;
    background-position: right;
    background-repeat: no-repeat;
  }
</style>
