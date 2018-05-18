export default {
    // 同步vuex 数据
    requestSuccess(state,{data}){
      state.commit('success',data)
    }
}
