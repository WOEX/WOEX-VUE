<template>
  <div class="woex-refresh-wrapper">
    <woex-lottie class="lottie" width=60 height=60 ref="lottie" :loop="loop" :animationData="animationData" @complete="complete"></woex-lottie>
  </div>
</template>

<script>
  import WoexLottie from  '../woex-lottie/index';
  import * as animationData from '../sources/json/success.json';
  import * as failedAnimationData from '../sources/json/failed.json';

 export default {
    components: { WoexLottie },
   data:() =>({

     pullingDistance: 0,
     refreshHeight:0,
     anim:null,
     text:'',
     status:0,//0：默认或下拉中,1:刷新中,2:刷新成功,3刷新失败
     loop: false,
     autoplay: false,
     animationData:animationData,
     totalFrames:71,
     completeEvent:null,
     loadHeight: 80
     }),
   watch:{
     status: function (val) {
       //如若设置不显示，则终止监听操作
       if (!this.useRefresh)
         return ;
       const _this = this;
       if (0 === val){
         this.text = '';
         this.animationData = animationData;
       }else if (1 === val) {
         this.text = '正在刷新';
         this.loop = false;
         this.completeEvent = function(){
           _this.completeEvent = undefined;
           _this.loop = true;
           _this.$refs.lottie.playSegments(Math.floor(_this.totalFrames * 0.2), Math.floor(_this.totalFrames * 0.8), true);
         };

         _this.$refs.lottie.playSegments(Math.floor(_this.totalFrames * 0.08), Math.floor(_this.totalFrames * 0.2), true);
       }else if(2 === val) {
         this.text = '刷新成功';
         _this.loop = false;
         _this.completeEvent = undefined;
         _this.$refs.lottie.playSegments(Math.floor(_this.totalFrames * 0.72), Math.floor(_this.totalFrames), true);
         _this.completeEvent = function () {
           _this.completeEvent = undefined;
         };

       }else if (3 === val) {
         this.text = '刷新失败';
         _this.loop = false;
         _this.animationData = failedAnimationData;
         _this.completeEvent = function () {
           _this.displayStatus = 'hide';
         };
         _this.$refs.lottie.playAnimation();
       }
     },
     pullingDistance: function (val) {
       //如若设置不显示，则终止监听操作

       const absHeight = Math.abs(val);


       if (0 === this.status){

         this.loop = false;
         let scale = 0;
         if(absHeight > 10) {
           scale =(absHeight - 10) / this.loadHeight;
         }

         scale = scale > 1 ? 1 : scale;
         this.$nextTick(() => {
           this.$refs.lottie.goToAndStop(Math.floor(11 * scale), true);
         });
       }
     }
   },
   methods: {
     pullingdown(e) {
       this.pullingDistance = e.pullingDistance;

       if (0 === e.pullingDistance) {
         this.status = 0;
         this.refreshShow = 'hide';
         this.$refs.lottie.stopAnimation();
       }
     },
     start(){
       this.loop = false;
       this.completeEvent = () => {
         this.$refs.lottie.setStartFrame(22);
         this.$refs.lottie.setEndFrame(58);
         this.loop = true;
         this.$refs.lottie.playSegments(22, true);
         this.completeEvent = undefined;
       };

       this.$refs.lottie.setEndFrame(22);
       this.$refs.lottie.setStartFrame(11);
       this.$refs.lottie.playSegments(11, true);
     },
     onrefresh(e){

       this.refreshShow = 'show';
       this.status = 1;
       this.$emit('onRefresh');
     },
     loadSuccess:function () {
       if (1 === this.status) {
         this.status = 2;
       }
     },
     loadFailed:function(){
       this.status = 3;
     },
     complete:function () {
       if (this.completeEvent){
         this.completeEvent();
       }
     },
     success: function (callback) {
       this.loop = false;
       this.completeEvent = () => {
         this.$refs.lottie.setStartFrame(58);
         this.$refs.lottie.setEndFrame(71);
         this.$refs.lottie.playSegments(58, true);
         this.completeEvent = () => {
           callback && callback();
         };
       };
     }

   }

 }
</script>

<style scoed>
  .woex-refresh-wrapper{
    align-items: center;
    width: 750px;
    height: 120px;
  }
  .lottie {
    position: absolute;
    bottom: 20px;
  }
</style>
