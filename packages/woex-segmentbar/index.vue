<template>
  <div class="segment-container" :style="scrollerStyle">
    <woex-scroller class="segment-bar" show-scrollbar="false" scroll-direction="horizontal">
      <div v-bind:itemIndex="index" v-for="(item, index) in items" class="segment-item" :style="itemStyle" @click="selectItem($event, index)">
        <text class="item-text" v-bind:itemIndex="index" :style="index === selectedIndex ? selectStyle : normalStyle">{{item}}</text>
        <div class="selected-hint" v-bind:itemIndex="index" :style=" index === selectedIndex ? hintStyle : {display: 'none'}"></div>
      </div>

    </woex-scroller>

  </div>

</template>

<script>
  import WoexScroller from '../woex-scroller';

  export default {
    components: { WoexScroller },
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
      borderStyle: {
        type: Object,
        default: () =>({
        })
      },
      preset: {
        type: [ Number, String ],
        default: 0
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
          height: height + 'px'
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
    mounted(){
      const { preset } = this;
      this.selectedIndex = parseInt(preset);
    },
    methods: {
      selectItem(event, index) {
        this.selectedIndex = index;
        this.$emit('scrollToIndex', index);
      },
      switchToIndex(index) {
        this.selectedIndex = index;
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
    -webkit-overflow-scrolling: touch;
    height: 80px;
  }
  .segment-bar::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  .segment-item {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
  }
  .item-text {
    text-align: center
  }
  .selected-hint {
    background-color: #fa5e5b;
    height: 2px;
    left: 16px;
    right: 16px;
    bottom: 1px;
    position: absolute;
  }
</style>
