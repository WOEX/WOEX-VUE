<template>
  <div class="field-wrapper">
    <div class="field-item border-left border-right"></div>
    <div class="field-item border-right"></div>
    <div class="field-item border-right"></div>
    <div class="field-item border-right"></div>
    <div class="field-item border-right"></div>
    <div class="field-item border-right"></div>
  </div>
</template>

<script>
  export default {

  }
</script>
<style scoped>
  .field-wrapper{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .field-item {
    height: 100px;
    width: 105px;
    background: #fff;
    border-top: 0.5px solid #CBCBCB;
    border-bottom: 0.5px solid #CBCBCB;
  }
  .border-left {
    border-left: 0.5px solid #CBCBCB;
  }
  .border-right {
    border-right: 0.5px solid #CBCBCB;
  }
</style>
