<template>
  <div class="slider" ref="slider" @touchstart.prevent="touchStartEvent"  @touchmove.prevent="touchMoveEvent" @touchend.prevent="touchEndEvent">
    <ul class="slider-inner" v-if="1 === imageArray.length">
      <li class="slider-li">
        <div class="slider-li-image" :style="{ 'background-image': 'url(' + imageArray[0] + ')'}"></div>
      </li>
    </ul>
    <ul class="slider-inner"  v-else-if="2 === imageArray.length" :style="{'transform': 'translate3d(' +  translateRatio * 750 +'px, 0, 0)'}">
      <li class="slider-li"  :style="{'transform': 'translate3d(' + calculateX[0]  * 750 +'px, 0, 0)'}">
        <div class="slider-li-image" :style="{ 'background-image': 'url(' + imageArray[1] + ')'}"></div>
      </li>
      <li class="slider-li"  :style="{'transform': 'translate3d(' + calculateX[1] * 750 +'px, 0, 0)'}">
        <div class="slider-li-image" :style="{ 'background-image': 'url(' + imageArray[0] + ')'}"></div>
      </li>
      <li class="slider-li"  :style="{'transform': 'translate3d(' + calculateX[2]  * 750 +'px, 0, 0)'}">
        <div class="slider-li-image" :style="{ 'background-image': 'url(' + imageArray[1] + ')'}"></div>
      </li>
      <li class="slider-li"  :style="{'transform': 'translate3d(' + calculateX[3]  * 750 +'px, 0, 0)'}">
        <div class="slider-li-image" :style="{ 'background-image': 'url(' + imageArray[0] + ')'}"></div>
      </li>
    </ul>
    <ul class="slider-inner" v-else-if="3 <= imageArray.length" :style="{'transform': 'translate3d(' +  translateRatio * 750 +'px, 0, 0)'}">
      <li class="slider-li"v-for="(url, index) in imageArray" :key="index"  :style="{'transform': 'translate3d(' + calculateX[index]  * 750 +'px, 0, 0)'}">
        <div class="slider-li-image" :style="{ 'background-image': 'url(' + url + ')'}"></div>
      </li>
    </ul>
  </div>
</template>
<script>



  export default {
    props: {
      interval:{
        type: [ String, Number ],
        default: 3000
      },
      auto: {
        type: [ String, Boolean ],
        default: true
      },
      infinite: {
        type: [ String, Boolean ],
        default: true
      },
      scrollable: {
        type: [ String, Boolean],
        default: true
      },
      imageArray: {
        type: [ Array ],
        default: () => ([
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539095216629&di=79248915b871a5cc99f6d9260922af2a&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fbizhi%2Fipad3%2F2014%2F0522%2F20140522084820919_ipad3.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540290657&di=52761552dab0079fb1aaad489a1080cd&imgtype=jpg&er=1&src=http%3A%2F%2Fdik.img.lgdsy.com%2Fpic%2F5%2F2802%2Ffb4b75c6cf73dd1e.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539695937756&di=f0d7322e0e01e0c416f179341cc2df93&imgtype=0&src=http%3A%2F%2Fuploads.xuexila.com%2Fallimg%2F1708%2F28-1FPR21417.jpg',
          //'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539095216629&di=79248915b871a5cc99f6d9260922af2a&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fbizhi%2Fipad3%2F2014%2F0522%2F20140522084820919_ipad3.jpg',
          //  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539095216629&di=79248915b871a5cc99f6d9260922af2a&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fbizhi%2Fipad3%2F2014%2F0522%2F20140522084820919_ipad3.jpg'
        ])
      }
    },
    data: ()=>({
      index: 0,
      translateRatio: 0,
      touchStartX: 0,
      touchDirection: 0,//0：左，1：右
      animateInterval: null,
      touchTimeout: null
    }),
    mounted(){
      const { auto } = this;
      if (auto) {

      }
    },
    computed:{
      calculateX(){
        const { index, imageArray, translateRatio } = this;

        const result = [];

        const len = imageArray.length;

        if (undefined === len || 1 === len || 0 === len) {
          result[0] = 0;
        }else if (2 === len) {
          let positive = translateRatio <= 0 ? -1 : 1;
          const currentIndex = 1 == positive ? Math.floor(translateRatio) % 4 : Math.floor(-translateRatio) % 4 + 1;
          const distance =  -positive * Math.floor( Math.abs(translateRatio / 4)) * 4;
          result[currentIndex % 4] = -positive * currentIndex - 1 + distance;
          result[(currentIndex  + 1) % 4] = -positive * currentIndex + distance;
          result[(4 + currentIndex - 1) % 4] = -positive * currentIndex - 2 + distance;
        }else {
          const positive = translateRatio <= 0 ? -1 : 1;
          let currentIndex = Math.floor(-translateRatio) % len;

          if (-1 ==  positive) {
            const distance = Math.floor( Math.abs(translateRatio / len)) * len;
            result[currentIndex % len] =currentIndex + distance ;
            result[(currentIndex  + 1) % len] =  currentIndex + 1 + distance;
            result[(len + currentIndex - 1) % len] = currentIndex - 1 + distance;
          }else {
            const distance = -Math.floor( Math.abs((Math.ceil(translateRatio)) / len)) * len;
            const targetIndex = (len - Math.abs(currentIndex) % len) % len;
            result[targetIndex] =  -Math.abs(currentIndex) % len + distance ;
            result[(targetIndex  + 1) % len] =  -Math.abs(currentIndex) % len + 1 + distance;
            result[(len + targetIndex - 1) % len] =  -Math.abs(currentIndex) % len - 1 + distance;
          }
        }

        return result
      }
    },
    methods: {
      touchStartEvent(e){
        clearInterval(this.animateInterval);
        this.touchStartX = e.touches[0].pageX;
      },
      touchMoveEvent(e){
        const distance = e.touches[0].pageX - this.touchStartX;
        const scale = distance / this.$refs.slider.offsetWidth;
        this.translateRatio += scale;
        this.touchStartX = e.touches[0].pageX;

        scale > 0 ? this.touchDirection = 1 : this.touchDirection = 0;

      },
      touchEndEvent(){
        this.touchStartX = 0;
        if ( 0 === this.touchDirection ) {//左滑
          const target = Math.floor(this.translateRatio);

          this.animateInterval = setInterval(()=> {
            this.translateRatio -= 0.01;
            if (this.translateRatio <= target + 0.02) {
              this.translateRatio = target;
              clearInterval(this.animateInterval);
            }
          }, 2);
        }else {//右滑
          const target = Math.ceil(this.translateRatio);

          this.animateInterval = setInterval(()=> {
            this.translateRatio += 0.01;
            if (this.translateRatio >= target - 0.02) {
              this.translateRatio = target;
              clearInterval(this.animateInterval);
            }
          }, 2);
        }
      }
    },
    beforeDestroy(){

      clearTimeout(this.touchTimeout);
      clearInterval(this.animateInterval);
    }
  }
</script>
<style scoped>
  .slider{
    display: flex;
    flex-direction: column;
  }
  .slider-inner {
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: visible;

  }
  .slider-li {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .slider-li-image {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;

  }
</style>
