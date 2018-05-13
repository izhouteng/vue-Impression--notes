import axios from 'axios'
import Vue from 'vue'

let yx = axios.create({
  baseURL:" https://www.easy-mock.com/mock/5ab65e6264bf8d1e392c165f/example"
});

// 请求笔记数据
export function noteList() {
   return yx.get('/yinxiangbiji')
}

export default {
  install(Vue){
    Vue.prototype.https = {
       noteList,
    }
  }
}
