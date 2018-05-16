import Vue from 'vue';

export function message(){
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.$store.commit('successShow');
      let n = 7000;
      clearTimeout(this.a);
      this.a = setTimeout(() => {
        this.$store.commit('closetipsuccess');
      },n);
    },300);
}

export default {
  install(Vue){
    Vue.prototype.message = {
      message,
    }
  }
}
