<template>
  <div class="segment-container" :style="scrollerStyle">
    <div class="segment-inner">
      <scroller class="segment-bar" show-scrollbar="false" scroll-direction="horizontal">
        <div v-bind:itemIndex="index" v-for="(item, index) in items" class="segment-item" :style="itemStyle" @click="selectItem">
          <text class="item-text" v-bind:itemIndex="index" :style="index === selectedIndex ? selectStyle : normalStyle">{{item}}</text>
          <div v-if="hasBorder" :style="borderStyle" class="segment-border"></div>
          <div class="selected-hint" v-bind:itemIndex="index" :style=" index === selectedIndex ? hintStyle : {display: 'none'}"></div>
        </div>
      </scroller>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      height: {
        type: [Number, String],
        default: 80
      },
      items: {
        type: Array,
        default: []
      },
      itemWidth: {
        type: [Number, String],
        default: 150
      },
      textStyle: {
        type: Object,
        default: () =>({
          color: '#999',
          fontSize: '28px'
        })
      },
      selectedColor: {
        type: String,
        default: '#999'
      },
      hintStyle: {
        type: Object,
        default: () =>({
        })
      },
      hasBorder: {
        type: [String, Boolean],
        default: true
      },
      borderStyle: {
        type: Object,
        default: () =>({
        })
      }
    },
    data: () => ({
      selectedIndex: 0
    }),
    computed: {
      scrollerStyle(){
        const { height } = this;
        return {
          height: height + 'px'
        }
      },
      itemStyle() {
        const { height, itemWidth } = this;
        return {
          height: height + 'px',
          width: itemWidth + 'px'
        }
      },
      normalStyle() {
        const { textStyle } = this;
        return textStyle;
      },
      selectStyle() {
        const { textStyle, selectedColor } = this;
        return {
          ...textStyle,
          color: selectedColor
        }
      }
    },
    methods: {
      selectItem(event) {
        const index = parseInt(event.target.getAttribute('itemIndex'));
        this.selectedIndex = index;
        this.$emit('scrollToIndex', index);
      }
    }
  }
</script>

<style scoped>
  .segment-container {
    width: 750px;
    overflow: hidden;
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }
  .segment-inner {
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    overflow: hidden;
    overflow-x: scroll;
  }
  .segment-bar{
    width: 100%;
    -webkit-overflow-scrolling: auto;
  }
  .segment-bar::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .segment-item {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-text {
    text-align: center
  }
  .selected-hint {
    background-color: #fa5e5b;
    height: 2px;
    width: 40px;
    bottom: 0;
    position: absolute;
  }
  .segment-border{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #ddd;
  }
</style>
