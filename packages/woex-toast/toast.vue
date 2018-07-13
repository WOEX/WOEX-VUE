<template v-if="false">
  <div class="woex-toast-wrapper">
    <transition name="bounce">
      <div class="toast-box" :style="boxStyle" v-if="show">
        <text class="toast-text" :style="textStyle">{{text}}</text>
      </div>
    </transition>
  </div>
</template>

<style scoped>
  .woex-toast-wrapper{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top:0;
    align-items: center;
    justify-content: center;
  }
  .toast-box{
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding:16px 20px;
  }
  .toast-text{
    text-align: center;
    word-break: break-all;
    max-width: 560px;
    lines:4;
  }
  .bounce-enter-active{
    animation:bounce-in .5s;
  }
  .bounce-leave-active{
    animation: bounce-out .5s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.1);

    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
    @keyframes bounce-out {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.8);
        opacity: 0;
      }
  }

</style>

<script>
  export default {
    props:{
      textColor: {
        type:String,
        default:'#ffffff'
      },
      textSize:{
        type:Number,
        default:28
      },
      bgColor:{
        type:String,
        default:'rgba(0,0,0,0.7)'
      },
      text:{
        type:String,
        default:' '
      },
      duration:{
        type:Number,
        default:2000
      }
    },
    data(){
      return {
        show: false,
        fininshed:false
      }
    },
    computed:{
      textStyle(){
        const {textColor,textSize} = this;
        return {
          color:textColor,
          fontSize:textSize + 'px'
        }
      },
      boxStyle(){
        const {bgColor} = this;
          return {
            background:bgColor
          }
      }
    },
    mounted(){
      const _this = this;
        this.show = true;
        //判断非法输入
        if(this.duration < 0) {
          this.duration = 2000;
        }

        setTimeout(function(){
            _this.show = false;
            setTimeout(function () {
              _this.fininshed = true;
              _this.$el.parentNode.removeChild(_this.$el);
              _this.$destroy();
            }, 500);

        }, this.duration);
    }
  }
</script>
