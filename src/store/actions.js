export default {
  // 请求的总数据
  success(state,{data}){
     state.commit('resSuccess',data)
  }
}
