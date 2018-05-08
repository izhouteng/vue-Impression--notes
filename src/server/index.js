import axios from 'axios'
import Vue from 'vue'

const vm = axios.create({
   baseURL:' https://www.easy-mock.com/mock/5ab65e6264bf8d1e392c165f/example'
})

export function getList(){
   return vm.get('/yinxiangbiji')
}

export default {
  install(Vue){
     Vue.prototype.https = {
        getList,
     }
  }
}
