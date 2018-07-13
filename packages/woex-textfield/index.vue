<template>
  <div class="textfield-wrapper" :style="wrapperStyle">
    <text v-if="title" :style="titleStyle" class="title">{{title}}</text>
    <input ref="textfield" :id="inputId" class="textfield" :style="inputStyle" :type="inputType"  :placeholder="placeholder" :disabled="disabled" :autofocus="autofocus" :maxlength="maxlength" :returnKeyType="returnKeyType"
           @focus="focusEvent" @blur="blurEvent" @change="changeEvent" @input="inputEvent"/>
    <slot></slot>
    <label :for="inputId" class="clear" :style="clearStyle" v-if="hasClear" @click="clearEvent"></label>
  </div>
</template>

<script>
  import MathUtils from '../utils/math';

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
        const {fontSize, placeholderColor, fontColor, height} = this;
        return {
          fontSize: fontSize + 'px',
          placeholderColor: placeholderColor,
          color: fontColor,
          height: height + 'px'
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

        return ( focus && value.length > 0) ? {
          'backgroundImage': "url('data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAMAAABgOjJdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAADGUExURQAAAMPDw8TExNHR0cPDw8PDw8PDw////////8TExMTExMTExMTExMTExMTExMTExMPDw8PDw8PDw8XFxcbGxsPDw8TExMXFxcTExMTExMjIyP///8TExMTExMnJycPDw8PDw8bGxsTExMXFxcTExMXFxcTExMTExMTExMTExMTExMXFxcPDw8TExMPDw8bGxsXFxcTExMPDw8PDw////+vr68TExOrq6uzs7Pf39/b29vj4+OTk5NnZ2ePj4+Xl5dra2tjY2IpoL7YAAAAzdFJOUwDe0wuqzNYBArG2hn7xsPnmxGtdWU3ObYUeHAN1RSbNxUhBZbIj0P7LqeVhcw2NCYzU3ZCKw68AAAFASURBVDjLdZTndoMwDIVFAgWaPZrVpNlpVqdMCJDRvv9LFWzAo+b+QVgfOtYCgOtlvLKajf3WPa5Bo+flA3KVDo4KPIl+yswlv/OJ/1WxOfD2iDq55TyCHkCsZ1HesUiD9JJYrAlNk2XxE1y443QPrtTYJEkv2WFAiJcDZ0JCZnZiIi3EheRIApAbs3txqbMPvQyhgJ8dD2GMCiID2IcVyogCoAkWykgkAziDJiqIDKABDfH1lESIpJrVYC8CZxrDE4lv2CpApCAtcGXA53Vh2sFRAVBB2rBWAQUZAXwx6y6kmSBpp624c4e8t75Yl7S33WQGS9S8hjchg0v4S59TOofz4hF7XbAxrBQS1XSSbbcAMPONKdf1wAdfKXuguUPVlvZyslGA6UJdbafTE/xW19b9IIZ9c2bUjNauPRJO/wDx7qi4ql24vgAAAABJRU5ErkJggg==')",
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
        if ('text' === type)
          return 'text';

        return 'text';
      }
    },
    methods:{
      focusEvent: function () {
      this.focus = true;
      },
      blurEvent: function(e) {
        if (this.clearFocus) {
          this.$refs.textfield.$el.focus();
          this.clearFocus = false;
        }else {
          this.focus = false;
        }
      },
      changeEvent: function (event) {
        this.value = event.value;
      },
      inputEvent: function (event) {
        this.value = event.value;
      },
      clearEvent: function () {
        this.clearFocus = true;
        this.$refs.textfield.$el.value = '';
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
</style>
