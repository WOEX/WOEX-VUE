import Loading from './loading.vue'

const WoexHud = {
  install (Vue) {
    function $loading (options) {
      let loading
      const WoexHud = Vue.extend(Loading)

      return new Promise((resolve) => {
        if (!loading) {
          loading = new WoexHud({ propsData: options })
          loading.ref = 'woexLoading'

          const el = this.$el ? this.$el : document.querySelector('body')
          loading.$mount(el)
          this.$refs.woexLoading = loading
        }
        resolve()
      })
    }
    function $unloading () {
      return new Promise((resolve) => {
        const el = this.$el
        if (el) {
          const loading = this.$refs.woexLoading

          if (loading) {
          //  el.$remove(loading)
            loading.$destroy()
         //   el.$forceUpdate()
           // console.log(this.$refs)
          }
        }
        resolve()
      })
    }

    Vue.$loading = Vue.prototype.$loading = $loading
    Vue.$unloading = Vue.prototype.$unloading = $unloading
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(WoexHud)
}

export default WoexHud
