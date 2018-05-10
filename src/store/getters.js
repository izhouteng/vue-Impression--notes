export default {
   // 同步allList 和 dataList数据
   tBallList(Store){
     let arr = [];
     Store.dataList.forEach(item => {
        item.children.forEach(e => {
           arr.push(e)
        })
     });
     return arr;
   },

  // vuex中的allList有没有快捷方式为true的,如果有返回true,没有返回false
  shortcutHander(Store){
     return Store.allList.some(item => item.shortcut);
  }
}
