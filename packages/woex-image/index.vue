<template>
  <div class="woex-image" :style="mrImageStyle"></div>
</template>

<script>
  export default {
    props: {
      url: {
        type:String,
        default:''
      },
      imageStyle: {
        type:Object
      },
      resize: {
        type:String,
        default:'stretch'
      },
      placeholder: {
        type:String,
        default:''
      }
    },
    data:()=>({
      loaded: false
    }),
    computed: {
      mrImageStyle() {

        const { imageStyle, resize, loaded, placeholder, url  } = this;

        const backgroundSize = 'cover' === resize ? 'cover' : '100% 100%';

        if (loaded ) {
          return {
            ...imageStyle,
            'background-size': backgroundSize,
            'background-image': 'url(' + url + ')'
          };
        }else {
          if (placeholder && placeholder.length > 0) {
            return {
              ...imageStyle,
              'background-size': backgroundSize,
              'background-image': 'url(' + placeholder + ')'
            };
          }else {
            return {
              ...imageStyle,
              'background-size': backgroundSize
            };
          }
        }
      }
    },
    watch:{
      url(val) {
        this.loadUrl(val);
      }
    },
    methods: {
      loadUrl(url){
        if (null === url || undefined === url) {
          return ;
        }

        if (url.indexOf('http') === 0) {
          let image = new Image();
          image.src = url;

          image.completed = ()=> {
            if (url === this.url) {
              this.loaded = true;
            }
          }

          image.onload = ()=> {
            if (url === this.url) {
              this.loaded = true;
            }
          }
        }else  {
          this.loaded = true;
        }
      }
    },
    mounted(){

      this.loadUrl(this.url);
    }
  }
</script>

<style scoped>
  .woex-image {
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
</style>
