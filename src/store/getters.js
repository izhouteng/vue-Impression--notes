export default {
  // 所有的笔记列表
  // 计算state
  allList(Store){
    let arr = [];
    Store.noteList.forEach((item) => {
      item.children.forEach((el) => {
        if(el){
          arr.push(el)
        }
      })
    });
    if(arr.length > 0){
      return arr;
    }
  },

  /**
   *
   * @param Store
   * @param getter
   * @returns {function(*)}
   * @id  string
   * @item.id  number
   * 根据 动态id 过滤textarea内容对象
   */
  getNoteinfo:(Store,getter) => (id) => {
    return getter.allList.filter(item => item.id == id)
  },

  /**
   *
   * @param Store
   * @param getter
   * @returns {function(*)}
   * @id 计算当前id的数据是否收藏,为true还是False
   */
  isShade:(Store,getter) => (id) => {
     let s = getter.allList.filter(item => item.id)
     console.log(s);
  }
}
