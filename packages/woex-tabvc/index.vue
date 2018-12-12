<template>
  <div class="woex-tab-page" ref="page">
    <div class="tab-wrap" :style="{backgroundColor:wrapBgColor}">
      <div class="tab-container" ref="tab-container">
        <slot></slot>
      </div>

    </div>
    <div class="tab-bar"
          :style="{backgroundColor: tabStyles.bgColor, height:(tabStyles.height + (isIphoneX ? 78 : 0)) + 'px', paddingBottom:isIphoneX ? '78px' : '0'}">
      <div class="bar-item"
           v-for="(v, index) in tabTitles"
           :key="index"
           :ref="'woex-tab-title-' + index"
           @click="setPage(index, v.url)"
           :style="{width:tabStyles.width + 'px',height:tabStyles.height + 'px'}"
           :accessible="true"
           :arial-label="`${v.title?v.title: '标签' + index}`"
      >
        <woex-image
          :url="currentPage == index ? v.activeIcon : v.icon"
              v-if="titleType === 'icon'"
              :style="{width: tabStyles.iconWidth + 'px',height:tabStyles.iconHeight + 'px'}"></woex-image>
        <woex-text
            class="tab-text"
            v-if="!titleUseSlot"
            :style="{fontSize:tabStyles.fontSize + 'px', fontWight:(currentPage === index && tabStyles.isActiveTitleBold) ? 'bold' : 'normal', color: (currentPage === index) ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:tabStyles.textPaddingLeft+'px', paddingRight:tabStyles.textPaddingRight+'px'}">{{v.title}}</woex-text>
      </div>
    </div>
  </div>
</template>

<script>
  import Utils from '../utils';
  import UiUtils from '../utils/ui';
  import Velocity from 'velocity-animate';
  import WoexText from '../woex-text';
  import WoexImage from '../woex-image';

  export default {
    components: { WoexText, WoexImage},
    props: {
      tabTitles: {
        type: Array,
        default: () =>([])
      },
      tabStyles: {
        type:Object,
        default: () => ({
          bgColor: '#FFFFFF',
          titleColor: '#BCBCBC',
          activeTitleColor: '#FA5E5B',
          isActiveTitleBold: true,
          iconWidth:60,
          iconHeight:60,
          height:100,
          fontSize:22
        })
      },
      titleType: {
        type: String,
        default: 'icon'
      },
      titleUseSlot: {
        type: Boolean,
        default: false
      },
      wrapBgColor: {
        type:String,
        default: '#FFFFFF'
      },
      duration: {
        type: [Number, String],
        default: 300
      }
    },
    data: () => ({
      currentPage: 0,
      previousPage:0,
      isMoving:false
    }),
    created () {
      this.isIphoneX = Utils.env.isIPhoneX();
    },
    methods:{
      setPage(page, url = null, animated = true){

        if (true === this.isMoving) {
          return ;
        }

        if (page === this.currentPage) {
          return ;
        }

        const {width} = this.tabStyles;
        const previousPage = this.currentPage;

        this.isMoving = true;
        this.previousPage = this.currentPage;
        const currentPageEl = this.$refs[`woex-tab-title-${page}`][0];


        const contentWidth = UiUtils.contentWidth();
        const appearNum = parseInt(contentWidth / width);
        const tabsNum = this.tabTitles.length;
      if (appearNum < tabsNum) {

          if (previousPage > appearNum || page > 1){
            Velocity(currentPageEl, {offset: -width * page});
          }else if (page <= 1 && previousPage > page) {
            Velocity(currentPageEl, {offset: -width * page});
          }
        }

        this.currentPage = page;
        this._animateTransformX(page, animated, ()=> { this.isMoving = false });

      },
      _animateTransformX (page, animated, complete) {

        const {duration} = this;
        const computedDur = animated ? duration : 0.00001;
        const containerEl = this.$refs[`tab-container`];
        const dist = page * 750;
        Velocity(containerEl, {
          translateX: UiUtils.canvas2rem(-dist)
        },{
          duration: computedDur,
          complete: complete
        });
      }
    }
  }
</script>

<style scoped>
  .woex-tab-page
  {
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0
  }
  .tab-wrap{
    flex:1;
    width:750px;
    overflow: hidden;
  }
  .tab-container {
    flex: 1;
    flex-direction: row;
    position: absolute;
  }
  .tab-bar
  {
    flex-direction: row;
    justify-content: space-around;
    box-shadow: 0 -4px 16px rgba(0,0,0,0.04);
  }
  .bar-item
  {
    justify-content: center;
    align-items: center;
    border-bottom-style: solid;
    /*display: flex;*/
    /*flex-direction: row;*/
    /*outline: none;*/
    /*background: #fff*/
  }
  .tab-text {
    lines: 1;
    text-overflow: ellipsis;
  }
</style>
