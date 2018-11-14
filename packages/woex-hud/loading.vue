<template>
  <div class="woex-hud-wrapper" :style="wrapperStyle">
    <div class="hud-box" :style="boxStyle">
      <div class="hud-progress" :style="progressStyle"></div>
      <div class="hud-icon" :style="innerStyle"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      hudWidth:{
        type:Number,
        default:94
      },
      boxWidth: {
        type:Number,
        default:178
      },
      boxColor: {
        type:String,
        default:'#FFFFFF'
      },
      bgColor:{
        type:String,
        default:'rgba(0,0,0,0)'
      },
      radius:{
        type:Number,
        default:30
      },
      iconWidth: {
        type:Number,
        default:38
      },
      shadowShow: {
        type:Boolean,
        default:true
      }
    },
    computed:{
      wrapperStyle() {
        const {bgColor} = this;
        return {
          background: bgColor
        }
      },
      boxStyle() {
        const {boxWidth, boxColor, radius,shadowShow} = this;
        return {
          width: boxWidth + 'px',
          height: boxWidth + 'px',
          background: boxColor,
          borderRadius: radius + 'px',
          boxShadow: shadowShow ? '0 6px 36px 0 rgba(0,0,0,0.06)' : '',
          left: (750 - boxWidth) /2 + 'px'
        }
      },
      progressStyle() {
        const {hudWidth} = this;
        return {
          width: hudWidth + 'px',
          height: hudWidth + 'px',
          background: 'url(data:image/png;base64,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)',
          backgroundSize:'100% 100%'
        }
      },
      innerStyle() {
        const {iconWidth, boxWidth} = this;
        return {
          width:iconWidth +'px',
          height:iconWidth + 'px',
          background:'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAmCAYAAAE0DWI7AAAEpElEQVRYw8VYS4gcRRhuEV+Iik98IHgRNGouBsSDF734wINexKlXz2wYDDKQQBBzkQgqayAgCIIgHgw5GEUiCHryEE96MQpBFBVxZUWDye5mZnanuyfl91dX91Q/Z3pnd1PwMz3VVX/9z+//qz0vNwLJjmcmQsVey6/QCaWTutu9IZTsojtxhV5YuCnZ4dWOSPH3Sg8w5LP9KQ/6xbgss9I8K/VwLLDky+5qlyBiGCrxykQ7yZdcQUaS/xpJ+ZRXYhed/4/N67ULq55jnXFMoNhvZfbQ7fbd3rSh9+27sfSYnMajSg4Fmco8Vbmo4Cc3MPK7tO/fN/U4h/O4dNFIsr+gUd8GZh/Pn+d28gE5ucRVb6bODhX/rswcoWptePrw4SsphEKfL9Za3/cfiiTfC2anyMh0aqI9wvndmCOYFHIlNV3rgtmIU3HgP3bdMW/eEQr+qc2bXu3CvGS6zXZFkj3nkqPSi/l3kS+er2QGT3wItT5xKRuYhXcfVzIrkfysje7A/PqtxZnVzKHbwDBQ/EyMB+ykla4/M7NUJcUD/ZK4LRMmnc51oWyFsZTy1UpmTsJe0AcOXFPrYZ8/RmgbHypenytc4MVnw458NA1Yin7KgjrcwboncfIbkOI/2HAl9aziG1mbgNkEbNlndaARq8NWsOc00uv2LCMnH4O2eMTaagiKEGv/Jut0l98xlz0s44tz56ENifVqNwKPptfGFMDON4pwSs58sqbJnE9kkO71riowQuRuTPNY0YOQtAgt7Vtr0CDMvzOEGJuKBFb9vhMmRxujgJEQTYUVf8MG4nBTjMBgzTI4hd/vrfd+aMQI4X+vlWasT5y43IaLkazQHFQx0i/LmwOTHmAkJm0csPwZu2c4lREA7E7CJPvuzxItfi/sy09Egn9Q2jfmmSm2nsCv6fLcDbDFQQclT06tg1ZqsqHptpL6D+NeHRuS7Zq5qEr2FRh94e3UMCjbFo8jBY/CLL8EcauwkhQTvVfc7xaExUIeVjQwBO3wx/uIiDPQagl0FpZZjfsQFtkEWKU8BrCix+LjGfJ+GINv9xYX3paL7eikHGQc77OPmgJNWgHihPsWCfcW6Ina6mnaO1vkkjavttghCrWUd1HSEYhRPae7jaPkkaxArUXvUg/EyzHH4kHmytOoN7BZQ1R6LWpUDvk3To1YQ0ESm66rs4DJTGmd6V3w3BF7tkUoaPxlYFzBz5sep4qk+e07Ad63c9NJsnMmC/O9U6VQuD4lVWW7iFopuuYgiXZvqfsyrptk35Cy9JLEFLQ8Qpo6rezIscIg+RyyY0IFvtjvlG4SYj1qyxeC7NyQ7uY7IhRi7Z3Qlgp7+Cr1noYvenokx8C9BwW+7G2bUND6nrjGZW4fA63UA5l1cJu7jm55oB9Nw7xVQtH3s0CwPyI1ycY4fvjP+qC4tvoMcZw61QxcKPH1XEIBmZ/GO2QXj5wyEuHry/Ks1yuql3RnyUEBCfd2I6Gw6W83ZqwwayPFfkq/gDUcekE8WIJTEeh0+nExuZ3ZA5cmuCMOJRmEDWNC63FHdbeqeBNQ4rxz6M8cKJmxgDfGmM0I2GPXJ8//A/drcrZmoSbnAAAAAElFTkSuQmCC)',
          backgroundSize:'100% 100%',
          left: (boxWidth - iconWidth) / 2 + 'px',
          top: (boxWidth - iconWidth) / 2 + 'px'
        }
      }
    },
    methods:{
      show(e){

      }
    }
  }
</script>

<style scoped>
  .woex-hud-wrapper{
    display: flex;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top:0;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  .hud-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hud-progress{
    border-radius: 50%;
    animation:circle 2s linear infinite;
  }
  .hud-box {
    position: absolute
  }
  .hud-icon{
    position: absolute;
  }

  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
