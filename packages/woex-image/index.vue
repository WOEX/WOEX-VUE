<template>
  <div class="woex-image"></div>
</template>

<script>
  export default {
    props: {
      url: {
        type:String,
        default:''
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

        const { resize, loaded, placeholder, url  } = this;

        const backgroundSize = 'stretch' === resize.toLowerCase() ? '100% 100%' : resize;

        if (loaded ) {
          return {
            'background-size': backgroundSize,
            'background-image': 'url(' + url + ')'
          };
        }else {
          if (placeholder && placeholder.length > 0) {
            return {
              'background-size': backgroundSize,
              'background-image': 'url(' + placeholder + ')'
            };
          }else {
            return {
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
