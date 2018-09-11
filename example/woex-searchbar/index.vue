<template>
  <div>
    <div class="search-section" :style="searchStyle">
      <div class="search-wrapper" :style="wrapperStyle">
        <slot name="hint" v-if="hasHint"></slot>
        <woex-textfield class="search-textfield" :height="fieldHeight" padding=28 backgroundColor="transparent" :placeholder="placehoder" :fontSize="fontSize" :fontColor="fontColor" :placeholderColor="placeholderColor"></woex-textfield>
      </div>
    </div>
  </div>
</template>

<script>
  import WoexTextfield from '../woex-textfield';
  export default {
    components: { WoexTextfield },
    props:{
      placehoder: {
        type: String,
        default: ''
      },
      height: {
        type: [String, Number],
        default: 100
      },
      placeholderColor: {
        type: String,
        default: '#A3A3A3'
      },
      fontSize: {
        type: [String, Number],
        dafault: '32'
      },
      fontColor:{
        type: String,
        default: '#333'
      },
      fieldHeight: {
        type: [String, Number],
        default: 60
      },
      hasHint: {
        type: Boolean,
        default: false
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
