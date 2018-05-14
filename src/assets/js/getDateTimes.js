import Vue from 'vue'
let dayjs = require('dayjs');
dayjs().format();

export function getDateTimes(data){
  //在这里计算时间
  let newTime = dayjs().unix();
  data.forEach(item => {
    let diffTime = newTime - item.beginTime;   // 获取到时间差,计算 小时 分钟 天 周

    //创建时间为7天之内的笔记对象
    let day = parseInt(diffTime / 86400);
    // console.log(day);
    if(day <= 7 && day > 1){
      this.$store.commit('sevendays',{
        time:day + ' 天前',
        obj:item,
      })
    }
    // 一周前
    else if(day > 7 && day < 14){
      this.$store.commit('sevendays',{
        time:"上周",
        obj:item,
      })
    }
    // 2周前
    else if(day >= 14 && day < 21){
      this.$store.commit('sevendays',{
        time:"2 周前",
        obj:item,
      })
    }
    // 3周前
    else if(day >= 21 && day < 28){
      this.$store.commit('sevendays',{
        time:"3 周前",
        obj:item
      })
    }
    //4 周前
    else if(day >= 28 && day <= 31){
      this.$store.commit('sevendays',{
        time:"4 周前",
        obj:item,
      })
    }
    // 通过 对象的时间戳 转换为 18/xx/xx
    else if(day > 31){
      let dateObj = item.beginTime;
      // 获取到 2018/4/10格式的时间
      let newTimer = new Date(dateObj*1000).toLocaleString().split(' ')[0].split('/').join(' /');
      // 提交mutations 修改vuex中数据的createTime
      this.$store.commit('sevendays',{
        time:newTimer,
        obj:item,
      })
    }
    else if(day >= 0 && day <= 1){
      // 计算小时 1 <= h < 24
      let hours = parseInt(diffTime / 3600);
      if( 1 <= hours && hours < 24){
        this.$store.commit('sevendays',{
          time:hours + ' 小时前',
          obj:item,
        })
      }
      // 划分分钟
      if( 0 <= hours && hours < 1){
        let minutes = parseInt(diffTime / 60);
        this.$store.commit('sevendays',{
          time:minutes + ' 分钟前',
          obj:item,
        });
        // 划分秒 > 5s || < 5s 刚刚
        if(minutes < 1){
          let seconds = diffTime;
          if(seconds > 5){
            // 大于5 显示几秒前,否则显示刚刚
            this.$store.commit('sevendays',{
              time:seconds + ' 秒前',
              obj:item,
            });
          }else {
            this.$store.commit('sevendays',{
              time:"刚刚",
              obj:item,
            });
          }
        }
      }
    }
  });
}

export default {
  install(Vue){
    Vue.prototype.getDateTimes = {
      getDateTimes,
    }
  }
}
