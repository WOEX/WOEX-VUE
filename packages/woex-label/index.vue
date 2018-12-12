<template>
  <div class="woex-label" v-if="isNotEmptyArray" @click="onLabelClick">
      <template v-for="(item, index) in contentList">
        <woex-label-text v-if="'text' === item.type && item.value"
                         :text-value="item.value"
                         :text-style="item.style"></woex-label-text><woex-label-icon v-if="'icon' === item.type && item.src"
                         :icon-src="item.src"
                         :icon-style="item.style"></woex-label-icon><woex-label-link v-if="'link' === item.type && item.value"
                         :link-value="item.value"
                         :link-style="item.style"
                         :link-href="item.href"
                          v-bind:tag="index"></woex-label-link>
      </template>
  </div>
  <div v-else>
    <text class="woex-label-text" v-if="isString">{{contentList}}</text>
  </div>

</template>

<script>
  import WoexLabelText from './woex-label-text.vue';
  import WoexLabelIcon from './woex-label-icon.vue';
  import WoexLabelLink from './woex-label-link.vue';
  import Utils from '../utils';

  export default {
    components: { WoexLabelText , WoexLabelIcon, WoexLabelLink},
    props: {
      contentList: {
        type: [Array, String],
        default: () => ([])
      }
    },
    data: () => ({}),
    computed: {
      isNotEmptyArray () {
        return Utils.isNonEmptyArray(this.contentList);
      },
      isString () {
        return Utils.isString(this.contentList);
      }
    },
    methods: {
      onLabelClick(e){
        if (e.target.getAttribute('tag')) {
          const index = parseInt(e.target.getAttribute('tag'));
          const item = this.contentList[index];
          if (item && item.href && item.href.length > 0) {
            window.location.href = item.href;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .woex-label {
    color: #333;
    font-size: 28px;
  }
  .woex-label-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .woex-label-text {
    color: inherit;
    font: inherit;
  }
</style>
