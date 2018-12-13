<template>
<article class="alert-wrapper">
    <section class="alert-content">
      <div class="border-1px-bottom">
        <woex-text class="title-text" :style="titleStyle">{{title}}</woex-text>
      </div>
      <div class="alert-btns" v-if="otherText.length > 0">
        <div class="alert-item" @click="otherTapEvent">
          <woex-text class="alert-item-text border-1px-right" :style="cancelStyle">{{cancelText}}</woex-text>
        </div>
        <div class="alert-item" @click="cancelTapEvent">
          <woex-text class="alert-item-text" :style="otherStyle">{{otherText}}</woex-text>
        </div>
      </div>
      <div class="alert-btns" v-else="">
        <div class="alert-item" @click="cancelTapEvent">
          <woex-text class="alert-item-text" :style="cancelStyle">{{cancelText}}</woex-text>
        </div>
      </div>
    </section>
</article>
</template>

<script>
  import WoexText from '../woex-text';

  export default {
    components: { WoexText },
    props: {
        title: {
          type: String,
          default: ''
        },
      cancelText: {
          type: String,
          default: '取消'
      },
      otherText: {
          type: String,
          default: ''
      },
      titleStyle: {
          type: Object,
          default: ()=>({
          })
      },
      cancelStyle: {
        type: Object,
        default: ()=>({})
      },
      otherStyle: {
        type: Object,
        default: ()=>({})
      }
    },
    methods: {
      cancelTapEvent: function() {
        this.$emit('cancel');
      },
      otherTapEvent: function() {
        this.$emit('other');
      }
    }
  }
</script>

<style scoped>
  @import "../css/border.css";

  .alert-wrapper{
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .alert-content{
    background: #fff;
    width: 640px;
    border-radius: 16px;
    overflow: hidden;
    animation-name: alert-animation;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-duration: .4s;
  }
  .title-text{
    position: relative;
    margin: 32px 24px;
    text-align: center;
    color: #333;
    font-size: 32px;
    line-height: 40px;
  }
  .alert-btns{
    display: flex;
    flex-direction: row;
  }
  .alert-item{
    flex: 1;
    position: relative;
  }
  .alert-item-text{
    height:80px;
    line-height: 80px;
    text-align: center;
    color: #007EE6;
    font-size: 32px;
  }

  @keyframes alert-animation {
    0% {
      transform: scale(1, 1);
    }
    60% {
      transform: scale(1.05, 1.05);
    }
    100% {
      transform: scale(1, 1);
    }
  }
</style>
