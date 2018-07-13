import lottie from './woex-lottieFrame';
function getWoexLottie () {
  return {
    name: 'woex-lottie',
    props: {
      options: {
        type:Object
      },
      height:{
        type:[Number, String]
      },
      width:{
        type:[Number, String]
      }
    },
    data () {
      return {
        canvasStyle:{
          width: this.width ? `${this.width}px` : '100%',
          height: this.height ? `${this.height}px` : '100%',
          overflow: 'hidden',
          margin: '0 auto'
        }
      }
    },
    mounted () {
      this.anim = lottie.loadAnimation({
        container: this.$refs.canvasContainer,
        renderer: 'canvas',
        loop: this.options.loop !== false,
        autoplay: this.options.autoplay !== false,
        animationData: this.options.animationData,
        rendererSettings: this.options.rendererSettings
      })
      this.$emit('animCreated', this.anim);
    },
    render (createElement) {
      return createElement('canvas', {
        ref: 'canvasContainer',
        staticClass: 'weex-ct',
        style:this.canvasStyle
      })
    }
  }
}

//添加引用
if (typeof window !== 'undefined' && window.Vue) {

  window.Vue.use(WoexHud);
}

export default {
  init (weex) {
    weex.registerComponent('woex-lottie', getWoexLottie())
  }
}

