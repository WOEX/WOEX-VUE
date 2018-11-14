<template>
  <div class="loading">
    <div v-if="0 === loadingStatus">
      <text class="loading-text text-top">松开加载更多</text>
    </div>
    <div v-if="1 === loadingStatus">
      <div class="circle-wrapper">
        <div class="circle circle-01"></div>
        <div class="circle circle-02"></div>
      </div>
      <text class="loading-text top-padding loading-duration">正在加载</text>

    </div>
    <div v-else-if="2 === loadingStatus">
      <text class="loading-text top-padding">加载完成</text>
    </div>
    <div v-else-if="3 === loadingStatus">
      <text class="loading-text top-padding">无更多数据 </text>
    </div>
    <div v-else-if="4 === loadingStatus">
      <text class="loading-text top-padding">加载失败 </text>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loadingStatus: 0
    }),
    methods: {
      reset(){
        this.loadingStatus = 0;
      },
      start(){
        this.loadingStatus = 1;
      },
      success(){
        this.loadingStatus = 2;
      },
      end() {
        this.loadingStatus = 3;
      },
      failed() {
        this.loadingStatus = 4;
      }

    }
  }
</script>

<style scoped>
  .text-top {
    margin-top: 40px;
  }

  .top-padding{
    margin-top: 6px;
  }
  .loading-text {
    font-size: 26px;
    color: #999;
    height: 26px;
    line-height: 26px;
    text-align: center;
  }
  .circle-wrapper {
    margin-top: 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 30px;
  }
  .circle {
    width: 20px;
    height: 20px;
    border-radius: 10px;
    margin: 0 10px;
  }
  .circle-01 {
    background: #999;
    animation-name: around-01;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  .circle-02 {
    background: #DDD;
    animation-name: around-02;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes around-01 {
    0% {
      transform: translateX(0);
    }
    45% {
      transform: translateX(45px);
    }
    95% {
      transform: translateX(-5px);
    }
    100% {
      transform: translate(0);
    }
  }
  @keyframes around-02 {
    0% {
      transform: translateX(0);
    }
    45% {
      transform: translateX(-45px);
    }
    95% {
      transform: translateX(5px);
    }
    100% {
      transform: translate(0);
    }
  }

  .loading-duration:after {
    position: absolute;
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    animation: ellipsis .6s infinite;
    content: "\2026";
  }

  @keyframes ellipsis {
    from {
      width: 2px;
    }
    to {
      width: 20px;
    }
  }

</style>
