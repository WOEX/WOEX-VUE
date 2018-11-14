<template>
  <div>
    <div class="search-section" :style="searchStyle">
      <div class="search-wrapper" :style="wrapperStyle">
        <div v-if="hasHint" @click="submitEvent">
          <slot name="hint"></slot>
        </div>
        <form class="search-textfield" @submit.prevent="submitEvent" action="#">
          <woex-textfield ref="textfield"
                          @textFocus="textFocus" @textBlur="textBlur"
                          class="search-textfield" inputType="search" :height="fieldHeight" padding=28 backgroundColor="transparent" :placeholder="placehoder"
                          :fontSize="fontSize"></woex-textfield>
          <div class="search-content"  v-if="showSearchHelper && helpText && helpText.length > 0" :style="searchContentStyle" @click="touchSearchContent">
            <woex-text class="search-content-text">{{helpText}}</woex-text>
            <div class="search-content-x"></div>
          </div>
        </form>
      </div>
      <div class="cancel-btn" v-if="isFocus" @click="cancelEvent">
        <woex-text class="cancel-btn-text">取消</woex-text>
      </div>
    </div>
  </div>
</template>

<script>
  import WoexTextfield from '../woex-textfield';
  import WoexText from '../woex-text';
  export default {
    components: { WoexTextfield, WoexText },
    props:{
      placehoder: {
        type: String,
        default: ''
      },
      height: {
        type: [String, Number],
        default: 100
      },
      fontSize: {
        type: [ String, Number ],
        default: 26
      },
      fieldHeight: {
        type: [String, Number],
        default: 60
      },
      hasHint: {
        type: [ String, Boolean ],
        default: false
      },
      helpText: {
        type: String,
        default: ''
      }
    },
    data:()=>({
      isFocus: false,
      showSearchHelper: true
    }),
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
      },
      btnStyle() {
        const {  searchBgColor } = this;
        return {
          background: searchBgColor
        }
      },
      btnTextStyle() {
        const { searchFont, searchColor } = this;
        return {
          fontSize: searchFont + 'px',
          color: searchColor
        }
      },
      searchContentStyle(){
        const { fieldHeight } = this;
        return {
          top: ( fieldHeight - 52 )/ 2 + 'px'
        }
      }
    },
    methods:{
      textBlur() {
        this.$emit('searchblur');
        this.showSearchHelper = true;
      },
      textFocus() {
        this.isFocus = true;
        this.$emit('searchfocus');
        this.showSearchHelper = false;
        this.$refs.textfield.setText(this.helpText);
      },
      cancelEvent() {
        this.$emit('searchcancel');
        this.isFocus = false;
      },
      restore(){
        this.isFocus = false;
      },
      submitEvent(){
        if (this.$refs.textfield.value.length > 0) {
          this.$emit('search', this.$refs.textfield.value);
          this.$refs.textfield.blur();
        }
      },
      touchSearchContent(e){
        this.$nextTick(()=> {
          this.$refs.textfield.focus();
        })

      },
      setText(text){
        this.$refs.textfield.setText(text);
      }
    }
  }
</script>

<style scoped>
  .search-section {
    width: 750px;
    display: flex;
    flex-direction: row;
    padding-left: 34px;
    padding-right: 24px;
    align-items: center;
  }
  .search-wrapper {
    flex: 1;
    margin-right: 10px;
    background: #f5f5f5;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .search-textfield {
    background-color: transparent;
    flex: 1;
    position: relative;
  }
  .cancel-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 60px;
    text-align: right;
  }
  .cancel-btn-text {
    font-size: 28px;
    color: #4A4A4A;
  }
  .search-content {
    height: 52px;
    border-radius: 39px;
    position: absolute;
    background: #FFF;
    left: 8px;
    max-width: calc(100% - 16px);
    padding: 0 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .search-content-text {
    color: #4A4A4A;
    font-size: 26px;
    line-height: 52px;
    height: 52px;
    flex: 1;
  }
  .search-content-x {
    width: 18px;
    height: 18px;
    margin-left: 12px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURQAAAM3Nzc3NzczMzM3Nzc3Nzc7Ozs7OzszMzM3Nzc3Nzc7OzszMzM3NzczMzNRzHZgAAAAOdFJOUwBxcHR2dXdyb2aAbePkq4gWeQAAAGtJREFUCNdjWLuBAQS4bzGcewZm5b1hmPfOAchge/eSgePdEyDL710DA4PeuwAG1nePgFymd48Z7N4pgBTLvTN+9xCsjfHdu3cCYBZD3bvnDGgshCxcB8iUOLApcJMRtkFcwAJ0AcJVcJcCABz3NnVYr7AeAAAAAElFTkSuQmCC);
    background-size: 100% 100%;
  }
</style>
