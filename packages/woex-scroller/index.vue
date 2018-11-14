<template>
  <div :class="wrapperClass" ref='wrapper' @touchstart.stop="touchStart"  @touchmove.stop="touchMove" @touchend.stop="touchEnd">
    <div :class="innerClass" ref="inner" :style="scrollStyle">
      <slot></slot>
    </div>
    <div ref="loadW">
      <loading class="loading" ref="loading"  v-if="loadingmore" :style="loadingStyle"></loading>
    </div>
  </div>
</template>

<script>
  import Loading from './loading.vue';

  export default {
    components: { Loading },
    props: {
      scrollDirection: {
        type: [String],
        default: 'vertical',
        validator (value) {
          return ['horizontal', 'vertical'].indexOf(value) !== -1
        }
      },
      scrollable: {
        type: [ Boolean, String ],
        default: true
      },
      loadingmore: {
        type: [ Boolean, String ],
        default: false
      },
      hasmore: {
        type: [ Boolean, String ],
        default: false
      },
      presetScrollTop: {
        type: [ Number, String ],
        default: 0
      },
      scrollStyle: {
        type: Object,
        default: ()=>({})
      }
    },
    data:()=>({
      _touchParams: null,
      loadingOffset: 0,
      loadingStatus: 0
    }),
    computed: {
      wrapperClass () {
        const classArray = ['woex-scroller-wrapper']
        if (this.scrollDirection === 'horizontal') {
          classArray.push('woex-scroller-horizontal')
        }
        else {
          classArray.push('woex-scroller-vertical')
        }
        if (!this.scrollable) {
          classArray.push('woex-scroller-disabled')
        }
        return classArray.join(' ')
      },
      innerClass() {
        const classArray = ['woex-scroller-innder']
        if (this.scrollDirection === 'horizontal') {
          classArray.push('woex-scroller-innder-horizontal')
        }
        else {
          classArray.push('')
        }

        return classArray.join(' ')
      },
      loadingStyle(){
        const { loadingOffset } = this;
        return {
          'height': loadingOffset + 'px'
        }
      }
    },
    methods: {
      touchStart(event){
        const touch = event.changedTouches[0]

        this._touchParams = {
          reachTop: this.reachTop(),
          reachBottom: this.reachBottom(),
          startTouchEvent: touch,
          startX: touch.pageX,
          startY: touch.pageY,
          timeStamp: event.timeStamp,
          scrollTop: this.$refs.wrapper.scrollTop
        }

//        if (this.loadingmore) {
//          this.hasmore ? this.$refs.loading.reset() : this.$refs.loading.end();
//        }


      },
      touchMove(event){

        if (!this._touchParams ) {
          event.preventDefault();
          return
        }


        if ('horizontal' === this.scrollDirection ) {

        }else {
          this._touchParams.reachTop = this.reachTop();
          this._touchParams.reachBottom = this.reachBottom();


          const inner = this.$refs.inner;
          if (inner) {
            const touch = event.changedTouches[0];
            const offsetY = touch.pageY - this._touchParams.startY
            const dir = offsetY > 0 ? 'down' : 'up'
            this._touchParams.offsetY = offsetY;

            if (this._touchParams.reachTop && 'down' === dir) {
              event.cancelable && event.preventDefault();
            }else if (this._touchParams.reachBottom && 'up' === dir){
              this._touchParams.bottomOffset > 0 ? this._touchParams.bottomOffset = offsetY : '';
              event.cancelable && event.preventDefault();
              if (this.loadingmore && (0 === this.loadingStatus || 3 === this.loadingStatus)) {
                if (!this.hasmore) {
                  this.$refs.loading.end();
                }
                this.pullingUp(this._touchParams.scrollTop - offsetY - this.$refs.inner.clientHeight + this.$refs.wrapper.clientHeight);
              }
            }
          }

        }
//            if ('horizontal' === this.scrollDirection ) {
//
//            }else {
//                this._touchParams.reachTop = this.reachTop();
//                this._touchParams.reachBottom = this.reachBottom();
//
//                const inner = this.$refs.inner;
//                if (inner) {
//                    const touch = event.changedTouches[0];
//                    const offsetY = touch.pageY - this._touchParams.startY
//                    const dir = offsetY > 0 ? 'down' : 'up'
//                    this._touchParams.offsetY = offsetY;
//
//                    if (this._touchParams.reachTop && 'down' === dir) {
//                        event.cancelable && event.preventDefault();
//                    }else if (this._touchParams.reachBottom && 'up' === dir){
//                        this._touchParams.bottomOffset > 0 ? this._touchParams.bottomOffset = offsetY : '';
//                        event.cancelable && event.preventDefault();
//
//                        if (this.loadingmore && (0 === this.loadingStatus || 3 === this.loadingStatus)) {
//                            this.pullingUp(this._touchParams.scrollTop - offsetY - this.$refs.inner.clientHeight + this.$refs.wrapper.clientHeight);
//                        }
//                    }
//                }
//        }
        //  }

      },
      touchEnd(event){
        if (!this._touchParams || !this.loadingmore) {
          return
        }

        if ( this.loadingmore &&  0 !== this.loadingStatus) {
          return ;
        }

        const inner = this.$refs.inner
        const { startY, reachTop, reachBottom } = this._touchParams
        if (inner) {
          const touch = event.changedTouches[0]
          const offsetY = touch.pageY - startY
          const dir = offsetY > 0 ? 'down' : 'up'
          this._touchParams.offsetY = offsetY

          if (this.hasmore && this.loadingOffset > 45 * 750 / document.body.clientWidth ) {
            this.loadingStatus = 1;
            this.startLoading();
            this.$emit('loadmore');
          }else {
            this.resetLoading();
          }
        }
        delete this._touchParams
      },
      reachTop () {
        const wrapper = this.$refs.wrapper;

        return wrapper && (wrapper.scrollTop <= 0)
      },

      reachBottom () {
        const wrapper = this.$refs.wrapper
        const inner = this.$refs.inner


        if (wrapper && inner) {

          const key = this.scrollDirection === 'horizontal'
            ? 'width'
            : 'height'
          const innerLength = 'height' === key ? this.$refs.inner.offsetHeight : this.$refs.inner.offsetWidth;
          const wrapperLength = 'height' === key ? this.$refs.wrapper.offsetHeight : this.$refs.wrapper.offsetWidth;


          const scrollOffset = this.scrollDirection === 'horizontal'
            ? wrapper.scrollLeft
            : wrapper.scrollTop

          return scrollOffset >= innerLength - wrapperLength
        }
        return false
      },
      pullingDown(){

      },
      pullingUp(offsetY = 0){

        this.$refs.loading.$el.style.transition = `height 0s`
        this.pulling(offsetY)

      },
      pulling (offsetY = 0) {
        const wrapper = this.$refs.wrapper;
        const inner = this.$refs.inner;
        const loader = this.$refs.loading;

        wrapper.scrollTop =  inner.clientHeight -  wrapper.offsetHeight + this.$refs.loadW.clientHeight;
        this.loadingOffset = offsetY;

      },
      resetLoading(){
        this.$refs.loading.$el.style.transition = `height .2s`
        this.loadingOffset = 0;
      },
      startLoading(){
        this.$refs.loading.$el.style.transition = `height .2s`
        this.loadingOffset = 45 * 750 / document.body.clientWidth;
        this.$refs.loading.start();
      },
      loadSuccess(){
        this.$refs.loading.$el.style.transition = `height .2s`
        this.loadingOffset = 0;
        this.$refs.loading.success();
        this.loadingStatus = 0;
      },
      loadEnd(){
        //加载完成
        this.$refs.loading.$el.style.transition = `height .2s`
        this.loadingOffset = 0;
        this.$refs.loading.end();
        this.loadingStatus = 3;
      },
      loadFailed(){
        //加载完成
        this.$refs.loading.$el.style.transition = `height .2s`
        this.loadingOffset = 0;
        this.$refs.loading.failed();
        this.loadingStatus = 0;
      } ,
      restore(){
        this.$refs.loading.$el.style.transition = `height 0`
        this.loadingOffset = 0;
        this.loadingStatus = 0;
        this.$refs.loading.reset();
      },
    },
    mounted(){
      const { presetScrollTop } = this;
      this.$refs.wrapper.scrollTop = parseFloat(presetScrollTop);
    }
  }
</script>

<style scoped>
  .woex-scroller-wrapper{
    display: flex;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background: #FFF;

  }
  .woex-scroller-vertical {
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    flex-direction: column;
  }
  .woex-scroller-horizontal{
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    flex-direction: row;
  }
  .woex-scroller-disabled{
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .woex-scroller-innder {
    width: 750px;
  }
  .woex-scroller-innder-horizontal {
    display: flex;
    flex-direction: row;
  }

  .loading {
    height: 0;
    overflow: hidden;
  }
</style>
