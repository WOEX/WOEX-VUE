<template>
  <div>
    <div class="search-section" :style="searchStyle">
      <div class="search-wrapper" :style="wrapperStyle">
        <woex-image v-if="hasHint && hintUrl" :style="hintStyle" :url="hintUrl">
        </woex-image>
        <woex-text v-if="hasHint && hintText" >{{ hintText }}</woex-text>
        <woex-textfield class="search-textfield" :height="fieldHeight" padding=28 backgroundColor="transparent" :style="fieldStyle"></woex-textfield>
      </div>
    </div>
  </div>
</template>

<script>
  import WoexImage from '../woex-image';
  import WoexTextfield from '../woex-textfield';
  import WoexText from '../woex-text';
  export default {
    components: { WoexTextfield, WoexImage, WoexText },
    props:{
      placehoder: {
        type: String,
        default: ''
      },
      height: {
        type: [String, Number],
        default: 100
      },
      fieldStyle: {
        type: Object,
        dafault: {
        }
      },
      fieldHeight: {
        type: [String, Number],
        default: 60
      },
      hasHint: {
        type: Boolean,
        default: false
      },
      hintUrl: {
        type: String
      },
      hintText: {
        type: String
      },
      hintStyle: {
        type: Object,
        default: {
          width: '40px',
          height: '40px'
        }
      }
    },
    computed: {
      searchStyle() {
        const { height } = this;
        return {
          height: height + 'px'
        }
      },
      wrapperStyle() {
        const { fieldHeight } = this;
        return {
          height: fieldHeight + 'px',
          borderRadius: parseFloat(fieldHeight) / 2 + 'px',
          paddingLeft: parseFloat(fieldHeight) / 2 + 'px'
        }
      }
    }
  }
</script>

<style scoped>
  .search-section {
    width: 750px;
  }
  .search-wrapper {
    width: 682px;
    margin: 20px 34px;
    background: #f5f5f5;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .search-textfield {
    background-color: transparent;
    flex: 1
  }
</style>
