import Vue from 'vue';

export function message(){
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.$store.commit('successShow');
      clearTimeout(this.a);
      this.a = setTimeout(() => {
        this.$store.commit('closetipsuccess');
      },6000);
    },500);
}

export default {
  install(Vue){
    Vue.prototype.message = {
      message,
    }
  }
}
