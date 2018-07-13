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
        <image :src="currentPage == index ? v.activeIcon : v.icon"
              v-if="titleType === 'icon'"
              :style="{width: tabStyles.iconWidth + 'px',height:tabStyles.iconHeight + 'px'}"></image>
        <text
            class="tab-text"
            v-if="!titleUseSlot"
            :style="{fontSize:tabStyles.fontSize + 'px', fontWight:(currentPage === index && tabStyles.isActiveTitleBold) ? 'bold' : 'normal', color: (currentPage === index) ? tabStyles.activeTitleColor : tabStyles.titleColor, paddingLeft:tabStyles.textPaddingLeft+'px', paddingRight:tabStyles.textPaddingRight+'px'}">{{v.title}}</text>
      </div>
    </div>
  </div>
</template>

<script>
  import Utils from '../utils';

  const dom = weex.requireModule('dom');
  const animation = weex.requireModule('animation');

  export default {
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
      },
      timingFunction: {
        type: String,
        default: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      },
    },
    data: () => ({
      currentPage: 0,
      previousPage:0,
      isMoving:false
    }),
    created () {
      const { titleType, tabTitles } = this;

      this.isIphoneX = Utils.env.isIPhoneX();


    },
    methods:{
      setPage(page, url = null, animated = true){
        if (true === this.isMoving) {
          return ;
        }

        const {width} = this.tabStyles;
        const previousPage = this.currentPage;

        this.isMoving = true;
        this.previousPage = this.currentPage;
        const currentPageEl = this.$refs[`woex-tab-title-${page}`][0];

        const appearNum = parseInt(750 / width);
        const tabsNum = this.tabTitles.length;
        const offset = page > appearNum ? - (750 - width) / 2 : -width * 2;

        if (appearNum < tabsNum) {
          (previousPage > appearNum || page > 1) && dom.scrollToElement(currentPageEl, {
            offset, animated
          });

          page <= 1 && previousPage > page && dom.scrollToElement(currentPageEl, {
            offset: -width * page,
            animated
          })
        }

        this.isMoving = false;
        this.currentPage = page;
        this._animateTransformX(page, animated);

      },
      _animateTransformX (page, animated) {
        const {duration, timingFunction} = this;
        const computedDur = animated ? duration : 0.00001;
        const containerEl = this.$refs[`tab-container`];
        const dist = page * 750;
        animation.transition(containerEl, {
          styles: {
            transform: `translateX(${-dist}px)`
          },
          duration:computedDur,
          timingFunction,
          delay:0
        }, () => {

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
  }
  .tab-text {
    lines: 1;
    text-overflow: ellipsis;
  }
</style>
