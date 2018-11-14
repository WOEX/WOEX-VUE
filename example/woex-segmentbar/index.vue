<template>
  <div class="segment-container" :style="scrollerStyle">
    <div class="segment-bar" show-scrollbar="false" scroll-direction="horizontal" :style="segementStyle">
      <div v-bind:itemIndex="index" v-for="(item, index) in items" class="segment-item" :style="itemStyle" @click="selectItem">
        <text class="item-text" v-bind:itemIndex="index" :style="index === selectedIndex ? selectStyle : normalStyle">{{item}}</text>
        <div class="selected-hint" v-bind:itemIndex="index" :style=" index === selectedIndex ? hintStyle : {display: 'none'}"></div>
      </div>

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
      segementStyle(){
        const { height } = this;
        return {
          height: (parseFloat(height) + 40) + 'px'
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
    -webkit-overflow-scrolling: touch;
  }
  .segment-bar{
    width: 750px;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
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
</style>
