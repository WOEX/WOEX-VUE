<template>
  <cell class="woex-cell" :style="cellStyle">
    <slot name="label">
      <div class="cell-label" v-if="label">
        <text class='cell-label-text'>{{label}}</text>
      </div>
    </slot>
    <slot name="title">
      <div class="cell-title" v-if="title">
        <text class="cell-content">{{title}}</text>
        <text class="cell-desc-text" v-if="desc">{{desc}}</text>
      </div>
    </slot>
    <slot name="value"></slot>
    <slot></slot>
    <image
      :aria-hidden="true"
      v-if="hasArrow"
      class="cell-arrow"
      :src="arrowIcon"></image>
  </cell>
</template>

<script>
  export default {
    props:{
      bgColor:{
        type:String,
        default:'#ffffff'
      },
      paddingLeft:{
        type:[Number,String],
        default:34
      },
      paddingRight:{
        type:[Number,String],
        default:34
      },
      height:{
        type:[Number, String],
        default:120
      },
      hasArrow: {
        type:Boolean,
        default:false
      },
      hasBorder:{
        type:Boolean,
        default:true
      },
      label:{
        type:String,
        default:null
      },
      title:{
        type:String,
        default:null
      },
      desc:{
        type:String,
        default:null
      },
      arrowIcon:{
        type:String,
        default:null
      }
    },
    computed:{
      cellStyle(){
        const {bgColor,paddingLeft,paddingRight,height,width,hasBorder} = this;
        return {
          backgroundColor: bgColor,
          paddingLeft: paddingLeft + 'px',
          paddingRight: paddingRight + 'px',
          height: height + 'px',
          borderBottomWidth:hasBorder ? '1px' : 0
        }
      }
    }
  }
</script>

<style scoped>
  .woex-cell{
    flex-direction: row;
    align-items: center;
    border-bottom-color: #DFDFDF;
  }
  .cell-label{
    width: 160px;
  }
  .cell-label-text{
    font-size:32px;
    color:#333333;
  }
  .cell-title{
    flex:1;
    margin-right: 10px;
  }
  .cell-content{
    font-size:32px;
    color:#333333;
    line-height: 40px;
  }
  .cell-desc-text{
    font-size: 26px;
    color:#666666;
    line-height: 32px;
  }
  .cell-arrow{
    width: 26px;
    height: 26px;
  }
</style>
