<template>
  <div class="wxc-demo">
    <scroller class="scroller">
      <title title="woex-image"></title>
      <category title="类型样式"></category>
      <div class="image-list">
        <text class="image-text">默认样式图片</text>
        <woex-image style="width:300px;height:400px" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522751243765&di=c2d72f865be57ed6ce2e9a31061232c1&imgtype=0&src=http%3A%2F%2Fpic24.photophoto.cn%2F20120706%2F0020033053278048_b.jpg"></woex-image>
      </div>
      <div class="image-list">
        <text class="image-text">stretch样式图片（默认）</text>
        <woex-image style="width:300px;height:400px" resize="stretch" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522751243765&di=c2d72f865be57ed6ce2e9a31061232c1&imgtype=0&src=http%3A%2F%2Fpic24.photophoto.cn%2F20120706%2F0020033053278048_b.jpg"></woex-image>
      </div>
      <div class="image-list">
        <text class="image-text">cover样式图片（默认）</text>
        <woex-image style="width:300px;height:400px" resize="cover" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522751243765&di=c2d72f865be57ed6ce2e9a31061232c1&imgtype=0&src=http%3A%2F%2Fpic24.photophoto.cn%2F20120706%2F0020033053278048_b.jpg"></woex-image>
      </div>
      <div class="image-list">
        <text class="image-text">contain样式图片（默认）</text>
        <woex-image style="width:300px;height:400px" resize="contain" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522751243765&di=c2d72f865be57ed6ce2e9a31061232c1&imgtype=0&src=http%3A%2F%2Fpic24.photophoto.cn%2F20120706%2F0020033053278048_b.jpg"></woex-image>
      </div>
      <div class="image-list">
        <text class="image-text">placeholder样例</text>
        <woex-image style="width:300px;height:400px" placeholder="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522751243765&di=c2d72f865be57ed6ce2e9a31061232c1&imgtype=0&src=http%3A%2F%2Fpic24.photophoto.cn%2F20120706%2F0020033053278048_b.jpg" url="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522754770786&di=216a82c5485406fa5533e8178c4d625c&imgtype=0&src=http%3A%2F%2Fi3.bbs.fd.zol-img.com.cn%2Ft_s800x5000%2Fg5%2FM00%2F0D%2F05%2FChMkJ1nHsj-IIee4AAIcxwQMwfYAAgwNgIrKKYAAhzf533.jpg"></woex-image>
      </div>
    </scroller>
  </div>
</template>

<style scoped>
  .wxc-demo {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #f5f5f5;
  }
  .scroller {
    flex: 1;
  }
  .image-list{
    padding-left: 17px;
  }
  .image-text{
    margin-top: 24px;
    margin-bottom:16px;
    margin-left:8px;
  }
</style>

<script>
  import Title from '../_mods/title.vue';
  import Category from '../_mods/category.vue';
  import { setTitle } from '../_mods/set-nav';
  import {WoexImage} from '../../index';

  export default {
    components: { Title, Category, WoexImage}
  }
</script>
