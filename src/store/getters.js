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
   }
}
