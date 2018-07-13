<template>
  <div class="woex-nav" ref="nav" :style="navStyles" :dataRole = "useNative ? 'navbar': ''">
    <slot v-if="mode == 'custom'"></slot>
    <div v-if= "mode == 'standard'" class="nav-wrapper">
      <div class="leftBar" @click="leftBarClick">
        <div class="angle"></div>
      </div>
      <text :style="titleStyles" class="title" naviItemPosition="center">{{title}}</text>
      <div class="rightBar">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  const dom = weex.requireModule('dom');
  const animation = weex.requireModule('animation');
  const SCALE = weex.config.env.platform.toLocaleLowerCase() === 'web' ? 2 : 1;

  function _getHeight(element, callback) {
    if (!element) {
      return;
    }

    if (element.__cacheHeight){
      element.__cacheHeight && callback && callback(element.__cacheHeight);
    }else {
      dom.getComponentRect(element, (res) => {
        let height = (parseFloat(res && res.size && res.size.height || 0)) / SCALE;
        height && callback && callback((element.__cacheHeight = height));
      });
    }
  }

  function _toNum(str){
    return typeof str === 'number' ? str : parseFloat((str || '').replace(/px$/i, ''));
  }

  export default {

    //TODO:添加位置控制
    props: {
      position: {
        type: String,
        default: 'top'
      },
      title: {
        type: String,
        default:''
      },
      height: {
        type: [String, Number],
        default:88
      },
      mode: {
        type:String,
        default:'standard'
      },
      bgColor: {
        type:String,
        default:'#ffffff'
      },
      titleColor: {
        type:String,
        default:'#333333'
      },
      titleSize: {
        type:Number,
        default:34
      },
      useNative:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        visible: true,
        isBottom:false
      }
    },
    computed:{
      titleStyles(){
        const {titleSize, titleColor} = this;
        return {
          fontSize: titleSize + 'px',
          color: titleColor
        }
      },
      navStyles(){
        const {height,isBottom} = this;
        return isBottom ? {height:height + 'px', bottom:'0'} : {height:height + 'px'}
      }
    },
    watch: {
      visible (newVal) {
        newVal ? this._slideIn() : this._slideOut();
      }
    },
    created() {
      this.height = _toNum(this.height) || 0;
      this.isBottom = this.position === 'bottom';
    },
    methods: {
      _slideOut() {
        this.getHeight((height) => {
          this.$emit('sliderOut');
        });
      },
      _slideIn(){
        this.getHeight((height) => {
          this.$emit('sliderIn');

        })
      },
      slideOut(){
        this.visible = false;
      },
      slideIn(){
        this.visible = true;
      },
      slideY(y, callback){
        animation.transition(this.$refs.nav, {
          styles:{transform:'translateY(' + y + 'px)'},
          duration:150,
          timingFunction:'ease',
          delay:0
        }, callback);
      },
      getHeight(callback) {
        return _getHeight(this.$refs.nav, callback);
      },
      leftBarClick(e){
        this.$emit('leftBarClick', e);
      }
    }
  }
</script>

<style scoped>
    .woex-nav{
      position: absolute;
      z-index: 9999;
      width:100%;
    }
    .nav-wrapper{
      height:100%;
      width: 100%;
      justify-content: center;
      align-items: center;
    }
    .title{
      text-align: center;
      justify-content:center;
      align-items:center;
      max-width:80%;
      overflow: hidden;
    }
    .leftBar{
      position:absolute;
      width: 80px;
      height:100%;
      left:0;
      top:0;
      justify-content:center;
      align-items:center
    }
  .angle{
    width:28px;
    height:28px;
    margin-top:4px;
    border-left:4px solid #333333;
    border-bottom:4px solid #333333;
    transform: rotate(45deg);
  }
  .rightBar{
    position: absolute;
    height:100%;
    top:0;
    right:0;
    justify-content:center;
    align-items:center;
  }
</style>
