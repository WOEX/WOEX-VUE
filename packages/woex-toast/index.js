import Toast from './toast.vue';

const WoexToast = {
  install(Vue){

    function $toast(text, duration,options){

      const WoexToast = Vue.extend(Toast);

      let toast = null;

      return new Promise((resolve) => {
        toast = new WoexToast({propsData:{text: text, duration: duration, options}});
        toast.$mount();
        let el = this.$el ? this.$el : document.querySelector('body');
        el.appendChild(toast.$el);
        resolve();
      })
    }

    Vue.toast = Vue.prototype.$toast = $toast;
  }
};

export default WoexToast;
