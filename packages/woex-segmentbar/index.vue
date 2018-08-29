<template>
  <scroller class="segment-bar" show-scrollbar="false" scroll-direction="horizontal" :style="scrollerStyle">
    <div v-bind:itemIndex="index" v-for="(item, index) in items" class="segment-item" :style="itemStyle" @click="selectItem">
      <text class="item-text" v-bind:itemIndex="index">{{item}}</text>
      <div class="selected-hint" v-bind:itemIndex="index" :style=" index === selectedIndex ? hintStyle : {display: 'none'}"></div>
    </div>
  </scroller>
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
        default: {
          color: '#999',
          fontSize: '28px'
        }
      },
      hintStyle: {
        type: Object,
        default: {
          color: 'blue'
        }
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
      itemStyle(){
        const { height, itemWidth } = this;
        return {
          height: height + 'px',
          width: itemWidth + 'px'
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
  .segment-bar{
    width: 100%
  }
  .segment-item {
    flex-direction: column;
    justify-content: center;
  }
  .item-text {
    text-align: center
  }
  .selected-hint {
    background-color: #fa5e5b;
    height: 6px;
    width: 80%;
    bottom: 0;
    left: 10%;
    position: absolute;
  }
</style>
