<template>
    <canvas :style="canvasStyle" class="weex-ct" ref='canvasContainer'></canvas>
</template>

<script>
  import lottie from './woex-lottieFrame';

  export default {

    props:{
      height:{
        type:[Number, String]
      },
      width:{
        type:[Number, String]
      },
      options: {
        type:Object
      },
      autoplay: {
        type:[Boolean, String]
      },
      animationData:{
        type:Object
      },
      loop: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      loop(val) {
        this.anim.loop = val;
      }
    },
    data () {
      return {
        canvasStyle:{
          width: this.width ? `${this.width}px` : '100%',
          height: this.height ? `${this.height}px` : '100%'
        }
      }
    },
    mounted () {

      this.anim = lottie.loadAnimation({
          container: this.$refs.canvasContainer,
          renderer: 'canvas',
          loop: this.loop !== false,
          autoplay: this.autoplay !== false,
          animationData: this.animationData
        });

        this.anim.onLoopComplete = ()=>{
          this.$emit('complete');
        }

        this.anim.onComplete = ()=>{
          this.$emit('complete');
        }
    },
    methods:{
      //跳到指定位置
      goToAndStop: function (val, isFrame) {
          this.anim.goToAndStop(val, isFrame);
      },
      //从指定帧开始播放,frame:帧数, fource:是否强制开始
      playSegments: function (frame, force) {
          this.anim.playSegments(frame, force);
      },
      //停止动画
      stopAnimation: function(){
        this.anim.stop();
      },
      setEndFrame(frame) {
        this.anim.totalFrames = frame;
      },
      setStartFrame(frame) {
        this.anim.startFrame = frame;
      },
      loopComplete(){
        console.log('compelete');
      }
    }
  }
</script>
