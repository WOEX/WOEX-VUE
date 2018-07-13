<template>
  <div><image :style="mrImageStyle" :src="mrUrl" :resize="mrResize" :placeholder="mrPlaceHolder"></image></div>
</template>

<script>
  export default {
    props: {
      url: {
        type:String,
        default:''
      },
      imageStyle: {
        type:Object
      },
      resize: {
        type:String,
        default:'stretch'
      },
      placeholder: {
        type:String,
        default:''
      }
    },
    computed: {
      mrImageStyle() {

        const {imageStyle} = this;
        return imageStyle;
      },
      mrUrl() {
        const {url} = this;
        return url;
      },
      mrResize() {
        const {resize} = this;
        return resize;
      },
      mrPlaceHolder() {
        const {placeholder} = this;
        console.log(placeholder);
        return placeholder;
      }
    },
    methods: {

    }
  }
</script>
