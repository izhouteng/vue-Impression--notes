// 在路未变动的时候,先进行排序。
// 路由发生变化的时候,对笔记列表创建时间进行排序
// 组件中调用该方式使用call(),使sortWay函数中的this指向当前组件的实例对象
import Vue from 'vue'
export function sortWay(allNoteList){
  let sWay = this.$store.state.noteListSortway;
  //创建日期(最新优先) 更新日期(最新优先)
  if(sWay === 'createLatest' || sWay === 'updataEarliest'){
    this.allNoteList.sort(function(a,b){
      return b.beginTime - a.beginTime;
    });
  }
  //创建日期(最早优先) 更新日期(最新优先)
  else if(sWay === 'createEarliest' || sWay === 'updataLatest'){
    this.allNoteList.sort(function(a,b){
      return a.beginTime - b.beginTime;
    });
  }
  // 标题排序 (升序) 最短的排列越靠前
  else if(sWay === 'titleAscending'){
     this.allNoteList.sort(function(a,b){
        return b.title.length - a.title.length;
     })
  }
  else if(sWay === 'titleOrder'){
    this.allNoteList.sort(function(a,b){
      return a.title.length - b.title.length;
    })
  }
}

export default {
  install(Vue){
    Vue.prototype.sortWay = {
      sortWay,
    }
  }
}

